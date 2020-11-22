import { Document, Schema } from 'mongoose';

export class Deal extends Document {
  title: string;
  status: string;
  value: number;
  wonTime: Date;
  createdAt?: Date;
  pipeDriveId: number;
}

export const DealSchema = new Schema<Deal>(
  {
    title: String,
    status: String,
    value: Number,
    wonTime: Date,
    pipeDriveId: Number,
  },
  {
    timestamps: true,
  },
);
