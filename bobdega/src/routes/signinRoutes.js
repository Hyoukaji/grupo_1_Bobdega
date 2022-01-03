const express = require ('express')
const router = express.Router()

const controller = require('../controllers/signinController')

router.get('/', controller.signin)

module.exports = router