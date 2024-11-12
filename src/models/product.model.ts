import { Schema, model } from "mongoose";

const collection = "products";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    default: "admin",
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: [String],
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const ProductModel = model(collection, schema);

export default ProductModel;
