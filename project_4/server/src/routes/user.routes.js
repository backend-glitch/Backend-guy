import { getUsers, getUsersbyID } from "../controllers/user.controllers.js";
import express, { Router } from "express";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect,getUsers);
router.get("/:id",protect,getUsersbyID);


export default router;