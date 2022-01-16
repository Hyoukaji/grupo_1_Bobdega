const path = require('path');
const fs = require('fs');


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../../data/products.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - DB
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const controller = {
    product : (req,res)=>{
        return res.render(
            'product',
            {products : products}
        )
        
    },
    detail : (req,res)=>{
        const productId = Number(req.params.id);

        const theProduct = products.find(thisIsTheProduct => thisIsTheProduct.id === productId);

        return res.render(
            'detail',
            {producto : theProduct}
        )
        
    },
    shoppingCart : (req,res)=>{
        return res.render(
            'shoppingCart'
        )
        
    },
    create : (req,res)=>{
        return res.render(
            'create'
        )
        
    },
    store: (req,res)=>{
		// Función para generar el ID
		const generateID = () => {
			// 1. Obtenemos el último producto almacenado en la DB
			const lastProduct = products[products.length - 1];
			// 2. Obtenemos el ID de ese último producto
			const lastID = lastProduct.id;
			// 3. Retornamos ese último ID incrementado en 1
			return lastID + 1;
		}

		// Inserto el nuevo producto en la DB
		// productsDB.push({
		// 	name: req.body.name,
		// 	description: req.body.description,
		// 	price: req.body.price,
		// 	category: req.body.category,
		// })
		products.push({
			id: generateID(),
			...req.body,
			image: req.file.filename
		});

		// Reescribo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(products, null, " "));

		// Redirección
		return res.redirect("/product");
	},
    delete: (req, res) => {
		// Filtro el array de productos original
		const finalPdts = products.filter(oneProduct => oneProduct.id !== Number(req.params.id));

		// Reescribo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(finalPdts, null, " "));
		
		// Redirección
		return res.redirect("/product");
	},
	edit: (req, res) => {
		const productID = Number(req.params.id);

		const theProduct = products.find(product => product.id === productID);

		return res.render("products-edit", { theProduct });
	},
	update: (req, res) => {
		const productID = Number(req.params.id);

		// Mapeo el array de productos original para editar el producto
		const finalPdts = products.map(oneProduct => {
			if (oneProduct.id === Number(req.params.id)) {
				return { 
					...oneProduct,
					...req.body,
					image: req.file ? req.file.filename : oneProduct.image
				}
			}
			return oneProduct;
		});

		// Reescribo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(finalPdts, null, " "));

		// Redirección
		return res.redirect(`/products/${productID}`);
	}
}

module.exports = controller