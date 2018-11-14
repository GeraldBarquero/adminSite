var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var util = require('./../controllers/utils')

/* Users Data. */
router.route('/')
.get(util.verifyToken, users.getAllUser)
.post(util.verifyToken, users.createUser)

router.route('/:IdUser')
.get(util.verifyToken, users.getUser)
.put(util.verifyToken, users.editUser )
.delete(util.verifyToken, users.deleteUser )


module.exports = router;
