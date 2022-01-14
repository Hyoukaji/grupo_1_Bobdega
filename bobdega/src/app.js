const express = require("express");
const path = require("path")
const methodOverride = require('method-override');
const app = express();
const productRoutes = require ('./routes/productRoutes');
const homeRoutes = require ('./routes/homeRoutes');

app.use(express.static("../public"));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));


app.listen(process.env.PORT || 3000,()=>
    console.log("Levantando un servidor con Express en 3000")
    )

app.use('/',homeRoutes)

app.use('/product',productRoutes)


