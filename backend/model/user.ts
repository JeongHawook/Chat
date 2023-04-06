import mongoose, {Schema, Document, Model} from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document{
    name:string;
    email:string;
    password: string;
    picture:string;
    matchPassword(enteredPassword: string): Promise<boolean>;
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
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

//b4 saving
userSchema.pre('save', async function (next) {
    //이미 hash 인가? 확인?
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password,salt);
})

const User:Model<UserDocument>= mongoose.model('User',userSchema);

export default User;