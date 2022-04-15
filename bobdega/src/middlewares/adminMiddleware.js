function adminMiddleware(req, res, next) {
    if (req.session.userLogged){
        if (req.session.userLogged.category === "User") {
            console.log("No puedes crear admin si no eres uno")
            return res.redirect("/");
        } 
    }else{
        return res.redirect("/user/login");
    }
	next();
}

module.exports = adminMiddleware;