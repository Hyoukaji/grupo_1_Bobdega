const express = require("express");
const path = require('path');
const app = express();
app.use(express.static("../public"));
app.set('view engine', 'ejs');

app.listen(3000,()=>
    console.log("Levantando un servidor con Express en 3000")
    )


app.get('/', (req, res) => {
    res.render(path.join(__dirname,"/views/home"))
});

app.get('/signin', (req, res) => {
    res.render(path.join(__dirname,"/views/signin"))
});

app.get('/login', (req, res) => {
    res.render(path.join(__dirname,"/views/login"))
});

app.get('/shoppingCart', (req, res) => {
    res.render(path.join(__dirname,"/views/shoppingCart"))
});

app.get('/Product', (req, res) => {
    res.render(path.join(__dirname,"/views/product"))
});

app.get('/adminProduct', (req, res) => {
    res.render(path.join(__dirname,"/views/adminProduct"))
});

