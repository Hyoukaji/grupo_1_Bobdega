
const { User } = require("../../database/models");

async function userLoggedMiddleware  (req, res, next) {
	res.locals.isAnUserLogged = false;
	res.locals.isAnAdminLogged = false;

	if (req.session.userLogged !== undefined) { /**vemos si hay alguien en session */
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			  //name mostrado en el home
		}
		if (req.session.userLogged.category == "Admin"){/**vemos si es un administrador */
			res.locals.isAnAdminLogged = true;
		}
	}else if(req.cookies && req.cookies.usuario){/**en caso de no haber nadie en session verificamos la cookie */

	 	const usuarioGo = await User.findOne({where :{email : req.cookies.usuario}})	//buscamos el usuario en la base de datos con su email
		
		req.session.userLogged = usuarioGo.dataValues;		/**cargamos a la persona en el session */
		res.locals.isAnUserLogged = true;
		res.locals.userData = {
			name: req.session.userLogged.firstName,			  //name mostrado en el home
		}
		if (req.session.userLogged.category == "Admin"){	/**verificamos si es un administrador */
			res.locals.isAnAdminLogged = true;
		}
	 }

	next();
}

module.exports = userLoggedMiddleware;