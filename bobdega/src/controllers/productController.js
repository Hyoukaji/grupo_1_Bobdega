const listaProductos = [
    {
        id : 0,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto1.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 1,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto2.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 2,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto3.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    },

    {
        id : 3,
        nombre : "Catena - Nicola Catena Bonarda - Celler",
        img : "producto4.jpg",
        precio : "USD $4000",
        productor : "Catena Zapata",
        tipo : "Tinto",
        variedad : "Bonarda",
        corte : "100% Bonarda",
        alcohol : "13,50%",
        lugar : "La Vendimia, El Mirador, Mendoza. ALTURA (S.N.M.) 750",
        pais : "Argentina",
        enologo : "Alejandro Vigil",
        productor : "Catena Zapata",
        barricado : "18 meses en barricas de roble francés",
        elaboracion : "Fermentación: Levaduras nativas. Maceración fría en barricas durante 4 días. debajo de 10º. Temp. Ferm. entre 25 y 30º C durante 15 días.",
        ficha : "Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia. Catena Zapata"
    }
]


const controller = {
    product : (req,res)=>{
        return res.render(
            'product',
            {producto : listaProductos[0]}
        )
        
    },
    product1 : (req,res)=>{
        let id = req.params.id;
        return res.render(
            'product',
            {producto : listaProductos[id]}
        )
        
    }
}

module.exports = controller