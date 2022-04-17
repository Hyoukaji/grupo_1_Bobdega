const express = require ('express');
const { validationResult } = require('express-validator');
const router = express.Router()


const controller = require('../controllers/usersController');
const validationsLogin = require('../middlewares/validationLogin');
const upload = require('../middlewares/multer');
const signInValidations = require('../middlewares/validationSignIn');
const guestMiddleware = require("../middlewares/guestMiddleware");
const userLoggedAdminMiddleware = require('../middlewares/userLoggedAdminMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware");


router.get('/signin',guestMiddleware, controller.signin);

router.post('/signin', upload.single('image'),signInValidations,  controller.add);

router.get('/signinUserDetail/:id', controller.userDetail);

router.post('/logout', controller.logout);
router.get('/login',guestMiddleware, controller.login);
router.post('/login', validationsLogin, controller.loginProcess)
router.get('/rename',adminMiddleware, controller.rename);
router.put('/adminCreate', controller.adminCreate)

router.get('/profile', controller.profile)

module.exports = router