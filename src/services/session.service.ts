import mongoose from "mongoose";
import SessionModel, { SessionInput } from "../models/session.model";

const createSession = async (
   userId:string,UserAgent:string
) => {
    try {
        const session = await SessionModel.create({user:userId,userAgent:UserAgent});
        return session.toJSON();
    } catch (error: any) {
        throw new Error(error);
    }
}

export default createSession;