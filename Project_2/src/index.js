// Project Management System
 import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js"

 dotenv.config({
    path : "./.env",
 })

const port = process.env.port || 3000;

//  app.listen(port,() => {
//    console.log(`running on port ${port}`);
//  })

connectDB().then(()=>{

   app.listen(port,() => {
   console.log(`running on port ${port}`);
})
}).catch((err) =>{
   console.error("MongoDB did not Connect",err);
   process.exit(1);
})
