
var jwt = require('jsonwebtoken');
var conn = require('../config/dbconnection').mysql_pool;
var sec = require('./security');
var util = require('./utils')


//create class
var Login = {
    //function to query all items
    getLogin: function (req, res) {
        //query the DB using prepared statement
        // var pass = sec.encrypt(req.body.password);
        var pass = req.body.password
        conn.getConnection(function (err, connection) {
            connection.query('SELECT Id_user,fk_idRole from users WHERE username = ? and password = ?', [req.body.username, pass], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'error: Al ejecutar consulta a Base'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(400).json(resultJson);
                }

                if (results[0] != undefined) {
                    var tokenData = {
                        username: req.body.username
                    }
                    var token = jwt.sign(tokenData, util.key, {
                        expiresIn: 60 * 60
                    })
                    //make results 
                    var Data = {
                        token: token,
                        userid: results[0].Id_user,
                        roleId: results[0].fk_idRole

                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.json(resultJson);
                } else {
                    //make results 
                    var Data = {
                        error: 'Credenciales Incorrectos'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(400).json(resultJson);
                }
                connection.release();
            });
        });
    }
};
module.exports = Login;