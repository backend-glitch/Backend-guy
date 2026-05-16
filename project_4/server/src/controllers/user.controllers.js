import User from "../models/user.models.js";

export const getUsers = async(req,res) => {

    try{
        
        const user = await User.find();

        if(!user) return res.status(404).json({message : "no User in LOG"});

        res.status(200).json({message : "Users Log", user});
    
    }catch(error){

        return res.status(500).json({message : error.message});

    }
};

export const getUsersbyID = async(req,res) => {

    try{
        const id = req.params.id;

        if(!id) return res.status(400).json({message : "User not found, not in Log"});

        const user = await User.findById(id);

        res.status(200).json({user});

    }catch(error){
        return res.status(500).json({message: error.message});
        
    }
}