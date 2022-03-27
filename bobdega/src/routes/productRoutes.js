const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const controller = require('../controllers/productController');
const createValidation = require('../middlewares/validationsCreateProducts')
const userMiddleware = require("../middlewares/authMiddleware")

const multerDiskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/uploads'));
	},
	filename: (req, file, cb) => { const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, uniqueSuffix + file.fieldname + path.extname(file.originalname)) 
	},
	fileFilter: (req, file, cb) => {
		
	}
});

const upload = multer ({storage: multerDiskStorage}) 


router.get('/',userMiddleware, controller.show) 
router.get('/shoppingCart',userMiddleware, controller.shoppingCart)
router.post('/buyProduct/:id',userMiddleware, controller.buyProduct)
router.get('/create',userMiddleware,controller.create);
router.post('/search',userMiddleware, controller.search);
router.post('/', upload.single('imageProduct'), createValidation, controller.store); 
router.get('/detail/:id', controller.detail); 
router.get('/productByCategory/:id', controller.productByCategory); 
router.get('/edit/:id', controller.edit); 
router.put("/:id", upload.single("image"), controller.update); 

// DELETE ONE PRODUCT/ 
router.delete('/:id', controller.destroy);

module.exports = router