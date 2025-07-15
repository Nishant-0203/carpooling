import express from "express";
import { saveRiderProfile, getRiderProfile } from "../controllers/Ridercontroller.js";

const router = express.Router();

router.post("/rider/profile", saveRiderProfile);
router.get("/rider/profile/:email", getRiderProfile);

export default router;
