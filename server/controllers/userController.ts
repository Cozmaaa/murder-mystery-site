import { Request, Response, NextFunction } from "express";
import UserModel,{IUser} from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import passport from "passport";

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

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ message: "User registered and logged in" });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// controllers/authController.ts
export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: IUser, info: any) => {
      if (err) return next(err);
      if (!user) {
        // Authentication failed
        return res.status(401).json({ message: info.message });
      }
      // Log the user in
      req.logIn(user, (err) => {
        if (err) return next(err);
        // Authentication successful
        res.json({ message: 'Logged in successfully' });
      });
    })(req, res, next);
  };
  
