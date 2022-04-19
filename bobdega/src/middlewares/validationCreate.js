const path = require('path')
const { body } = require('express-validator');


validationCreate =  [

    body('name')
        .notEmpty().withMessage('Completar Nombre').bail()
        .isLength({min:5}).withMessage("El nombre debe tener al menos 5 letras"),  //valdiacion input nombre

    body('type')
        .notEmpty().withMessage('Debe elegir un tipo de vino').bail(), /**validacion input tipo */

    body('price')
        .notEmpty().withMessage('Completar precio').bail()  /** validacion input precio */
        .isFloat().withMessage("Tiene que ser un número"),
    
    body('alcohol')
        .notEmpty().withMessage('Completar volumen alcoholico').bail()  /**validacion input alcohol */
        .isInt().withMessage("Tiene que ser un número"),

    body('description')
        .notEmpty().withMessage('La descripción debe tener al menos 20 letras').bail()     /** validacion input descripción */
        .isLength({ min:20, max:999 }).withMessage("La descripción tiene que ser más larga"),

    

    body('imageProduct').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif']  

        if (!file) {
            throw new Error ('Seleccione una imagen para el producto')
        
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las archivos permitidos son ${acceptedExtensions.join(', ')}`);  /**valida formato de imagen*/
            }
        }
        return true 
    })

	
]

module.exports = validationCreate