import express from "express";
import {
    createAppointment,
    getDateAppointments
} from "../controllers/appointments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/create", verifyToken, createAppointment);
router.get("/:date", verifyToken, getDateAppointments);

/* DELETE */
//router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
