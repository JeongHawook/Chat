import mongoose, {Schema, Document, Model} from "mongoose";
import { ChatDocument } from "./chatModel";
import { UserDocument } from "./user";


export interface MessageDocument extends Document{
sender: UserDocument['_id'];
content: string;
chat:ChatDocument['_id'];
createdAt: Date;
updatedAt: Date;
}

const messageSchema: Schema<MessageDocument> = new mongoose.Schema(
    {
        sender: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
        content: { type : String , trim: true},
        chat: { type: mongoose.Schema.Types.ObjectId , ref: "Chat"}
    },
    {
        timestamps: true,
    }
)

const Message:Model<MessageDocument> = mongoose.model("message", messageSchema)
export default Message;