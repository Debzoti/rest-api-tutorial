import {Express,Request,Response,NextFunction} from "express";
import createUser from "../services/user.service";
import { createUserHandler } from "../controllers/user.controller";
import validate from "../middlewares/validateResource";
import createUserSchema from "../schema/user.schema";

function asyncHandler(fn: any) {
    return function (req: Request, res: Response, next: NextFunction) {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

const route = (app: Express) => {
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "Welcome to the API",
            status: "success"
        });
    });
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({
            message: "API is healthy",
            status: "success"
        });
    });
    
    app.post("/api/users",
        asyncHandler(validate(createUserSchema)), 
        asyncHandler(createUserHandler));
}

export default route;