import express from 'express';
import { addTB, deleteTB, getTB, updateTB } from '../controllers/thongbao.js';

const router = express.Router();

router.post('/', getTB);
router.post('/delete', deleteTB);
router.post('/add', addTB);
router.post('/update', updateTB);

export default router;