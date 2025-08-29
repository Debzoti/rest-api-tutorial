import { Request, Response } from "express";
import  createSession  from "../services/session.service";
import { SessionInput } from "../models/session.model";
import logger from "../utils/logger";
import { validatePassword } from "../services/user.service";
import config from 'config'
import { signJwt, verifyJwt } from "../utils/jwt.utils";
const sessionHandler = async (
    req: Request,
    res: Response
): Promise<Response | void> => {
   
    //validate password
    const user = await validatePassword(req.body);
    if (!user) {
        res.status(401).send("invalid email or password");
    }
    //create session 
    const session = await createSession(user._id,req.get("userAgent")||"");

    //create access token
    const accesToken = signJwt({
        ...user,
        session:(await session)._id,
    },
    {
        expiresIn : config.get('accesTokenTtl')
     },
);

    //create refrresh token
    const refreshToken = signJwt({
        ...user,
        session:(await session)._id,
    },
    {
        expiresIn : config.get('accesTokenTtl')
     },);


    //return both tokens

    return res.send({accesToken,refreshToken});
}
