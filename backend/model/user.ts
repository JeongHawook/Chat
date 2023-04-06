import mongoose, {Schema, Document, Model} from "mongoose";

export interface UserDocument extends Document{
    name:string;
    email:string;
    password: string;
    picture:string;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String , required:true, unique:true},
        password: {type:String, required:true},
        picture:{type:String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    },
    {
        timestamps: true,
    }

)

const user:Model<UserDocument>= mongoose.model('user',userSchema)
export default user;