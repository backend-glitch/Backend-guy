import express from "express"
import cookieParser from 'cookie-parser'

import {PORT} from './env.js'

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import { connect } from "mongoose";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
//const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())

// api/v1/auth/sign-up
app.use('/api/v1/auth/',authRouter);
app.use('/api/v1/auth/users',userRouter);
app.use('/api/v1/auth/subscription',subscriptionRouter);

//error middleware
app.use(errorMiddleware)

app.get('/',(req,res) =>{ 
res.send("welcome subscription tracker API")
})

app.listen(PORT, async () => {
  
    await connectToDatabase();

      console.log(`API running on http://localhost:${PORT}`)

})

export default app


// html
//document.body.style.backgroundColor = "black";
