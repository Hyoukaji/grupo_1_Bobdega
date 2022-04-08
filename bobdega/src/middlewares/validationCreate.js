const path = require('path')
const { body } = require('express-validator');


validationCreate =  [

    body('name')
        .notEmpty().withMessage('Completar Nombre').bail(),

    body('type')
        .notEmpty().withMessage('Completar Type').bail(),

    body('price')
        .notEmpty().withMessage('Completar precio').bail()
        .isInt().withMessage("Tiene que ser un número"),
    
    body('alcohol')
        .notEmpty().withMessage('Completar volumen alcoholico').bail()
        .isInt().withMessage("Tiene que ser un número"),

    body('description')
        .notEmpty().withMessage('Complete la descripción').bail()
        .isLength({ min:20, max:999 }).withMessage("La descripción tiene que ser más larga"),

    

    body('imageProduct').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif']

        if (!file) {
            throw new Error ('Seleccione una imagen para el producto')
        
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las archivos permitidos son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true 
    })

	
]

module.exports = validationCreate