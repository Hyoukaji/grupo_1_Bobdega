function userLoggedAdminMiddleware (req, res, next) {
	res.locals.isAnUserLogged = false;

	if (req.session.userLogged !== undefined && req.session.userLogged.category == "Admin") {
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			
		}
	}

	next();
}

module.exports = userLoggedAdminMiddleware;