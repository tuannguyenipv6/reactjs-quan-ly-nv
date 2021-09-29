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