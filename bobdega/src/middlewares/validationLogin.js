const path = require('path')
const { check } = require('express-validator');

let validationResult = [
	
	check('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),


	check('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña'),
	
]

module.exports = validationResult