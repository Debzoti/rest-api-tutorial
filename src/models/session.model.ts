import mongoose from "mongoose";


export interface SessionInput {
  user: mongoose.Schema.Types.ObjectId;
  valid?: boolean;
  userAgent?: string; //its type of browser or device
}
export interface SessionDocument extends mongoose.Document, SessionInput {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        valid: {
            type: Boolean,
            default: true,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)