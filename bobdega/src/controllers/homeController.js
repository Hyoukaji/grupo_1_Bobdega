const path = require('path');
const fs = require('fs');

const { Product , Type } = require("../../database/models");


const controller = {
    home : async (req,res)=>{
        const productsGo = await Product.findAll()
        let products = []
        for (let i = 0; i < productsGo.length; i++){
            console.log("entrando al for")
            products.push(productsGo[i].dataValues)
        }
        return res.render(
            'home',{products}
        )
    },
}

module.exports = controller