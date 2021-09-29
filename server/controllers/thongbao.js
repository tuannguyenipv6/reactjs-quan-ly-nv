import { connect } from '../models/qlhsModal.js';

// GET Thông Báo
export const getTB = async (req, res) => {
    try {
        const { mMSL } = req.body;
        connect.query(`SELECT * FROM thongbao WHERE dMSL='${mMSL}'`, 
        (err, result) => {
            if(result) {
                res.status(200).json({ key: true, result });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// DELETE Thông Báo
export const deleteTB = async (req, res) => {
    try {
        const { dID } = req.body;
        connect.query(`DELETE FROM thongbao WHERE dID='${dID}'`, 
        (err, result) => {
            if(result) {
                res.status(200).json({ key: true, dID });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// ADD Thông Báo
export const addTB = async (req, res) => {
    try {
        const { dMSL, dNgayDang, dGV_Truong, dTenTB, dNoiDungTB } = req.body;
        connect.query(`INSERT INTO thongbao(dID, dMSL, dGV_Truong, dTenTB, dNoiDungTB, dNgayDang) 
        VALUES ('null','${dMSL}','${dGV_Truong}','${dTenTB}','${dNoiDungTB}','${dNgayDang}')`, 
        (err, result) => {
            if(result) { 
                const { insertId } = result;
                res.status(200).json({ key: true, mThongBao: { dMSL, dNgayDang, dGV_Truong, dTenTB, dNoiDungTB, dID: insertId } });
            }else res.status(200).json({ key: false });
            console.log(err)
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// UPDATE Thông Báo
export const updateTB = async (req, res) => {
    try {
        const { dGV_Truong, dTenTB, dNoiDungTB, dID } = req.body;
        connect.query(`UPDATE thongbao SET dGV_Truong='${dGV_Truong}',dTenTB='${dTenTB}',dNoiDungTB='${dNoiDungTB}' WHERE dID='${dID}'`, 
        (err, result) => {
            if(result) {
                res.status(200).json({ key: true, newTB: { dGV_Truong, dTenTB, dNoiDungTB, dID } });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}