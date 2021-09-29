import { connect } from '../models/qlhsModal.js';

// get list student
export const getListStudent = async (req, res) => {
    try {
        const { mMSL } = req.body;
        connect.query('SELECT * FROM hocsinh', (err, result) => {
            let sendClient = { key: false };
            let arrayStudent = [];
            if(result) {
                result.map(resl => {
                    if(resl.dMSL === mMSL) {
                        sendClient = { key: true };
                        const student = {
                            id: resl.dID,
                            hoTen: resl.dHoTen,
                            chucVu: resl.dChucVu,
                            linkPhoto: resl.dLinkPhoto,
                        }
                        arrayStudent = [...arrayStudent, student];
                    }
                });

                if(sendClient.key) {
                    res.status(200).json({ key: true, data: arrayStudent });
                }else res.status(200).json(sendClient);
                
            }else res.status(200).json(sendClient);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// get list student search
export const getListStudentSearch = async (req, res) => {
    try {
        const { mMSL, search } = req.body;
        connect.query(`SELECT * FROM hocsinh WHERE dMSL='${mMSL}'`, (err, result) => {
            if(result) {

                const data = result.filter(student => {
                    return student.dHoTen.toLowerCase().includes(search.toLowerCase());
                });

                let arrayStudent = [];
                data.map(std => {
                    const student = {
                        id: std.dID,
                        hoTen: std.dHoTen,
                        chucVu: std.dChucVu,
                        linkPhoto: std.dLinkPhoto,
                    }
                    arrayStudent = [...arrayStudent, student];
                })
                

                res.status(200).json({ key: true, data: arrayStudent });
            }else {
                res.status(200).json({ key: false});
            }
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// get student 
export const getStudent = async (req, res) => {
    try {
        const { id } = req.body;
        connect.query('SELECT * FROM hocsinh', (err, result) => {
            let sendClient = { key: false };
            if(result) {
                result.map(resl => {
                    if(resl.dID === id) {
                        sendClient = { 
                            key: true,
                            data: resl,
                        }
                    }
                });
                res.status(200).json(sendClient);
            }else res.status(200).json(sendClient);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// update student  [updateStudent1: update link fb, ghi chú]
export const updateStudent1 = async (req, res) => {
    try {
        const { mID, mColumn, mValue } = req.body;
        connect.query(`UPDATE hocsinh SET ${mColumn}='${mValue}' WHERE dID='${mID}'`, (err, result) => {
            if(result) {
                res.status(200).json({ key: true, data: { mColumn, mValue } });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// ADD Student
export const addStudent = async (req, res) => {
    try {
        const { 
            mMSL, mHoTen, mMSHS, mNamSinh, mGioiTinh, mDanToc, mNoiSinh, mChucVu, mSDT,
            mLinkPhoto  
        } = req.body; // Còn Link fb [chưa có], ghi chú [trống]
        
        connect.query(`INSERT INTO hocsinh(dID, dMSL, dHoTen, dMSHS, dNamSinh, dGioiTinh, dDanToc, dNoiSinh, dChucVu, dSdtPh, dLinkPhoto, dLinkfb, dGhiChu) VALUES ('null','${mMSL}','${mHoTen}','${mMSHS}','${mNamSinh}','${mGioiTinh}','${mDanToc}','${mNoiSinh}','${mChucVu}','${mSDT}','${mLinkPhoto}','chuaco','Trống')`, 
        (err, result) => {
            if(result) {
                res.status(200).json({ key: true, mHoTen });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// DELETE Student
export const deleteStudent = async (req, res) => {
    try {
        const { mID } = req.body;
        connect.query(`DELETE FROM hocsinh WHERE dID='${mID}'`, 
        (err, result) => {
            if(result) {
                connect.query(`DELETE FROM bangdiemhs WHERE dKey_ID='${mID}'`, (err, result) => {
                    if(result) {
                        res.status(200).json({ key: true, mID });
                    }else res.status(200).json({ key: false });
                })
            }else{
                res.status(200).json({ key: false });
            } 
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// UPDATE Student
export const updateStudent = async (req, res) => {
    try {
        const { 
            mID, mHoTen, mMSHS, mNamSinh, mGioiTinh, mDanToc, 
            mNoiSinh, mChucVu, mSDT, mLinkPhoto, mLinkfb, mGhiChu, 
        } = req.body;
        connect.query(`UPDATE hocsinh SET dHoTen='${mHoTen}',dMSHS='${mMSHS}',dNamSinh='${mNamSinh}',dGioiTinh='${mGioiTinh}',dDanToc='${mDanToc}',dNoiSinh='${mNoiSinh}',dChucVu='${mChucVu}',dSdtPh='${mSDT}',dLinkPhoto='${mLinkPhoto}',dLinkfb='${mLinkfb}',dGhiChu='${mGhiChu}' WHERE dID='${mID}'`, 
        (err, result) => {                                                  
            if(result) {
                res.status(200).json({ key: true, data: { mID, mHoTen, mChucVu, mLinkPhoto } });
            }else{
                res.status(200).json({ key: false });
            } 
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
}