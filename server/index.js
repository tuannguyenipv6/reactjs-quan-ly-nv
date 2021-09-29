import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import user from './routers/user.js';
import infodefault from './routers/infodefault.js';
import uploadImage from './routers/uploadImage.js';
import student from './routers/student.js';
import bangdiems from './routers/bangdiems.js'; 
import tkb from './routers/tkb.js';
import thongbao from './routers/thongbao.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));  
app.use('/images', express.static('images')); 
// Sử dụng middleware
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' })); 
app.use(cors());

app.use('/user', user);
app.use('/infodefault', infodefault);
app.use('/upload-image', uploadImage);
app.use('/student', student);
app.use('/bangdiems', bangdiems);
app.use('/thoi-khoa-bieu', tkb);
app.use('/thong-bao', thongbao);

app.listen(PORT, () => {
    console.log(`Server dang chay PORT ${PORT}`);
});