import mongoose, { Schema, Document, Model } from "mongoose";

export type ReferendumStatus = "draft" | "open" | "closed";
export type ClosingReason = "MAJORITY" | "MANUAL" | null;

export interface IReferendumOption {
  _id?: mongoose.Types.ObjectId;
  text: string;
}

export interface IReferendum extends Document {
  title: string;
  description: string;
  options: IReferendumOption[];
  status: ReferendumStatus;
  closureReason: ClosingReason;
  eligibleVoters: number;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReferendumSchema: Schema<IReferendum> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    options: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "open", "closed"],
      default: "draft",
    },

    closureReason: {
      type: String,
      enum: ["MAJORITY", "MANUAL"],
      default: null,
    },

    eligibleVoters: {
      type: Number,
      required: true,
    },

    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Referendum: Model<IReferendum> =
  mongoose.models.Referendum ||
  mongoose.model<IReferendum>("Referendum", ReferendumSchema);

export default Referendum;
