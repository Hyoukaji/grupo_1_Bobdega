const path = require('path')
const { body } = require('express-validator');
const { User } = require("../../database/models");


validationSignIn =  [

    body('firstName')
        .notEmpty().withMessage('completar Nombre').bail()
        .isLength({ min:2, max:20 }).withMessage("Minimo 2 caracteres y maximo 20"),  /**validacion input nombre */

    body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()  /**validacion input email */
		.isEmail().withMessage('Debes escribir un formato de correo válido').bail()
        .custom(async (email) => {
            const existingUser = await User.findOne({
                where: { 
                    email: email
                }
            });
            if (existingUser) {
                throw new Error('Email ya registrado')
            }
        }),

    body('lastName')
        .notEmpty().withMessage('Completar Apellido').bail()
        .isLength({ min:2, max:20 }).withMessage("Minimo 2 caracteres y maximo 20"), /** validacion input apellido  */

    
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail() /** validacion password */

        .isLength({ min:8, max:30 }).withMessage("Debe tener al menos 8 caracteres").bail()
        .isStrongPassword().withMessage("Debe tener al menos una minuscula, mayuscula, numero y caracter especial").bail()/** valida que la contraseña se del formato correcto */


		.custom((value, { req }) => {
			if (value !== req.body.password2) {
				throw new Error('Las contraseñas tienen que coincidir');  /**valida que las contraseñas coincidan */
			}
			return true;
		}),
	body('password2').custom((value, { req }) => {
		if (req.body.password !== "" && value !== req.body.password) { /** validacion input repetir contraseña */
			throw new Error('Las contraseñas tienen que coincidir');
		}
		return true;
	}),   

    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif'] /** valida formato de imagen */

        if (!file) {
            throw new Error ('Seleccione una imagen de perfil')
        
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las archivos permitidos son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true 
    })

	
]

module.exports = validationSignIn

