const express = require ('express')
const router = express.Router()

const controller = require('../controllers/adminProductController')

router.get('/', controller.adminProduct)

module.exports = router