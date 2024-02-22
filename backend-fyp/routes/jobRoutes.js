import express from "express";
import {
  postRescueAnimal,
  getAllRescueRequest,
  getAllrescueById,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdmin } from '../middlewares/adminMiddleware.js';
const router = express.Router();

router.get("/getAllRescue", getAllRescueRequest);
router.post("/postRescueDetails",postRescueAnimal);
router.get('/getAllRescue/:id',  getAllrescueById)

export default router;
