import express from 'express';
import { uploadImage, upLoad } from '../controllers/uploadImage.js';

const router = express.Router();

// Infodefault
router.post('/', uploadImage, upLoad);

export default router;