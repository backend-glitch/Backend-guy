import mongoose from "mongoose"

const connectDB = async () => {

   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED");
   } catch (error) {
    console.error("MongoDb did not CONNECT");
     process.exit(1);
   }
    
} 

export default connectDB