import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import healthRoutes from "./routes/health.routes.js";
import limiter from "./middleware/ratelimit.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

//health check
app.use("/blog/health",healthRoutes);

//middleware
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/",(req,res) => {
    res.send("Backend is running 🎯");
});

app.use("/blog/user",userRoutes);

app.use("/blog/posts",postRoutes);

app.use("/blog/auth/",authRoutes);

app.use(errorHandler);


export default app;

