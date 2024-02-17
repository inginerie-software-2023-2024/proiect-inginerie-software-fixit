import express from "express";
import {
  checkPostSaved,
  createSave,
  deleteSave,
  getAllSavesUser,
  getSaves,
} from "../controllers/saves.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/:userId/:postId/create", verifyToken, createSave);
// GET
router.get("/:userId/Save", verifyToken, getAllSavesUser);
router.get("/:userId/:postId/check", verifyToken, checkPostSaved);
router.get("/:postId/savesNumber", verifyToken, getSaves);

/* DELETE */
router.delete("/:saveId", verifyToken, deleteSave);

export default router;
