const path = require('path');
const fs = require('fs');

const { Product , Type } = require("../../database/models");


const controller = {
    home : async (req,res)=>{
        const productsGo = await Product.findAll()
        let products = []
        let gift = []
        let tintos = []
        let blancos = []
        for (let i = 0; i < productsGo.length; i++){
            products.push(productsGo[i].dataValues)
            if (productsGo[i].dataValues.typeId == 5){
                gift.push(productsGo[i].dataValues)
            }else if(productsGo[i].dataValues.typeId == 2){
                tintos.push(productsGo[i].dataValues)
            }else if(productsGo[i].dataValues.typeId == 3){
                blancos.push(productsGo[i].dataValues)
            }
        }
        return res.render(
            'home',{products,gift,tintos,blancos}
        )
    },
}

module.exports = controller