import express from "express";

import { registerUser, loginUser} from "../controllers/auth.controllers.js";
import { authLimiter } from "../middleware/authlimit.middleware.js";

const router = express.Router();

router.post("/register",authLimiter, registerUser);
router.post("/login",authLimiter, loginUser);

export default  router;
