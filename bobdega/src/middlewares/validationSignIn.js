const path = require('path')
const { body } = require('express-validator');
const { User } = require("../../database/models");

validationSignIn =  [

    body('firstName')
        .notEmpty().withMessage('completar Nombre').bail()
        .isLength({ min:2, max:20 }).withMessage("Minimo 2 caracteres y maximo 20"),

    body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido')
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
        .isLength({ min:2, max:20 }).withMessage("Minimo 2 caracteres y maximo 20"),

    body('username')
        .notEmpty().withMessage('Completar ususario').bail(),

	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({ min:8, max:30 }).withMessage("Debe tener al menos 8 caracteres").bail()
        .matches(/^(?=.\d)(?=.[a-z])(?=.[A-Z])[a-zA-Z\d@$.!%#?&]/,).withMessage("Tiene que tener una mayuscula, una minuscula y un caracter especial")
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

