import { connect } from '../models/qlhsModal.js';

// =============================== infodefault (thông tin giáo viên): ============================================
// Lấy tất cả các thông tin theo mã số lớp: gồm [photo1, name, mail, phone, nameClass]
export const getInfodefault = async (req, res) => {
    try {
        const dataClient = req.body;
        let sendClient = { key: false };
        connect.query('SELECT * FROM infodefault', (err, result) => {
            if (result) {
                result.map(resl => {
                    if(resl.dMSL === dataClient.mMSL) {
                        sendClient = { key: true, data: resl};
                    }
                });
                res.status(200).json(sendClient);
            }else res.status(200).json(sendClient); 
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Thay đổi các thông tin dạng text
export const setTextInfo = async (req, res) => {
    try {
        const dataClient = req.body;
        let sendClient = { key: false };
        connect.query('SELECT * FROM infodefault', (err, result) => {
            if (result) {
                result.map(resl => {
                    if(resl.dMSL === dataClient.mMSL) {
                        sendClient = { key: true };
                    }
                });
                 
                if(sendClient.key) {
                    const { mColumn, mValue,mMSL } = dataClient;
                    // Thay đổi set data trong database  
                    connect.query(`UPDATE infodefault SET ${mColumn}='${mValue}' WHERE dMSL='${mMSL}'`, (err, result) => {
                        if(result) {
                            res.status(200).json({ key: true, mColumn, mValue });
                        }else res.status(200).json({ key: false });
                    })
                }else res.status(200).json(sendClient);

            }else res.status(200).json(sendClient);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}