"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true, select: false },
    displayName: { type: String },
    password: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
    githubId: { type: String, unique: true, sparse: true, select: false },
    accesibleCases: [{ type: Number, default: 1 }]
}, { timestamps: true });
// Add a pre-validation hook to the schema
userSchema.pre("validate", function (next) {
    if (!this.email && !this.googleId && !this.githubId) {
        return next(new Error("User must have email or googleId or githubId"));
    }
    next();
});
// Create and export the user model
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
