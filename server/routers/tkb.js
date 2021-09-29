import express from 'express';
import { checkUpdateCreate, getTKB } from '../controllers/tkb.js';

const router = express.Router();

router.post('/', getTKB);
router.post('/check-update-create', checkUpdateCreate);

export default router;