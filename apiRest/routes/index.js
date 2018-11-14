var express = require('express');
var router = express.Router();
var login = require('../controllers/login');



/* getIndex. */
router.get('/', function(req, res, next) {
  
  res.send("Welcome to API REST: ");

});
// Login
router.route('/')
.post(login.getLogin);



module.exports = router;
