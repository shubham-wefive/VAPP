const express = require('express');
const router = express.Router();
const { register, login, allUsers, forgotCredentials, forgototp, postforgetpass } = require('../controller/userController');


router.post('/register', register);
router.post('/login', login);
router.get('/users', allUsers);

router.post('/forgotcredentials', forgotCredentials);
router.post('/forgototp', forgototp);
router.patch('/setnewpassword', postforgetpass);

module.exports = router;