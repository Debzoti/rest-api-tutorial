import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface SessionInput {
  user: UserDocument["_id"];
  // _id: string; //this is not needed because mongoose will create an id for
  valid?: boolean;
  userAgent: string; //its type of browser or device
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

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;