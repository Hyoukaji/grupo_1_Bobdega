const express = require ('express')
const router = express.Router()

const controller = require('../controllers/homeController')

router.get('/', controller.home);

router.get('/login', controller.login);
    


module.exports = router