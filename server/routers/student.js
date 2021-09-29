import express from 'express';
import { getListStudent, getStudent, updateStudent1, addStudent, deleteStudent, updateStudent, getListStudentSearch } from '../controllers/student.js';

const router = express.Router();

router.post('/list-student', getListStudent); 

router.post('/list-student-search', getListStudentSearch); 

router.post('/', getStudent); 

// update student linkfb, ghi chú
router.post('/update-student-one', updateStudent1);

// ADD Học sinh
router.post('/add-student', addStudent);

// DELETE Học sinh
router.post('/delete-student', deleteStudent);

// UPDATE Học sinh
router.post('/update-student', updateStudent);

export default router;