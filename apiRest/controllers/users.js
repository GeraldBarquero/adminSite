var conn = require('../config/dbconnection').mysql_pool;

var Users = {
    getUser: function (req, res) {
        conn.getConnection(function (err, connection) {
            //var selectUser = conn.query('SELECT * from users WHERE Id_User = ?', [req.params.IdUser], function (error, results, fields) {
            connection.query('CALL sp_security_getByIdUser (?)', [req.params.IdUser], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        message: 'No se puede consultar la información del usuario',
                        type: -1
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(400).json(resultJson);
                }
                if (results) {
                    var resultJson = JSON.stringify(results[0]);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.json(resultJson);
                }
                connection.release();
            });
        });
    },
    createUser: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_createUser (?,?,?,?,?,?,?,?)',
                [req.body.username,
                req.body.email,
                req.body.password,
                req.body.name,
                req.body.lastName,
                req.body.companyName,
                parseInt(req.body.roleId),
                req.body.avatarimg], function (error, results, fields) {
                    if (error) {
                        var Data = {
                            message: 'No se pueden crear usuarios',
                            type: -1
                        }
                        var resultJson = JSON.stringify(Data);
                        resultJson = JSON.parse(resultJson);
                        //send JSON to Express
                        res.status(400).json(resultJson);
                    }
                    if (results) {
                        var resultJson = JSON.stringify(results[0]);
                        resultJson = JSON.parse(resultJson);
                        //send JSON to Express
                        res.json(resultJson);
                    }
                    connection.release();
                });
        });
    },
    getAllUser: function (req, res) {
        conn.getConnection(function (err, connection) {
            //var selectUser = conn.query('SELECT Id_user,username,name,lastName,email,companyName,create_time from users WHERE enabled = 1', function (error, results, fields) {
            connection.query('CALL sp_security_getUser', function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        message: 'No se pueden consultar los usuarios',
                        type: -1
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(400).json(resultJson);
                }
                if (results) {
                    var resultJson = JSON.stringify(results[0]);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.json(resultJson);
                }
                connection.release();
            });
        });
    },
    editUser: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_updateUser (?,?,?,?,?,?,?)',
                [req.params.IdUser,
                req.body.email,
                req.body.name,
                req.body.lastName,
                req.body.companyName,
                parseInt(req.body.roleId),
                req.body.avatarimg], function (error, results, fields) {
                    if (error) {
                        var Data = {
                            message: 'Usuario No modificado',
                            type: -1
                        }
                        var resultJson = JSON.stringify(Data);
                        resultJson = JSON.parse(resultJson);
                        //send JSON to Express
                        res.status(400).json(resultJson);
                    }
                    if (results) {
                        var resultJson = JSON.stringify(results[0]);
                        resultJson = JSON.parse(resultJson);
                        //send JSON to Express
                        res.json(resultJson);
                    }
                    connection.release();
                });
        });
    },
    deleteUser: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_deleteUser (?)', [req.params.IdUser], function (error, results, fields) {
                if (error) {
                    var Data = {
                        message: 'Usuario No Eliminado',
                        type: -1
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(400).json(resultJson);
                }
                if (results) {
                    var resultJson = JSON.stringify(results[0]);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.json(resultJson);
                }
                connection.release();
            });
        });
    }

};
module.exports = Users;