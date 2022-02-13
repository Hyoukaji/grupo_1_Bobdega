const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult, body } = require("express-validator");
const validationRegister = require('../middlewares/validationSignIn');
const validationSignIn = require('../middlewares/validationSignIn');
const validations = require('../middlewares/validationSignIn');

// Ubicación del archivo JSON
const filePath = path.resolve(__dirname, '../../data/users.json');

// Lectura del archivo JSON y parseado a array 
const usersArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let arrayDatos= usersArray;
let lastId=arrayDatos[arrayDatos.length-1].id;

const controller = {
    
    signin : (req,res)=>{
        return res.render(
            'signin'
        )
        
    },

    
    
    add: (req, res) => {
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
        
		// Calculo el id del nuevo usuario 
        lastId=lastId+1;
        // Inserto el nuevo producto al array de productos existen
        let password = req.body.password
        let encrypt = bcrypt.hashSync(password,10)
        arrayDatos.push({
			id: lastId,
			first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: encrypt,
            category: 'User',
            image: req.file.filename           
        });
        
        console.log("se hizo el push")
        

		// Sobreescribo todo el archivo JSON con el nuevo producto    
		fs.writeFileSync(filePath, JSON.stringify(arrayDatos, null, ' '));
        res.redirect('signinUserDetail/'+ Number(lastId))  
        
        
    },
    userDetail : (req,res)=>{
        const userId = Number(req.params.id);
        let posicion=0;
        for (let i=0;i<arrayDatos.length;i++){
            if(arrayDatos[i].id==userId){
                posicion=i;
            }
        }
        const user = arrayDatos[posicion];
        return res.render('signinUserDetail', { user });
    },
    login : (req,res)=>{
        return res.render(
            'login'
        )
        
    },
    loginProcess: (req, res) => {
         const resultValidation = validationResult(req);

		    if (resultValidation.errors.length > 0) {
		 	return res.render("login", {
		 		errors: resultValidation.mapped(),
		 		oldData: req.body
		 	});
		 }

        
         bodyData = req.body;  
        

        console.log(req.body.email);
		// 1. Buscamos a la persona
		const userToLogin = usersArray.find(user => user.email === req.body.email);
        
        console.log(userToLogin);
		if (userToLogin) {
			// 2. Comparamos las contraseñas

            console.log(req.body.password);
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password);

               
			if (isPasswordCorrect) {
				// 3. Guardar al usuario logeado en Session
				delete userToLogin.password; // Borramos el password del usuario que estamos almacenando en sesion
				req.session.userLogged = userToLogin;
                
				 if(req.body.reUser) {
				 	res.cookie("userEmail", userToLogin.email, { maxAge: (1000 * 60) * 10 });
				 }
            
				// 4. Finalmente redireccionamos a user/profile
                console.log("password ok")
                return res.redirect("/user/profile");
			}else{
                res.render("login", {
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