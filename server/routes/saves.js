import express from "express";
import {
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

/* DELETE */
router.delete("/:saveId", verifyToken, deleteSave);

export default router;
