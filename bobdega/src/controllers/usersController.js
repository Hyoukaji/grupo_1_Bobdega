const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult, body } = require("express-validator");
const validationRegister = require('../middlewares/validationSignIn');
const validationSignIn = require('../middlewares/validationSignIn');
const validations = require('../middlewares/validationSignIn');
const { User } = require("../../database/models");

const controller = {
    
    signin : (req,res)=>{
        return res.render(
            'signin'
        )
        
    },

    add: async  (req, res) => {
         const resultValidation = validationResult(req); // validaciones de formulario de signIn

		 if (resultValidation.errors.length > 0) {
            console.log("entro al if")
            console.log(resultValidation.errors.length)
            console.log(resultValidation.mapped())
            console.log(req.body)
		 	return res.render("signin", {
		 		errors: resultValidation.mapped(),
		 		oldData: req.body
		 	});
		 }

        let password = req.body.password
        let encrypt = bcrypt.hashSync(password,10)
        
        
            const createUser = await User.create({ 
                firstName: req.body.lastName,
                lastName: req.body.username,
                email: req.body.email,
                password: encrypt,
                category: 'User',
                image: req.file.filename  });

            console.log("ya creo el registro");

            let user = { 
                firstName: req.body.lastName,
                lastName: req.body.username,
                email: req.body.email,
                password: encrypt,
                category: 'User',
                image: req.file.filename  }

            console.log(user)

            return res.render("signinUserDetail",{user});
        },
    userDetail : (req,res)=>{
        let user = {}
        User.findByPk(req.params.id).then((resultado) => {
            user = resultado.dataValues 
        })
        return res.render('signinUserDetail', { user });
    },
    login : (req,res)=>{
        return res.render(
            'login'
        )
        
    },
    loginProcess: async (req, res) => {
        console.log(req.body)
         const resultValidation = validationResult(req);

		    if (resultValidation.errors.length > 0) {
		 	return res.render("login", {
		 		errors: resultValidation.mapped(),
		 		oldData: req.body
		 	});
		 }

         // 1. Buscamos a la persona
         let userToLogin = await User.findOne({where :{email : req.body.email}})

         console.log("aca va el usuario")
         userToLogin = userToLogin.dataValues
        console.log(userToLogin)

		 if (userToLogin) {
		 	// 2. Comparamos las contraseñas
            const isPasswordCorrect = bcrypt.compareSync(req.body.password , userToLogin.password );
               
		 	if (isPasswordCorrect) {
				// 3. Guardar al usuario logeado en Session
		 		delete userToLogin.password; // Borramos el password del usuario que estamos almacenando en sesion
		 		req.session.userLogged = userToLogin;
                
		 		 if(req.body.reUser) {
		 		 	res.cookie("userEmail", userToLogin.email, { maxAge: (1000 * 60) * 10 });
		 		 }
            
		 		// 4. Finalmente redireccionamos a user/profile
                 return res.redirect("/user/profile");
		 	}else{
                 return res.render("login", {
                     error: true,
                     msg: "Contraseña incorrecta",
                     oldData: req.body
                })
             }
		}
	},

    profile: (req, res) => {
        console.log(req.session.userLogged)
        return res.render('profile', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	}
    
}

module.exports = controller