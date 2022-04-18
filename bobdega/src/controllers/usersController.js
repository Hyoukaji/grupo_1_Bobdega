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

		if (resultValidation.errors.length > 0) {  //* condicion si hay  1 error o mas 
		 	return res.render("signin", {
		 		errors: resultValidation.mapped(),
		 		oldData: req.body
		 	});
		 }

        //Encriptar la contraseña
        let password = req.body.password
        let encrypt = bcrypt.hashSync(password,10)
        
            const createUser = await User.create({   //* datos que se suben a la DB con la contraeña encriptada
                firstName: req.body.firstName,     
                lastName: req.body.lastName,
                email: req.body.email,
                password: encrypt,
                category: 'User',
                image: req.file.filename  });

            let user = { 
                firstName: req.body.firstName,       //* informacion que se envia a la pagina del detalle de usuario creado
                lastName: req.body.lastName,
                email: req.body.email,
                password: encrypt,
                category: 'User',
                image: req.file.filename }

            return res.render("signinUserDetail",{user});
        },


        
    userDetail : (req,res)=>{
        let user = {}
        User.findByPk(req.params.id).then((resultado) => {     //busca un usuario y te muestra el detalle de ese usuario
            user = resultado.dataValues 
        })
        return res.render('signinUserDetail', { user });
    },
    login : (req,res)=>{
        return res.render(            // renderiza login
            'login'
        )
        
    },
    loginProcess: async (req, res) => {
         const resultValidation = validationResult(req);

		    if (resultValidation.errors.length > 0) {          //valida formulario de login si hay 1 o mas errores
		 	return res.render("login", { 
		 		errors: resultValidation.mapped(),
		 		oldData: req.body
		 	});
		 }

         // 1. Buscamos a la persona
         let userToLogin = await User.findOne({where :{email : req.body.email}})

         userToLogin = userToLogin.dataValues

		 if (userToLogin) {
		 	// 2. Comparamos las contraseñas
            const isPasswordCorrect = bcrypt.compareSync(req.body.password , userToLogin.password );
               
		 	if (isPasswordCorrect) {
				// 3. Guardar al usuario logeado en Session
		 		delete userToLogin.password; // Borramos el password del usuario que estamos almacenando en sesion
		 		req.session.userLogged = userToLogin;
                
		 		 if(req.body.reUser) {
		 		 	res.cookie("userEmail", userToLogin.email, { maxAge: (1000 * 60) * 1000 }); //cookie tiempo de logueo 
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
        return res.render('profile', {     //renderiza el perfil del usuario que estas logueado
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
		res.clearCookie("userEmail");      //cookie para desloguear al usuario 
		req.session.destroy();
		return res.redirect("/");
	},

    adminCreate: async (req,res) => {
        console.log("entre a adminCreate")  //formulario para crear admin
        let searchEmail = req.body.email
        console.log(req.body)
        console.log(searchEmail)
        // let users = []
        // let userToAdminGo = await User.findAll()


        // for (let i = 0; i < userToAdminGo.length; i++){
        //     users.push(userToAdminGo[i].dataValues)
        //    }
        
        // let userToAdminA = users.filter((oneUser)=>{
        //     return oneUser.email == searchEmail
        // })
        
        // let userToAdmin = userToAdminA[0]
        let userToAdmin = await User.findOne({where :{email : searchEmail}})
        console.log(userToAdmin)
        

        console.log("voy a updatear")
        if (userToAdmin){
            let copy = userToAdmin
            userToAdmin.update({
                category:"Admin",},
                {where: {email:searchEmail}});
            console.log("update completado")
        }else{
            console.log("Debe ser un email registrado") /**esto deberia ser un alert */
            res.redirect("/user/rename")
        }
        

        res.redirect("/")
    },

    rename: (req,res) => {
        res.render("adminCreate")  // renderiza formulario admin create 
    }
    
}

module.exports = controller