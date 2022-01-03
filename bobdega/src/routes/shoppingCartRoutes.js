const express = require ('express')
const router = express.Router()

const controller = require('../controllers/shoppingCartController')

router.get('/', controller.shoppingCart)

module.exports = router