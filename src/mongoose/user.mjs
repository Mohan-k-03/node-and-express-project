import mongoose from "mongoose";

const UserSchema = new









mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.String,
    require: true,
    unique: true,
  },
  password: { type: mongoose.Schema.Types.String },
  googleId: {
    type: mongoose.Schema.Types.String,
    unique: true,
    sparse: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    sparse: true,
  },
});

export const User = mongoose.model("user", UserSchema);
