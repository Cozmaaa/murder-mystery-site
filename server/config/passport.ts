import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { Types } from "mongoose";


interface IUser {
    _id: string;
    username?: string;
    email?: string;
    displayName?: string;
    password?: string;
    googleId?: string;
    githubId?: string;
  }
  

passport.use(
  new LocalStrategy(async (username:string, password:string, done) => {
    try {
      const user = await UserModel.findOne({ username }).select("+password");
      if (!user) {
        return done(null, false, { message: "Incorrect name" });
      }
      if (!user.password) {
        return done(null, false, { message: "Password is not set." });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(async (id:Types.ObjectId, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
