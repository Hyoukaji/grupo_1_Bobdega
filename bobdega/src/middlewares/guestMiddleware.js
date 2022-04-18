function guestMiddleware (req, res, next) {
	if (req.session.userLogged !== undefined) {   
		let user = req.session.userLogged
		return res.render("profile", {user} );  //para envia al usuario logueado al perfil
	}

	next();
}

module.exports = guestMiddleware;