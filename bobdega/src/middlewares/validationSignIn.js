const path = require('path')
const { body } = require('express-validator');


validationSignIn =  [

    body('firstName')
        .notEmpty().withMessage('completar Nombre').bail(),

    body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),

    body('lastName')
        .notEmpty().withMessage('Completar Apellido').bail(),



    body('userName')
        .notEmpty().withMessage('Completar ususario').bail(),

    
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.custom((value, { req }) => {
			if (value !== req.body.password2) {
				throw new Error('Las contraseñas tienen que coincidir');
			}
			return true;
		}),
	body('password2').custom((value, { req }) => {
		if (req.body.password !== "" && value !== req.body.password) {
			throw new Error('Las contraseñas tienen que coincidir');
		}
		return true;
	}),   

    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']

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

