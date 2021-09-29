import express from 'express';
import { forgoUser, getAllUsers, getLoginUser, getNameGVCN, newUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUsers); 

router.post('/', getLoginUser);

router.post('/forgo', forgoUser);

router.post('/new-user', newUser);
router.post('/name-gvcn', getNameGVCN);

// Infodefault 
// router.post('/infodefault', getInfodefault);


export default router;