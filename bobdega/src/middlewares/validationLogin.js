const path = require('path')
const { check } = require('express-validator');

let validationResult = [  /** validaciond el formulario de login */
	
	check('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()  /**validacion input nombre  */
		.isEmail().withMessage('Debes escribir un formato de correo válido'),


	check('password')                                                 
		.notEmpty().withMessage('Tienes que escribir una contraseña'),  /**valida que coincida la contraseña sea correcta  */
			
]

module.exports = validationResult