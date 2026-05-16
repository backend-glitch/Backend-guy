import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        trim : true,
        required : [true, "title is required"],
        required : true,
        minlength : [3, "title must be at least 3 characthers"]
    },

    content : {
        type : String,
        required: [true,"content is requirred"],
        minLength : [10,"content should be 10 characthers"]
    },

    author : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "User",
        required : [true, "author is required"]
    }
},{
    timestamps : true
});

const Post = mongoose.model("Post",postSchema);

export default Post;