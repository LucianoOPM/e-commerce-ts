import { Schema, model } from "mongoose";
import { IUser } from "../types/Users.types";

const collection = "users";

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin", "premium"],
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

const UserModel = model<IUser>(collection, User);

export default UserModel;
