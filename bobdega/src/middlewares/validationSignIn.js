const path = require('path')
const { check } = require('express-validator');

let validationRegister = [

    check('firstName')
        .notEmpty().withMessage('completar Nombre').bail(),

    check('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),

    check('lastName')
        .notEmpty().withMessage('Completar Apellido').bail(),


,
    check('userName')
        .notEmpty().withMessage('Completar ususario').bail(),

    
	check('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.custom((value, { req }) => {
			if (value !== req.body.password2) {
				throw new Error('Las contraseñas tienen que coincidir');
			}
			return true;
		}),
	check('password2').custom((value, { req }) => {
		if (req.body.password !== "" && value !== req.body.password) {
			throw new Error('Las contraseñas tienen que coincidir');
		}
		return true;
	}),   

    check('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']

        if (!file) {throw new Error ('Seleccione una imagen de perfil')}

        else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las archivos permiidos son ${acceptedExtensions.join(', ')}`);
            }
        }
    })
	
]

module.exports = validationRegister