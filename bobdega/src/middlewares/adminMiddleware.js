function adminMiddleware(req, res, next) {             //valida si el usuario logueado es un Admin, si no lo es te redirige al home 
    if (req.session.userLogged){
        if (req.session.userLogged.category === "User") {
            return res.redirect("/");
        } 
    }else{
        return res.redirect("/user/login");
    }
	next();
}

module.exports = adminMiddleware;