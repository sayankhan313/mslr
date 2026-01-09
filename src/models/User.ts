import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole= "VOTER" | "EC"

export interface IUSER extends Document{
    name:string;
    email:string;
    dob:Date;
    passwordHash:string;
    role:UserRole;
    createdAt:Date
}

const UserSchema:Schema<IUSER>=new Schema(
    {
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,

    },
    dob:{
        type:Date,
        required: function (this: IUSER) {
            return this.role === "VOTER";
          }
    },
    passwordHash:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:["VOTER","EC"],
        default:"VOTER",
    },

    },
    {
        timestamps:true
    }
)

const User:Model<IUSER>=mongoose.models.User as mongoose.Model<IUSER> || mongoose.model<IUSER>("User",UserSchema);

export default User