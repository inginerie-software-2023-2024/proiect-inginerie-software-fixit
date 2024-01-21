import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  getPost,
  deletePost,
  getPostUser,// Import the new controller function
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getPost);
router.get("/:postId/user", verifyToken, getPostUser);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:postId", verifyToken, deletePost);

export default router;
