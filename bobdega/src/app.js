const express = require("express");
const path = require("path")
const methodOverride = require('method-override');
const app = express();
const productRoutes = require ('./routes/productRoutes');
const homeRoutes = require ('./routes/homeRoutes');
const userRoutes = require ('./routes/usersRoutes');
const cookie = require('cookie-parser');
const session = require('express-session')

//API

const apiUsersRoutes = require('./routes/apis/apiUsersRoutes')
const apiProductsRoutes = require('./routes/apis/apiProductsRoutes')


app.use(cookie());
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

 const userLoggedMD = require("./middlewares/userLoggedMiddleware"); 
 app.use(userLoggedMD); /**comprueba siempre si el usuario esta logueado */ 


app.listen(process.env.PORT || 3001,()=>
    console.log("Levantando un servidor con Express en 3001")
    )

app.use('/',homeRoutes)

app.use('/product',productRoutes)

app.use('/user', userRoutes);

// API

app.use(apiUsersRoutes);
app.use(apiProductsRoutes);

//error 404
app.use((req, res, next) => {
    res.status(404).render('error404');
});
