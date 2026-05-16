import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.models.js";
import {JWT_SECRET} from "../config/env.js"

export const registerUser = async(req,res) => {

    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password) return res.status(400).json({message : "all fields are required !!"});

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message : "User already exists!!"});

        const n = 10;

        const hashedpwd = await bcrypt.hash(password, n);

        const user = await User.create({
            name,
            email,
            password : hashedpwd
        })

        res.status(201).json({message : "user registered", user});

    }catch(error){

        return res.status(500).json({error : error.message});

    }

};

export const loginUser = async(req,res) => { 

    try{
        const {email,password} = req.body;

        if(!email || !password) return res.status(400).json({message : "both user and password neeeded"});

        const user = await User.findOne({email});

        if(!user) return res.status(404).json({message : "User does not exists"});

           const checkPass = await bcrypt.compare(password,user.password);

           if(!checkPass) return res.status(400).json({message : "Invalid credentials"});

           const token = jwt.sign(
            {
                id: user.id,
                role : user.role,
            }, JWT_SECRET,{
                expiresIn : "1h"
            }
           );

           // to hide the password from frontend
           user.password = undefined;

           return res.status(200).json({
            message : "User logined",
            token,
            user
           })
    }catch(error){
        return res.status(500).json({message : error.message});
    }
}

