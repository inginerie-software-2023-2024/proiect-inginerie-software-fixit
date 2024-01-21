import express from "express";
import {
    createAppointment,
    deleteAppointment,
    getDateAppointments,
    updateAppointmentStatus
} from "../controllers/appointments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/create", verifyToken, createAppointment);

/* GET */
router.get("/:date", verifyToken, getDateAppointments);
router.put("/status", verifyToken, updateAppointmentStatus);

/* DELETE */
router.delete("/:appointmentId", verifyToken, deleteAppointment);

export default router;
