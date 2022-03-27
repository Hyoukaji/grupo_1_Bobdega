const path = require('path')
const { body } = require('express-validator');


validationCreate = [
    body('name')
           .notEmpty().withMessage('Completar el nombre').bail(),
    
    body('type')
            .notEmpty().withMessage('Tenes que seleccionar un tipo').bail(),
    
    body('price')
    .notEmpty().withMessage('¡Debes darle un precio!').bail(),

    body('alcohol')
    .notEmpty().withMessage('¡Debes marcar la graduacion alcoholica!').bail(),

    body('description')
           .notEmpty().withMessage('¡Debes agregar una descripcion!').bail(),

    body('imageProduct').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']

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