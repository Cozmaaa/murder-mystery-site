import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import passport from "passport";
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
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "lax", 
    });

    res.status(201).json({ message: "User registered and logged in" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: IUser, info: any) => {
    if (err) return next(err);
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: info.message });
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
      sameSite: "lax",
    });
    res.json({ message: "User logged in" });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};