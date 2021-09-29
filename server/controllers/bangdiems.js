import { connect } from '../models/qlhsModal.js';

// Khởi tạo bảng điểm mới cho 1 hs
export const createBangDiem = async (req, res) => {
    try {
        const { mIdStudent } = req.body;
        connect.query(`INSERT INTO bangdiemhs(dID, dKey_ID, dTenMonHoc, dD_Mieng, dD_15p, dD_1Tiet, dD_HocKy) VALUES 
        ('null','${mIdStudent}','Toán Học','0','0','0','0'),
        ('null','${mIdStudent}','Ngữ Văn','0','0','0','0'),
        ('null','${mIdStudent}','Vật Lý','0','0','0','0'),
        ('null','${mIdStudent}','Hóa Học','0','0','0','0'),
        ('null','${mIdStudent}','Lịch Sử','0','0','0','0'),
        ('null','${mIdStudent}','Địa Lý','0','0','0','0'),
        ('null','${mIdStudent}','Sinh Học','0','0','0','0'),
        ('null','${mIdStudent}','Ngoại Ngữ','0','0','0','0'),
        ('null','${mIdStudent}','GDCD','0','0','0','0'),
        ('null','${mIdStudent}','Công Nghệ','0','0','0','0'),
        ('null','${mIdStudent}','Tin Học','0','0','0','0'),
        ('null','${mIdStudent}','GDQP','0','0','0','0'),
        ('null','${mIdStudent}','Thể Dục','0','0','0','0');`, 
        (err, result) => {
            if (result) {
                res.status(200).json({ key: true });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Kiểm tra bảng điểm đã được tạo chưa và nếu tạo rồi trả về bảng điểm hs đó
export const checkBangDiem = async (req, res) => {
    try {
        const { mIdStudent } = req.body;
        connect.query(`SELECT * FROM bangdiemhs WHERE dKey_ID='${mIdStudent}'`, 
        (err, result) => {
            if (result) {
                res.status(200).json({ key: true, result });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// UPDATE BangDiem
export const updateBangDiem = async (req, res) => {
    try {
        const { mId, mColumn, mValue } = req.body;
        connect.query(`UPDATE bangdiemhs SET ${mColumn}='${mValue}' WHERE dID='${mId}'`, 
        (err, result) => {
            if (result) {
                res.status(200).json({ key: true });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}