import mongoose, {Schema, Document, Model} from "mongoose";
import { UserDocument } from './user';
import { MessageDocument } from './message';

export interface ChatDocument extends Document{
  chatName : string;
  isGroupChat: boolean;
  users:UserDocument['_id'][];
  latestMessage: MessageDocument['_id'];
  groupAdmin: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}
const chatShema: Schema<ChatDocument> =new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, //User 의 ObjectId!! 이렇게 Schema 만들수있는건 조금 반전이다
        ref: "User",
      },
    ],
    latestMessage: {
      //Message 에 너무 많아 질수도 있으니 나중에 한번에 저장할수있는 Collection 만들어 보자
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat:Model<ChatDocument> = mongoose.model("Chat", chatShema);

export default Chat;
