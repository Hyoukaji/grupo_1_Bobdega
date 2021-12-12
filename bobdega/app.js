const express = require("express");
const path = require('path');
const app = express();
app.use(express.static("public"));

app.listen(3000,()=>
    console.log("Levantando un servidor con Express en 3000")
    )


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"/views/home.html"))
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,"/views/signin.html"))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"/views/login.html"))
});

app.get('/shoppingCart', (req, res) => {
    res.sendFile(path.join(__dirname,"/views/shoppingCart.html"))
});

app.get('/Product', (req, res) => {
    res.sendFile(path.join(__dirname,"/views/product.html"))
});

