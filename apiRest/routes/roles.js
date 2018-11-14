var express = require('express');
var router = express.Router();
var roles = require('../controllers/roles');
var util = require('./../controllers/utils')

/* Roles. */
router.route('/')
.get(util.verifyToken, roles.getRoles)
.post(util.verifyToken, roles.createRol)

/* Modules. */
router.route('/:IdRole')
.get(util.verifyToken, roles.getAllModules)
.put(util.verifyToken, roles.editRol )
.delete(util.verifyToken, roles.deleteRol )

/* Permissions. */
router.route('/:IdRole/:IdModule')
.get(util.verifyToken, roles.getPermissionsxRole)
.put(util.verifyToken, roles.addPermissionxRole )
.delete(util.verifyToken, roles.deletePermissionxRole )

module.exports = router;