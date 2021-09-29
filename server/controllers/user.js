import { connect } from '../models/qlhsModal.js';

// =============================== Login Đăng nhập: ============================================
// Lấy tất cả các user
export const getAllUsers = async (req, res) => {
    try {
        connect.query('SELECT * FROM user', (err, result) => {
            res.status(200).json(result);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}
 
// Nhận data kiểm tra tài khoản
export const getLoginUser = async (req, res) => {
    try {
        connect.query('SELECT * FROM user', (err, result) => {
            const userClient = req.body;
            let sendClient = { key: false };
            result.map(resl => {
                if (resl.pTaiKhoan === userClient.taiKhoan && resl.pMatKhau === userClient.matKhau) {
                    const { pMSL, pGVPH } = resl;
                    sendClient = { key: true, pMSL, pGVPH, taiKhoan: userClient.taiKhoan }
                } 
            });
            res.status(200).json(sendClient);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Nhận data và đổi MK
export const forgoUser = async (req, res) => {
    try {
        connect.query ('SELECT * FROM user', (err, result) => {
            const userClient = req.body;
            let sendClient = { key: false };
            result.map(resl => {
                if (resl.pTaiKhoan === userClient.taiKhoan && resl.pQMK === userClient.qMatKhau) {
                    sendClient = { key: true };
                } 
            });

            if(sendClient.key) {
                connect.query(`UPDATE user SET pMatKhau=${userClient.newMatKhau} WHERE pTaiKhoan='${userClient.taiKhoan}'`, 
                    (err, result) => {
                        if(result){
                            sendClient = { key: true }
                            res.status(200).json(sendClient);
                        }else {
                            sendClient = { key: false }
                            res.status(200).json(sendClient);
                        }
                    }
                );
            }else {
                res.status(200).json(sendClient);
            }
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Nhận data thêm mới user
export const newUser = async (req, res) => {
    try {
        connect.query ('SELECT * FROM user', (err, result) => {
            const userClient = req.body;
            let checkUser = false;
            let resultValue = '';
            result.map(resl => {
                if(userClient.taiKhoan === resl.pTaiKhoan) {
                    checkUser = true;
                } else if(userClient.mGV_PH === 1) {
                    if (userClient.mMSL === resl.pMSL) {
                        checkUser = true;
                        resultValue = 'Mã số lớp đã tồn tại!';
                    }
                }
            }); 

            if(!checkUser) {
                connect.query(`INSERT INTO user (pTaiKhoan, pMatKhau, pMSL, pGVPH, pQMK) VALUES ('${userClient.taiKhoan}', '${userClient.matKhau}', '${userClient.mMSL}', '${userClient.mGV_PH}', '${userClient.mQMK}')`, 
                    (err1, result) => {
                        if(result) {
                            // Insert INFODEFAULT
                            if(userClient.mGV_PH === 1) {// Nếu TK GVCN
                                connect.query(`INSERT INTO infodefault (dMSL, dPhoto1, dName, dMail, dPhoto2, dSDT, dTenLop) VALUES ('${userClient.mMSL}', 'matdinh', 'Name GV', 'MailGV@gmail.com', 'matdinh', 'matdinh', '')`, 
                                (err1, result) => {
                                    if(result) {
                                        res.status(200).json({ key: true, taiKhoan: userClient.taiKhoan }); // Thêm thành công
                                    }else{
                                        const err = JSON.stringify(err1)
                                        res.status(200).json({ key: true, err, }); //Thêm tài khoản bị lỗi gì đó
                                    }
                                })
                            }else { //Nếu TK PH
                                res.status(200).json({ key: true, taiKhoan: userClient.taiKhoan });
                            }
                        }else {
                            const err = JSON.stringify(err1)
                            res.status(200).json({ key: true, err }); //Thêm tài khoản bị lỗi gì đó
                        }
                    }
                );
            }else {
                // Tài khoản tồn tại hoặc MSL cho GV đã được tạo
                if(resultValue){
                    res.status(200).json({ key: false, resultValue });
                }else{
                    res.status(200).json({ key: false });
                }
            }
        
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// Lấy tất name GVCN theo MSL
export const getNameGVCN = async (req, res) => {
    try {
        const { mMSL } = req.body;

        connect.query(`SELECT * FROM user WHERE pMSL='${mMSL}'`, (err, result) => {
            if(result) {
                let check = false;
                let name = '';
                result.map(user => {
                    if(user.pGVPH === 1) {
                        check = true;
                        name = user.pTaiKhoan;
                    }
                });

                if(check) {
                    res.status(200).json({ key: true, name });
                }else res.status(200).json({ key: false });
                
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}
 
// // =============================== infodefault (thông tin giáo viên): ============================================
// // Lấy tất cả các thông tin theo mã số lớp: gồm [photo1, name, mail, phone, nameClass]
// export const getInfodefault = async (req, res) => {
//     try {
//         const dataClient = req.body;
//         let sendClient = { key: false };
//         connect.query('SELECT * FROM infodefault', (err, result) => {
//             if (result) {
//                 result.map(resl => {
//                     if(resl.dMSL === dataClient.mMSL) {
//                         sendClient = { key: true, data: resl};
//                     }
//                 });
//                 res.status(200).json(sendClient);
//             }else res.status(200).json(sendClient);
//         })
//         // res.status(200).json(dataClient);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// }
