import UserModel from "../models/user.model";
import { UserInput, UserDocument } from "../models/user.model";


const createUser = async (input: UserInput) => {
    try {
        return await UserModel.create(input);
    } catch (error:any) {
        throw new Error(error);
    }
}


export default createUser;