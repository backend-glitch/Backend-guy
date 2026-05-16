import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
    
    name : {
        type: String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required: true,
        minlength : 10
    },
    password : {
        type : String,
        required : true,
        minLength : 7
    },
    role : {
        type: String,
        roles : ["admin","user"],
        default : "user"
    }
}, {
     timestamps : true
});

const User =  mongoose.model("User",userSchema);

export default User;