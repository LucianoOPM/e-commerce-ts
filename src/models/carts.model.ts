import { Schema, model } from "mongoose";

const collection = "carts";

const Cart = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      qty: {
        type: Schema.Types.Number,
      },
      _id: false,
    },
  ],
});

const CartModel = model(collection, Cart);

export default CartModel;
