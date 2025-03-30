import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    gp: String,
    password: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
