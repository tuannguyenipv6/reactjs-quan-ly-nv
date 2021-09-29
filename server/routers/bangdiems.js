import express from 'express';
import { checkBangDiem, createBangDiem, updateBangDiem } from '../controllers/bangdiems.js';

const router = express.Router();

router.post('/create-bang-diem', createBangDiem);
router.post('/check-bang-diem', checkBangDiem);
router.post('/update-bang-diem', updateBangDiem);

export default router;