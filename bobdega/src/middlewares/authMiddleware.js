function authMiddleware(req, res, next) {
	if (req.session.userLogged === undefined) {   //autoriza a ingresar si estas logueado
		return res.redirect("/user/login");
	}

	next();
}

module.exports = authMiddleware;