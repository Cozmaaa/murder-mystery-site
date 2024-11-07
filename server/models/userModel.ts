import { Schema, model, Document} from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  username?: string;
  email?: string;
  displayName?: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  accesibleCases:number[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true, select: false },
    displayName: { type: String },
    password: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
    githubId: { type: String, unique: true, sparse: true, select: false },
    accesibleCases:[{type:Number,default:1}]
  },
  { timestamps: true }
);

// Add a pre-validation hook to the schema
userSchema.pre("validate", function (next) {
  if (!this.email && !this.googleId && !this.githubId) {
    return next(new Error("User must have email or googleId or githubId"));
  }
  next();
});

// Create and export the user model
const UserModel = model<IUser>("User", userSchema);
export default UserModel;