import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../env.js";

if(!DB_URI){
 throw new Error("please define the MONGODB_URI in .env.development/production.local");
}

const connectToDatabase = async () => {


    try {
        await mongoose.connect(DB_URI);

        console.log(`connecting to database in ${NODE_ENV}`)

    }catch(error){
   console.log("error connecting to database :",error);

   process.exit(1);
    }
}

export default connectToDatabase;