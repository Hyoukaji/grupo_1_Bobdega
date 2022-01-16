const path = require('path');
const fs = require('fs');


// Ubicación del archivo JSON
const filePath = path.join(__dirname, '../../data/products.json');

// Lectura del archivo JSON y parseado a array - IMPORTANTE - DB
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));



const controller = {
    home : (req,res)=>{
        return res.render(
            'home', {

                products

            }
        )
        
    },
    login : (req,res)=>{
        return res.render(
            'login'
        )
        
    },
    signin : (req,res)=>{
        return res.render(
            'signin'
        )
        
    }
}

module.exports = controller