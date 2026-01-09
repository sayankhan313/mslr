import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISCC extends Document {
  code: string;
  used: boolean;
  createdAt: Date;
}

const SCCSchema: Schema<ISCC> = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SCC: Model<ISCC> =
  mongoose.models.SCC  as mongoose.Model<ISCC>|| mongoose.model<ISCC>("SCC", SCCSchema);

export default SCC;
