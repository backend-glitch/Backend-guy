import express from "express"
import cors from "cors"

const app = express();

//configurations
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//cors config
app.use(cors({
   origin :  process.env.CORS_ORIGIN?.split(",")|| "http://localhost:5173",
   credential:true,
   methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
   allowedHeaders : ["Content-Type","Authorization"]
}))


// import  the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck",healthCheckRouter);

app.get("/",(req,res) => {
   return res.json({message : "Running successfully"});
})

export default app
