const path = require('path');
const fs = require('fs');

const { Product , Type } = require("../../database/models");


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../../data/products.json');
const filePathB = path.join(__dirname, '../../data/users.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - 



const users = JSON.parse(fs.readFileSync(filePathB, 'utf-8'));



const controller = {
    home : async (req,res)=>{
        const products = await Product.findAll()
        console.log("aca los productos")
        console.log(products.Product.dataValues)
        return res.render(
            'home',{products}
        )
        
    },
}

module.exports = controller