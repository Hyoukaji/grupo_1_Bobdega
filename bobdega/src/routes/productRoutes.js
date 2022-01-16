const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const controller = require('../controllers/productController');

const multerDiskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/uploads'));
	},
	filename: (req, file, cb) => { const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, uniqueSuffix + file.fieldname + path.extname(file.originalname)) 
	},
	fileFilter: (req, file, cb) => {
		// Acá va la lógica para validar los tipos de archivo
	}
});

const upload = multer ({storage: multerDiskStorage}) 


router.get('/', controller.product) // muestra todos los productos

router.get('/shoppingCart', controller.shoppingCart)
// GET ALL PRODUCTS / 
//router.get('/', controller.index); 

// CREATE ONE PRODUCT / 
router.get('/create', controller.create); // muestra el formulario de creación
router.post('/', upload.single('imageProduct'), controller.store); // almacena la información en la DB

// GET ONE PRODUCT / 
router.get('/detail/:id', controller.detail); // muestra el detalle de un producto

// EDIT ONE PRODUCT / 
//router.get('/edit/:id', controller.edit); 
//router.put('/:id', controller.update); 

// DELETE ONE PRODUCT/ 
//router.delete('/:id', controller.destroy);

module.exports = router