const express = require("express");
const app = express();
app.use(express.static("../public"));
app.set('view engine','ejs')

app.listen(process.env.PORT || 3000,()=>
    console.log("Levantando un servidor con Express en 3000")
    )
const homeRoutes = require ('./routes/homeRoutes')

app.use('/',homeRoutes)

app.use('/login',homeRoutes);

app.use('/signin',homeRoutes);

const productRoutes = require ('./routes/productRoutes')

app.use('/product',productRoutes)

const shoppingCartRoutes = require ('./routes/shoppingCartRoutes')

app.use('/shoppingCart',shoppingCartRoutes)

const adminProductRoutes = require ('./routes/adminProductRoutes')

app.use('/adminProduct',adminProductRoutes)

