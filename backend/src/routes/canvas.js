import { saveCanvas, getCanvas } from '../controller/canvas.js'
import express from 'express';
const router = express.Router()

router.route("/").post(saveCanvas);
router.route("/").get(getCanvas);

export default router;