import express from "express"
import { createPost,getPosts,getPostbyID,updatePost,deletePost } from "../controllers/post.controllers.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",protect,createPost);
router.get("/",protect,getPosts);
router.get("/:id",protect,getPostbyID);
router.put("/:id",protect,updatePost);
router.delete("/:id",protect,authorizeRoles("admin"),deletePost);

export default router;