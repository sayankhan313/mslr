import mongoose,{Schema,Document,Model} from "mongoose";

export interface VoteDocument extends Document {
    userId: mongoose.Types.ObjectId;
    referendumId: mongoose.Types.ObjectId;
    optionIndex: number;
    createdAt: Date;
}

const VoteSchema=new Schema<VoteDocument>({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    referendumId:{
        type:Schema.Types.ObjectId,
        ref:"Referendum",
        required:true,
    },
    optionIndex:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})

VoteSchema.index(
    {userId:1,referendumId:1},
    {unique:true}
)

const Vote = mongoose.models.Vote as mongoose.Model<VoteDocument> || mongoose.model<VoteDocument>("Vote", VoteSchema);

export default Vote;