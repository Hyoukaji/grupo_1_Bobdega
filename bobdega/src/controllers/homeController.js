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
        for (let i = 0; i < productsGo.length; i++){   //productos de quizas te interese
            products.push(productsGo[i].dataValues)
            if (productsGo[i].dataValues.typeId == 5){  /**aqui para abajo son los arrays para carruceles */
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