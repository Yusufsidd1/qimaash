import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Interface for a single item in the cart
export interface ICartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

// Interface for the Cart document
export interface ICart extends Document {
  sessionId: string; // To identify anonymous user's cart
  userId?: mongoose.Schema.Types.ObjectId; // Optional, for logged-in users
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema<ICartItem> = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false }); // Do not create _id for subdocuments

const CartSchema: Schema<ICart> = new Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  items: [CartItemSchema],
}, { timestamps: true });

const Cart: Model<ICart> = models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
