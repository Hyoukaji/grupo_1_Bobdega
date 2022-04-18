function userLoggedMiddleware (req, res, next) {
	res.locals.isAnUserLogged = false;
	res.locals.isAnAdminLogged = false;

	if (req.session.userLogged !== undefined) {
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			  //valida usuario logueado
		}
		if (req.session.userLogged.category == "Admin"){
			res.locals.isAnAdminLogged = true;
		}
	}

	next();
}

module.exports = userLoggedMiddleware;