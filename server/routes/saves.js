import express from "express";
import {
    checkPostSaved,
    createSave,
    deleteSave,
    getAllSavesUser,
} from "../controllers/saves.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/:userId/:postId/create", verifyToken, createSave);
// GET
router.get("/:userId/Save", verifyToken, getAllSavesUser);
router.get("/:userId/:postId/check", verifyToken, checkPostSaved);

/* DELETE */
router.delete("/:saveId", verifyToken, deleteSave);

export default router;
