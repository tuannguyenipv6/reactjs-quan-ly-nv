import multer from 'multer';

const multerConfig = multer.diskStorage({
    // Nơi lưu img
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    // Đặt tên img
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        const nameFile = file.originalname.split('.');
        callback(null, `${nameFile[0]}-${Date.now()}.${ext}`);
    }
})
const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true);
    }else {
        callback(new Error('Only Image is allowed...'));
    }
}
var upload = multer({ 
    storage: multerConfig,
    fileFilter: isImage,
})
export const uploadImage = upload.single('myFile');

export const upLoad = async (req, res) => {
    try {
        res.status(200).json({key: true, filename: req.file.filename});
    } catch (e) {
        res.status(500).json({ error: e });
    }
}