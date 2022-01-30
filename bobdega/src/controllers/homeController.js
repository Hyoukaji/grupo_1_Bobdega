const path = require('path');
const fs = require('fs');


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../../data/products.json');
const filePathB = path.join(__dirname, '../../data/users.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - 
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const users = JSON.parse(fs.readFileSync(filePathB, 'utf-8'));



const controller = {
    home : (req,res)=>{
        return res.render(
            'home', {

                products

            }
        )
        
    },
}

module.exports = controller