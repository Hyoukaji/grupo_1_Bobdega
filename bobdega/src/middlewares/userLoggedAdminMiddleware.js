function userLoggedAdminMiddleware (req, res, next) {
	res.locals.isAnUserLogged = false;

	if (req.session.userLogged !== undefined && req.session.userLogged.category == "Admin") { //valida que el usuario logueado sea un admin 
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			
		}
	}

	next();
}

module.exports = userLoggedAdminMiddleware;