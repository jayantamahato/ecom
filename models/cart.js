import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    items: { type: [], required: true },
    customerId: { type: String, required: true },
    total_price: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Cartmodel = mongoose.model("cart", cartSchema);
export { cartSchema };
