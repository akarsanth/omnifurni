import express from "express";
const router = express.Router();

import { verifyKhalti } from "../controllers/khalti-controllers.js";

router.get("/verify/:token/:amount", verifyKhalti);

export default router;
