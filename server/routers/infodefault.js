import express from 'express';
import { getInfodefault, setTextInfo } from '../controllers/infodefault.js';

const router = express.Router();

// Infodefault
router.post('/', getInfodefault);

// Thay đổi các thông tin dạng text
router.post('/set-text-info', setTextInfo);


export default router;