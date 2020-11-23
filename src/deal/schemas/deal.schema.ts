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
  sentToPipedrive: boolean;
}

export const DealSchema = new Schema<Deal>(
  {
    title: String,
    status: String,
    value: Number,
    wonTime: Date,
    pipeDriveId: Number,
    personName: String,
    sentToPipedrive: { type: Boolean, default: false },
    products: {
      type: [ProductSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
