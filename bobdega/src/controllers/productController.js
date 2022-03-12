const path = require('path');
const fs = require('fs');

const { Product , Type } = require("../../database/models");


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

	show: function (req, res) {
	 	Product
	 		.findAll({
	 			include: ["types"]
	 		})
	 		.then((products) => {
	 			return res.render("product", { products });
	 		})
	 		.catch((err) => { console.log(err) });
	 },

	product: async (req, res) => {
		const products = await Product.findAll({include:["types"]});
		return res.render("product", { products });
	},
	create: async (req, res) => {
		try {
			console.log("intentando tomar los types")
			const type = await Type.findAll();
			console.log(type)
			return res.render("create", {
				type
			});
		} catch (error) {
			console.log("No se pudo crear el producto", error);
		}

		return res.redirect(
            '/product'
        )
	},

	store: async (req, res) => {

		const createProduct = await Product.create({ 
			name: req.body.name,
			typeId: req.body.type,
			price: req.body.price,
			alcohol: req.body.alcohol,
			description: req.body.description,
			image: req.file.filename  });


		return res.redirect("/product");
	},
	
	destroy: async (req, res) => {
		const productID = req.params.id;
		Product.destroy({ where: { id: productID }});
		return res.redirect("/products");
	},
	
	detail: async (req, res) => {
		const productID = req.params.id;
		const producto = await Product.findByPk(productID, { include: ["types"] });
		return res.render("detail", { producto });
	},

	edit: async (req, res) => {
		const productID = req.params.id;
		const theProduct = await Product.findByPk(productID, { include: ["types"] });
		const type = await Type.findAll({});
		return res.render("edit", { theProduct, type });
	},

	update: async (req, res) => { 
		 const productID = req.params.id;
		 const producto = await Product.findByPk(productID, { include: ["types"] });
		 producto.update({
			name:req.body.name,
			price:req.body.price,
			description:req.body.description,
			alcohol:req.body.alcohol},
			{where:{id:productID}})
		const productoShow = await Product.findByPk(productID, { include: ["types"] });
		return res.render("detail", {productoShow});
	},

	shoppingCart: async (req,res) => {
		res.render("shoppingCart")
	}
}

module.exports = controller