const path = require('path')
const multer = require('multer')

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

module.exports = upload 