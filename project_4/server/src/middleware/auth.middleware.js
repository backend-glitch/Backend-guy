import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const protect = async(req,res,next) => {

    try {
         const authHeader = req.headers.authorization;

         if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({message : "not authorized"});

         const token = authHeader.split(" ")[1];
         const decodedmsg = jwt.verify(token, JWT_SECRET);

        req.user  = decodedmsg;

        next();


    }catch(error){
        return res.status(401).json({message:  "Invalid token !!"});

    }
}

export default protect;