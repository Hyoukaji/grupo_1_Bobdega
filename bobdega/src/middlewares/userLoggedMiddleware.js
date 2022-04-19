
const { User } = require("../../database/models");

async function userLoggedMiddleware  (req, res, next) {
	res.locals.isAnUserLogged = false;
	res.locals.isAnAdminLogged = false;
	console.log("entre al middleware")
	console.log("aca la cookie")
	console.log(req.cookies)
	
	if (req.cookies && req.cookies.usuario){
		const usuarioGo = await User.findOne({where :{email : req.cookies.usuario}})
		console.log(usuarioGo.dataValues)
		req.session.userLogged = usuarioGo.dataValues;

	}

	if (req.session.userLogged !== undefined) {
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			  //valida usuario logueado
		}
		if (req.session.userLogged.category == "Admin"){
			res.locals.isAnAdminLogged = true;
		}
	}//else if(usuarioGo){
	// 	res.locals.isAnUserLogged = true;
	// 	res.locals.userData = {
	// 		name: req.session.userLogged.firstName,			  //valida usuario logueado
	// 	}
	// 	if (req.session.userLogged.category == "Admin"){
	// 		res.locals.isAnAdminLogged = true;
	// 	}
	// }

	next();
}

module.exports = userLoggedMiddleware;