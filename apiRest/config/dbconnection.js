const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     dateStrings:true,
//     database: 'dynamicmodules',
//     insecureAuth: true
// });
var config = {
    mysql_pool : mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456789',
        dateStrings:true,
        database: 'dynamicmodules',
        insecureAuth: true
    })
};

// connection.connect();

// module.exports = connection;


module.exports = config;