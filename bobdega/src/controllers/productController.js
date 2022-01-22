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
            'shoppingCart',{
				products
			}
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
		console.log("")
		const finalPdts = products.filter(oneProduct => oneProduct.id !== Number(req.params.id));

		// Reescribo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(finalPdts, null, " "));
		
		// Redirección
		return res.redirect("/product");
	},
	edit: (req, res) => {
		const productID = Number(req.params.id);

		const theProduct = products.find(product => product.id === productID);

		return res.render("edit", { theProduct });
	},
	update: (req, res) => {
		// Obtenemos el ID que vino como parámetro en la ruta (los parámetros viene en formato String)
		const id = Number(req.params.id); // Number() nos dá el el valor en formato Number
		
		// Acá nos interesa retornar TODOS los productos pero editando el que necesitamos, por eso hacemos un map
		const productsArrayEdited = products.map(oneProduct => {
			if (oneProduct.id === id) { // si los ID's coinciden, editamos ese producto (objeto)
				return {
					...oneProduct, // El spread operator nos permite mantener las propiedades del producto que no queremos cambiar (ID & IMAGE)
					name: req.body.name, // lo mismo que hicimos cuando almacenamos un producto nuevo
					price: req.body.price,
					description: req.body.description,
					type: req.body.type,
					alcohol: req.body.alcohol,
					image: req.file ? req.file.filename : oneProduct.image,
				}
			}
			return oneProduct; // si los ID's no coinciden retornamos ese producto tal cual está almacenado
		});

		// Sobreescribimos de nuevo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(productsArrayEdited, null, ' '));
		
		// finalmente redireccionamos a los productos
		return res.redirect('/product'); 
	},
	
}

module.exports = controller