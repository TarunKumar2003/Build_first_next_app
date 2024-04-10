import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
    content:string,
    createdAt:Date
}

const messageSchema: Schema<Message> = new Schema({
          content:{
            type:String,
            required:true
          },
          createdAt:{
            type:Date,
            required:true,
            default:Date.now
          }
})


export interface user extends Document{
       username:string,
       email:string,
       password:string,
       verifyCode:string,
       isVerified:boolean,
       verifyCodeExpiry:Date,
       isAcceptedMessage:boolean,
       messages:Message[]
}

const userSchema:Schema<user> = new Schema({
        username:{
          type:String,
          required:[true, "Username is required"],
          trim:true,
          unique:true
        },
        email:{
          type:String,
          required:[true, "email is  required field "],
          unique:true,
          match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
        },
        password:{
          type: String,
          required:[true, "Password is required"],
        },
        verifyCode:{
          type: String,
          required:[true, "VerifyCode is required"],
        },
        isVerified:{
          type: Boolean,
        },
        verifyCodeExpiry:{
            type:Date,
            required:[true, ""]
        },
        isAcceptedMessage:{
          type:Boolean,
          default:true
        },
        messages:[messageSchema]
})

const User = (mongoose.models.user as mongoose.Model<user>) || (mongoose.model<user>("User", userSchema));

export default User;