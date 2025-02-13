import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    aboutYou:string,
    message:string,
    isAdmin:boolean,
}


const userSchema = new Schema<IUser>(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        aboutYou:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }
    }, {
        timestamps:true,
    }
)

export default mongoose.models.Users || mongoose.model<IUser>('Users', userSchema)