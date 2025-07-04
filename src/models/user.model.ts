import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Document, Model, Schema } from "mongoose";
import config from "config";
import { time } from "console";

//ts defination for userschema
export interface UserInput {
  name: string;
  email: string;
  password: string;
}
export interface UserDocument extends mongoose.Document,UserInput {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

//user schema
const userSchema = new Schema(
    
    {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {   
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  
},
{
    timestamps: true,
}
);

userSchema.pre("save", async function (next) {
   
    let user = this as UserDocument;
   if (!user.isModified("password")) {
     return next();
   }
   const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
   const hash = await bcrypt.hashSync(user.password, salt);
   user.password = hash;
   return next();
});

//custom mehiod for comparing password
userSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e: Error) => false);
  };



const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;