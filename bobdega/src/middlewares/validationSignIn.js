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

    
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()

        .isLength({ min:8, max:30 }).withMessage("Debe tener al menos 8 caracteres").bail()
        .isStrongPassword().withMessage("Debe tener al menos una minuscula, mayuscula, numero y caracter especial").bail()


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
        let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif']

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

