import express from "express";
import {
    createAppointment
} from "../controllers/appointments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/create", verifyToken, createAppointment);
//router.get("/:postId/postReviews", verifyToken, getPostReviews);

/* DELETE */
//router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
