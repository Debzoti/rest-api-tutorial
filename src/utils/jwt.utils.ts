import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get<String>("privateKey");
const publicKey = config.get<String>("publicKey");

const privateKeyBuffer = Buffer.from(privateKey, 'utf8');
const publicKeyBuffer = Buffer.from(publicKey,'utf-8');

//sign
const signJwt = async (object:Object,options?:jwt.SignOptions | undefined) => {
    return jwt.sign(
        object,
        privateKeyBuffer,{
        ...(options && options),
        algorithm:"RS256"}
    );
}

//verify
const verifyJwt = async (token:string) => {
    let ans;
    
    try {
        const decoded = jwt.verify(token,publicKeyBuffer)
        ans = {
            valid : true,
            expired : false,
            decoded 
        };
        return ans
        
    } catch (err: any) {
        ans = {
            valid : false,
            expired : err.message === "jwt expired",
            decoded : null,
        };
        return ans
    }
}


export {signJwt,verifyJwt};