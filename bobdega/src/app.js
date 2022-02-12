const express = require("express");
const path = require("path")
const methodOverride = require('method-override');
const app = express();
const productRoutes = require ('./routes/productRoutes');
const homeRoutes = require ('./routes/homeRoutes');
const userRoutes = require ('./routes/usersRoutes');
const cookie = require('cookie-parser');
const session = require('express-session')

app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({ 
	secret: 'a la grande le puse cuca',
	resave: false,
	saveUninitialized: true,
}));


app.listen(process.env.PORT || 3000,()=>
    console.log("Levantando un servidor con Express en 3000")
    )

app.use('/',homeRoutes)

app.use('/product',productRoutes)

app.use('/user', userRoutes);




