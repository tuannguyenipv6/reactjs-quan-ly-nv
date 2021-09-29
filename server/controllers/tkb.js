import { connect } from '../models/qlhsModal.js';

// Kiểm tra bảng điểm đã được tạo chưa và nếu tạo rồi trả về bảng điểm hs đó
export const getTKB = async (req, res) => {
    try {
        const { mMSL } = req.body;
        connect.query(`SELECT * FROM thoikhoabieu WHERE dMSL='${mMSL}'`, 
        (err, result) => {
            if (result) {
                let arrayTKB = [];
                for(let i = 2; i <= 8; i++) {
                    let check = true;
                    if (result.length > 0) {
                        result.map(tkb => {
                            if(tkb.dThu === i) {
                                arrayTKB = [...arrayTKB, tkb];
                                check = false;
                            }
                        });
                    }else check = true;

                    if(check) {
                        arrayTKB = [...arrayTKB, {
                            dID: -1,
                            dMSL: mMSL,
                            dThu: i,
                            dSang1: '',
                            dSang2: '',
                            dSang3: '',
                            dSang4: '',
                            dSang5: '',
                            dChieu1: '',
                            dChieu2: '',
                            dChieu3: '',
                            dChieu4: '',
                            dChieu5: '',
                        }]
                    }
                }
                res.status(200).json({ key: true, arrayTKB });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Ktr UPDATE hay CREATE
export const checkUpdateCreate = async (req, res) => {
    try {
        const { 
            dID, dMSL, dThu, dSang1, dSang2, dSang3, dSang4, dSang5,
            dChieu1, dChieu2, dChieu3, dChieu4, dChieu5,
        } = req.body;
        if(dID === -1) {    //TH: Thêm mới tkb
            connect.query(`INSERT INTO thoikhoabieu(dID, dMSL, dThu, dSang1, dSang2, dSang3, dSang4, dSang5, dChieu1, dChieu2, dChieu3, dChieu4, dChieu5) VALUES 
            ('null','${dMSL}','${dThu}','${dSang1}','${dSang2}','${dSang3}','${dSang4}','${dSang5}','${dChieu1}','${dChieu2}','${dChieu3}','${dChieu4}','${dChieu5}')`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true, dMSL });
                }else {
                    res.status(200).json({ key: false });
                }
            })
        }else {     // TH: UPDATE
            connect.query(`UPDATE thoikhoabieu SET dSang1='${dSang1}',dSang2='${dSang2}',dSang3='${dSang3}',dSang4='${dSang4}',dSang5='${dSang5}',dChieu1='${dChieu1}',dChieu2='${dChieu2}',dChieu3='${dChieu3}',dChieu4='${dChieu4}',dChieu5='${dChieu5}' WHERE dID='${dID}'`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true, dMSL });
                }else {
                    res.status(200).json({ key: false });
                }
            })
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}