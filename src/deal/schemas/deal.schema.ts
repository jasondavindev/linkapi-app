import { Document, Schema } from 'mongoose';
import { ProductSchema } from './product.schema';

export class Deal extends Document {
  title: string;
  status: string;
  value: number;
  wonTime: Date;
  createdAt?: Date;
  pipeDriveId: number;
  personName: string;
}

export const DealSchema = new Schema<Deal>(
  {
    title: String,
    status: String,
    value: Number,
    wonTime: Date,
    pipeDriveId: Number,
    personName: String,
    products: {
      type: [ProductSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
