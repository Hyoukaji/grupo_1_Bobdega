const listaProductos = [
    {
        id : 0,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto1.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 1,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto2.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 2,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto3.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 3,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto4.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    }
]
const path = require('path');
const fs = require('fs');


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../data/products.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - DB
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const controller = {
    product : (req,res)=>{
        return res.render(
            'detail',
            {producto : listaProductos[0]}
        )
        
    },
    detail : (req,res)=>{
        let id = req.params.id;
        return res.render(
            'detail',
            {producto : listaProductos[id]}
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
		return res.redirect("/products");
	},
    delete: (req, res) => {
		// Filtro el array de productos original
		const finalPdts = products.filter(oneProduct => oneProduct.id !== Number(req.params.id));

		// Reescribo el archivo JSON
		fs.writeFileSync(filePath, JSON.stringify(finalPdts, null, " "));
		
		// Redirección
		return res.redirect("/products");
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