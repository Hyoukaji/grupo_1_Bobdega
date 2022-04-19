//api de productos 


const { Product, Type } = require("../../../database/models");

const productsController = {
    'list': (req, res) => {
        Product.findAll({
            include: ["types"]   
        })
        .then(allProducts => {
            let products = [];
            let countByCategory = {
                espumantes: 0,
                tintos: 0,
                blancos: 0, 
                rosados: 0,
                regalos: 0,
            }
            allProducts.forEach(data => {
                let product = {
                    id: data.id,
                    name: data.name,
                    type: data.types.name,
                    description: data.description,
                    detail: `/api/products/${data.id}`
                    
                };
                products.push(product);
                switch(data.typeId) {
                    case 1:
                      countByCategory.espumantes++;
                      break;
                    case 2:
                        countByCategory.tintos++;
                      break;
                      case 3:
                        countByCategory.blancos++;
                      break;
                      case 4:
                        countByCategory.rosados++;
                      break;
                     default:
                        countByCategory.regalos++;
                  }
               
            })
            res.status(200).json( {
                    
                    status:200,
                    count: products.length,
                    countByCategory: countByCategory,
                    url: "api/products",
                    products
            })
        })
    },

    'detail': (req, res) => {
        Product.findByPk(req.params.id)
            .then(data => {
                let product = {
                    id: data.id,
                    name: data.name,
                    typeId: data.typeId,
                    price: data.price,
                    alcohol: data.alcohol,
                    description: data.description,
                    image: `uploads/${data.image}`
                  
                    };
                    
                res.status(200).json( {
                        status:200,
                        url: "api/product/:id",
                        product
                });
            });
    }

}

module.exports = productsController;