function authMiddleware(req, res, next) {
	if (req.session.userLogged === undefined) {
		return res.redirect("/user/login");
	}

	next();
}

module.exports = authMiddleware;