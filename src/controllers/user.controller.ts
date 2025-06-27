import {Request,Response,NextFunction} from "express"
import logger from "../utils/logger";
import createUser from "../services/user.service";
import { create, omit } from "lodash";
import { promise } from "zod";
import { createUserInput } from "../schema/user.schema";

const createUserHandler = async (
    req: Request<{},{}, createUserInput["body"]>, 
    res: Response
) : Promise<Response | void> => {
    try {
        const user = await createUser(req.body);
        // const { password, ...userResponse } = user.toObject();
        return res.status(201).send(omit(user.toObject(), "password")); 
    } catch (error: any) {
        logger.error(error);
        return res.status(500).send(error.message);
    }
}

export {createUserHandler};