import mysql from 'mysql';

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlhs',
});

connect.connect((err, connection) => {
    if (err) {
        console.log('Ket Noi Khong Thanh Cong');
    }
});

export { connect };


// const connect = () => {
//     connection.connect(err => {
//         console.log(err);
//     });
// }

// const closeDB = () => {
//     connection.end(err => {
//         if(!err) {
//             console.log('Da dong database!');
//         }
//     })
// }

// export const getAllUser = (callBackQuery) => {
//     connect();
//     connection.query('SELECT * FROM user', (err, results, fields) => {
//         if(!err) {
//             callBackQuery(results); // Tương đương với return
//         }else console.log(err);
//     })
// }