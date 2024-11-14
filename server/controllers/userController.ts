import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import crypto from "crypto";
// import passport from "passport";
import jwt from "jsonwebtoken";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    const existingUsername = await UserModel.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken");
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      displayName: username,
      email,
      password: passwordHashed,
    });

    await newUser.save();
    const payload = {
      id: newUser._id,
      username: newUser.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
    });

    res.status(201).json({ message: "User registered and logged in" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  try {
    const user = await UserModel.findOne({ username }).select("+password");
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return 
    }
    if(!user.password){
      res.status(401).json({ message: "Password is not set" });
      return 
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return 
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      domain:process.env.NODE_ENV==="production"?".murder-mystery-site.onrender.com":undefined
    });
    res.json({ message: "User logged in" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const addAccesibleCases = async (req: Request, res: Response) => {
  try {
    const { userId, addedLevel } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { accesibleCases: addedLevel } }, // Add without duplicates
      { new: true, runValidators: false } // Disable validators for this update
    );
    if (!user) {
      res.status(404).send("User not found");
      return 
    }
    res.status(200).send("Level added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error during adding a new level");
  }
};


export const getAccesibleCases = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const accesibleCases = user.accesibleCases;
    res.json(accesibleCases);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error during fetching accesible levels");
  }
};
