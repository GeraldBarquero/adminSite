var conn = require('../config/dbconnection').mysql_pool;

var Roles = {
    getRoles: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_getRoles', function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'Al ejecutar consulta a Base'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    createRol: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_createRole (?)', [req.body.rolname], function (error, results, fields) {
                if (error) {
                    var Data = {
                        error: 'error: Al ejecutar sp a Base'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    editRol: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_updateRole (?,?)',
                [req.params.IdRole,
                req.body.rolename], function (error, results, fields) {
                    if (error) {
                        var Data = {
                            message: 'Rol No modificado',
                            type: -1
                        }
                        var resultJson = JSON.stringify(Data);
                        resultJson = JSON.parse(resultJson);
                        //send JSON to Express
                        res.status(401).json(resultJson);
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
    deleteRol: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_deleteRole (?,?)', [req.params.IdRole, req.params.DeleteType], function (error, results, fields) {
                if (error) {
                    var Data = {
                        message: 'Rol No Eliminado',
                        type: -1
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    getAllModules: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_getAllModules (?)', [req.params.IdRole], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'Al ejecutar consulta a Base'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    getPermissionsxRole: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_getAllPermissions (?,?)', [req.params.IdRole, req.params.IdModule], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'Al ejecutar consulta a Base'
                    }
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    addPermissionxRole: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_createPermissionxRole (?,?)', [req.params.IdModule, req.params.IdRole], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'Al ejecutar consulta a Base'
                    }
                    console.log(error)
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
    deletePermissionxRole: function (req, res) {
        conn.getConnection(function (err, connection) {
            connection.query('CALL sp_security_deletePermissionxRole (?,?)', [req.params.IdModule, req.params.IdRole], function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    //make results 
                    var Data = {
                        error: 'Al ejecutar consulta a Base'
                    }
                    console.log(error)
                    var resultJson = JSON.stringify(Data);
                    resultJson = JSON.parse(resultJson);
                    //send JSON to Express
                    res.status(401).json(resultJson);
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
module.exports = Roles;