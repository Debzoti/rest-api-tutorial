import mongoose from "mongoose";
import config from "config";
import { log } from "console";
import logger from "./logger";
export default async function connect() {
    const dbUri = config.get<string>("dbUri");
    if (!dbUri) {
        throw new Error("Database URI is not defined in the configuration");
    }
    try {
        await mongoose.connect(dbUri);
        logger.info("db connected");
        
    } catch (error) {
        logger.error("Database connection failed:", error);
        process.exit(1);
        
    }
}