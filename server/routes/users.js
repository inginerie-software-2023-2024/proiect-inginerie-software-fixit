import express from "express";
import {
  getUser,
  getUserFriends,
  getUserAppointments,
  addRemoveFriend,
  getUserAppointmentsMaster,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:userId/appointments", verifyToken, getUserAppointments);
router.get("/:userId/appointmentsmaster", verifyToken, getUserAppointmentsMaster);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;

