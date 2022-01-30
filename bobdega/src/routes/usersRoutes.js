const express = require ('express');
const { validationResult } = require('express-validator');
const router = express.Router()


const controller = require('../controllers/usersController');
const validationsLogin = require('../middlewares/validationLogin');
const upload = require('../middlewares/multer');
const validationSignIn = require('../middlewares/validationSignIn');

router.get('/signin', controller.signin);




router.post('/create',upload.single('image'),  controller.add);
router.get('/signinUserDetail/:id', controller.userDetail);


router.get('/login', controller.login);
router.post('/login', validationsLogin, controller.loginProcess)
module.exports = router