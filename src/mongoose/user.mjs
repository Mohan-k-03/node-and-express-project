import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.String,
    require: true,
    unique: true,
  },
  password: { type: mongoose.Schema.Types.String, require: true },
});

export const User = mongoose.model("user", UserSchema);
 