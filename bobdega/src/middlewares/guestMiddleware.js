function guestMiddleware (req, res, next) {
	if (req.session.userLogged !== undefined) {
		let user = req.session.userLogged
		return res.render("profile", {user} );
	}

	next();
}

module.exports = guestMiddleware;