const express = require ('express')
const router = express.Router()

const controller = require('../controllers/productController')

router.get('/', controller.product)

router.get('/:id',controller.product1)

module.exports = router