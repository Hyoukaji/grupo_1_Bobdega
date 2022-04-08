const path = require('path');
const fs = require('fs');
const db = require("../../database/models")
const { validationResult, body } = require("express-validator");
const Op = db.Sequelize.Op; 
const { Product , Type , ProductCart , Cart } = require("../../database/models");


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
				let titulo = "Todos los productos"
	 			return res.render("product", { products,titulo });
	 		})
	 		.catch((err) => { console.log(err) });
	 },

	product: async (req, res) => {
		const products = await Product.findAll({include:["types"]});
		let titulo = "Todos los productos"
		return res.render("product", { products,titulo });
	},
	create: async (req, res) => {
		console.log("entre a create")
		try {
			const typeGo = await Type.findAll();
			console.log("te muestro el type")
			let type = []
       		for (let i = 0; i < typeGo.length; i++){
            	type.push(typeGo[i].dataValues)
        }
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

		const resultValidation = validationResult(req); // validaciones de formulario de create

		if (resultValidation.errors.length > 0) {
			const typeGo = await Type.findAll();
			console.log("te muestro el type")
			let type = []
       		for (let i = 0; i < typeGo.length; i++){
            	type.push(typeGo[i].dataValues)
			   }
		 	return res.render("create", {
		 		errors: resultValidation.mapped(),
		 		oldData: req.body,
				type
		 	});
		 }

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
		const titulo = req.params.title;
		Product.destroy({ where: { id: productID }});
		Product
	 		.findAll({
	 			include: ["types"]
	 		})
	 		.then((products) => {
	 			return res.render("product", { products, titulo});
	 		})
	 		.catch((err) => { console.log(err) });
	 
	},

	search: async (req, res) => {
		const productID = req.body.search;
		const productsGo = await Product.findAll({
			where: { 
				name: {
				[Op.like]: "%" + productID + "%"
			}
			}
		});

		let products = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
        }

		let titulo = "Resultados de busqueda"

		return res.render("product", { products,titulo });
	},

	productByCategory: async (req, res) => {
		const productType = req.params.id;
		const productsGo = await Product.findAll({
			where: { 
				typeId: {
					 [Op.eq]: productType
					
				}
				
			}
		});

		let products = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
        }

		const typeGo = await Type.findAll()
		let types = []
        for (let i = 0; i < typeGo.length; i++){
            types.push(typeGo[i].dataValues)
        }

		let titulo = ""
		if (types[productType] != undefined){
			titulo = types[productType - 1].name
		}else{
			titulo = "Regalos"
		}
		return res.render("product", { products, titulo });
	},


	
	detail: async (req, res) => {
		const productID = req.params.id;
		const producto = await Product.findByPk(productID, { include: ["types"] });
		const typeGo = await Type.findAll()
		let typeNumber = producto.typeId - 1
		let type = typeGo[typeNumber].dataValues
		return res.render("detail", { producto , type });
	},

	edit: async (req, res) => {
		const productID = req.params.id;
		const theProduct = await Product.findByPk(productID, { include: ["types"] });
		const type = await Type.findAll({});
		return res.render("edit", { theProduct, type });
	},

	update: async (req, res) => { 
		const productID = req.params.id;
		const productoE = await Product.findByPk(productID, { include: ["types"] });
		productoE.update({
		   name:req.body.name,
		   price:req.body.price,
		   description:req.body.description,
		   alcohol:req.body.alcohol,
		   image: req.file.filename},
		   {where:{id:productID}})
		   
	   const producto = await Product.findByPk(productID, { include: ["types"] });
	   const type = await Type.findAll({});
	   return res.render("detail", {producto, type});
   },


	shoppingCart: async (req,res) => {
		const productsGo = await Product.findAll()
        let products = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
        }
		res.render("shoppingCart",{products})
	},

	buyProduct: async (req,res) => {
		console.log("entrando a comprar")
		let user = req.session.userLogged
		let uId = user.id
		let carts = []
		const cartGo = await Cart.findAll()
		for (let i = 0; i < cartGo.length; i++){
			carts.push(cartGo[i].dataValues)
		}
		console.log("verifico el cartGo")
		if (carts != undefined){
			
			const myCart = carts.find(function(element) {
				return element.userId = uId;
			  });
			if (myCart){
				let cId = myCart.id
			}else{
				let cId = carts.length + 1
				const createCart = await Cart.create({ 
					userId : uId });
			}
		}else{
			let cId = 1
			const createCart = await Cart.create({ 
				userId : uId });
		}
		console.log("salgo de verificar")
		const producto = await Product.findByPk(req.params.id, { include: ["types"] });
		const createProductInCart = await ProductCart.create({ 
			productId: producto.id,
			cartId: cId,
			productPrice: producto.price,
			quantity: 1 });

		console.log("voy a redirijir")

		return res.redirect("/product");

	}
}

module.exports = controller