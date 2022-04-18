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
		const mockData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../MOCK_DATA.json"), "utf8")); // averiguar que hace 
		const x = await Product.bulkCreate(mockData);
		console.log(x)
		return res.json(mockData);
	
	},

	show: function (req, res) {         //renderiza y trae la lista de todos los productos                                             
	 	Product
	 		.findAll({
	 			include: ["types"]
	 		})
	 		.then((products) => {
				let titulo = "Todos los productos"
	 			return res.render("product", { products,titulo }); /**se le manda el titulo segun cual es la lista q se muestra */
	 		})
	 		.catch((err) => { console.log(err) });
	 },

	// product: async (req, res) => {
	// 	const products = await Product.findAll({include:["types"]});
	// 	let titulo = "Todos los productos"
	// 	return res.render("product", { products,titulo });
	// },
	create: async (req, res) => {                  //creacion de productos
		
		try {
			const typeGo = await Type.findAll(); 
			
			let type = []
       		for (let i = 0; i < typeGo.length; i++){ //si el indice es 0 muestra las distintos tipos para el nuevo producto 
            	type.push(typeGo[i].dataValues)
        }
			console.log(type)
			return res.render("create", { /**renderiza la pagina creacion de productos con los tipos disponibles */
				type
			});
		} catch (error) {
			console.log("No se pudo crear el producto", error);
		}

		return res.redirect(/**te redirije a todos los productos si no funciona la busqueda de tipos */
            '/product'
        )
	},

	store: async (req, res) => {

		const resultValidation = validationResult(req); // validaciones de formulario de create

		if (resultValidation.errors.length > 0) { /** busca si el error es 1 o mas  */
			const typeGo = await Type.findAll();
			
			
			let type = []
       		for (let i = 0; i < typeGo.length; i++){ /**si no encuentra errores sube el producto */
            	type.push(typeGo[i].dataValues)
			   }
		 	return res.render("create", {
		 		errors: resultValidation.mapped(), /** si encuentra errores nos devuelve a la pagina con los errores marcados */
		 		oldData: req.body,
				type
		 	});
		 }

		const createProduct = await Product.create({ /**creamos el producto con los datos validados */
			name: req.body.name,
			typeId: req.body.type,
			price: req.body.price,
			alcohol: req.body.alcohol,
			description: req.body.description,
			image: req.file.filename  });


		return res.redirect("/product"); 	/**redirijimos a todos los productos */
	},
	
	destroy: async (req, res) => {     
		const productID = req.params.id;
		
		Product.destroy({ where: { id: productID }}); /**elimina el producto por id */
		
		return res.redirect("/product"); 	/**redirijimos a todos los productos */;
	 
	},

	search: async (req, res) => {  /** busqueda pro nombre del producto */
		const productID = req.body.search;   
		const productsGo = await Product.findAll({
			where: { 
				name: {
				[Op.like]: "%" + productID + "%"   /** busca si coincide una cadena con el id del nombre del producto*/ 
			}
			}
		});

		let products = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
        }

		let titulo = "Resultados de busqueda"

		return res.render("product", { products,titulo });   /**renderiza los productos encontrados  */
	},

	productByCategory: async (req, res) => {	
		const productType = req.params.id;
		const productsGo = await Product.findAll({    /**buscamos segun el id del tipo */
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
		return res.render("product", { products, titulo }); 	/** renderiza los productos de un mismo tipo */
	},


	
	detail: async (req, res) => {
		const productID = req.params.id;
		const producto = await Product.findByPk(productID, { include: ["types"] });		/**busca el producto segun el id */
		// const typeGo = await Type.findAll()
		// let typeNumber = producto.typeId - 1
		// let type = typeGo[typeNumber].dataValues
		return res.render("detail", { producto });		/**renderiza el detalle con el producto buscado */
	},

	edit: async (req, res) => {
		const productID = req.params.id;
		const theProduct = await Product.findByPk(productID, { include: ["types"] });	/**busca el producto segun el id */
		const type = await Type.findAll({});
		return res.render("edit", { theProduct, type });	/**renderiza con los tipos cargados */
	},
	

	update: async (req, res) => {
		console.log(req.body)
		const resultValidation = validationResult(req); // validaciones de formulario de create
         console.log("antes de validar")

		 console.log(req.params.id)
		 console.log(typeof req.params.id)
		if (resultValidation.errors.length > 0) {
			const typeGo = await Type.findAll();
			let type = []
       		for (let i = 0; i < typeGo.length; i++){
            	type.push(typeGo[i].dataValues)
			   }
			let theProduct = {id: req.params.id }
		 	return res.render("edit", {				/**si hay errores renderiza denuevo el edit con los tipos cargados */
		 		errors: resultValidation.mapped(),
		 		oldData: req.body,
				theProduct, 
				type
		 	});
		 }
		 
		const productID = parseInt(req.params.id);	/**pasamos el id q viene en string a int */
		const productoE = await Product.findByPk(productID, { include: ["types"] });	/**buscamos el producto */
		
		
		productoE.update({	/**lo updateamos con la data q viene del body*/
		   name:req.body.name,
		   price:req.body.price,
		   description:req.body.description,
		   alcohol:req.body.alcohol,
		   image: req.file.filename},
		   {where: {id:productID}});
		   
		   
	   const producto = await Product.findByPk(productID, { include: ["types"] });
	   return res.render("detail", {producto});/**renderiza el detalle con el producto updateado*/
   },


	shoppingCart: async (req,res) => {
		const productsGo = await Product.findAll()/**buscamos todos los productos */
        let products = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
        }
		res.render("shoppingCart",{products})/**renderiza el carrito con todos los productos q existen */
	},										/**SI EMMM NO ANDA EN REALIDAD EL CARRITO, ES SOLO UNA MUESTRA */

	buyProduct: async (req,res) => {/**agregamos un producto al carrito del usuario logueado */
		
		let user = req.session.userLogged
		let uId = user.id
		let carts = []
		const cartGo = await Cart.findAll()/**buscamos todos los carritos */
		for (let i = 0; i < cartGo.length; i++){
			carts.push(cartGo[i].dataValues)
		}
		
		if (carts != undefined){		/**si hay carritos buscamos el q le pertenece al usuario logueado (tal vez deba ir un []) */
			
			const myCart = carts.find(function(element) {
				return element.userId = uId;
			  });
			if (myCart){/**si tiene un carrito guardamos el id de ese carrito */
				let cId = myCart.id
			}else{/**si no tenia carrito le hacemos uno con el ultimo id */
				let cId = carts.length + 1
				const createCart = await Cart.create({ 
					userId : uId });
			}
		}else{							/**si no existe ningun carrito creamos uno para el usuario logueado */
			let cId = 1
			const createCart = await Cart.create({ 
				userId : uId });
		}
		
		const producto = await Product.findByPk(req.params.id, { include: ["types"] }); 	/**buscamos el producto por id */
		const createProductInCart = await ProductCart.create({ /**"CREAMOS" el producto en el carrito */
			productId: producto.id,
			cartId: cId,
			productPrice: producto.price,
			quantity: 1 });

			

		return res.redirect("/product");	/**redirije a todos los productos */

	}
}

module.exports = controller