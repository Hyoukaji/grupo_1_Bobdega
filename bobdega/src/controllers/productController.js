const path = require('path');
const fs = require('fs');

const { Products , Types } = require("../../database/models");


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../../data/products.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - DB
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const controller = {
	mock: async (req, res) => {
		const mockData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../MOCK_DATA.json"), "utf8"));
		const x = await Product.bulkCreate(mockData);
		console.log(x)
		return res.json(mockData);
	},
	// show: function (req, res) {
	// 	Product
	// 		.findAll({
	// 			include: ["brand"]
	// 		})
	// 		.then((products) => {
	// 			return res.render("index", { products });
	// 		})
	// 		.catch((err) => { console.log(err) });
	// },
	product: async (req, res) => {
		const products = await Products.findAll({include:["types"]});
		return res.render("product", { products });
	},
	create: async (req, res) => {
		try {
			const type = await Types.findAll({});
			return res.render("create", {
				type
			});
		} catch (error) {
			console.log("No se pudo crear el producto", error);
		}

		return res.render(
            'create'
        )
	},

	store: async (req, res) => {
		const productStored = await Products.create(req.body);
		productStored.addCategories(req.body.categories);
		return res.redirect("/products");
	},
	
	destroy: async (req, res) => {
		const productID = req.params.id;
		Products.destroy({ where: { id: productID }});
		return res.redirect("/products");
	},
	
	detail: async (req, res) => {
		const productID = req.params.id;
		const producto = await products.findByPk(productID, { include: ["types"] });
		return res.render("detail", { producto });
	},

	edit: async (req, res) => {
		const productID = req.params.id;
		const theProduct = await Products.findByPk(productID, { include: ["type"] });
		const type = await Types.findAll({});
		return res.render("edit", { theProduct, type });
	},

	update: async (req, res) => {
		return res.send(req.params.id);
		/// COMPLETAR EL PATCH
	},

	shoppingCart: async (req,res) => {
		/// COMPLETAR EL SHOPPING CART
	}
}

module.exports = controller