import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createUserData,
  deleteUserData,
  fetchUserData,
  updateUserData,
} from "../controller/api";

const router = express.Router();

router.post("/create-user-data", authMiddleware, createUserData);
router.get("/fetch-user-data", authMiddleware, fetchUserData);
router.get("/fetch-user-data/:email", authMiddleware, fetchUserData);
router.put("/update-user-data/:email", authMiddleware, updateUserData);
router.delete("/delete-user-data/:userId", authMiddleware, deleteUserData);

export default router;
