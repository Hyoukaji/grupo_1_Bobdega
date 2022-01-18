const express = require ('express')
const router = express.Router()
const multer = require ('multer');
const path = require('path');

const controller = require('../controllers/signinController');

const multerDiskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/userImageUploads'));
	},
	filename: (req, file, cb) => { const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, uniqueSuffix + file.fieldname + path.extname(file.originalname)) 
	},
	fileFilter: (req, file, cb) => {
		// Acá va la lógica para validar los tipos de archivo
	}
});

const upload = multer ({storage: multerDiskStorage}); 

router.get('/', controller.signin);
router.post('/create',upload.single('image'), controller.add);
router.get('/signinUserDetail/:id', controller.userDetail);
module.exports = router