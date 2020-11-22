import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  id: Number,
  price: Number,
  quantity: Number,
  name: String,
});
