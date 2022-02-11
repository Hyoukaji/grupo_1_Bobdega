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

        // const resultValidation = validationResult(req); // validaciones de formulario de signIn

		// if (resultValidation.errors.length > 0) {
		// 	return res.render("signin", {
		// 		errors: resultValidation.mapped(),
		// 		oldData: req.body
		// 	});
		// }


        
		// Calculo el id del nuevo usuario 
		// let newId=lastId+1;
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

        const bodyData = req.body;  
        


		// 1. Buscamos a la persona
		const userToLogin = usersArray.find(oneUser => oneUser.email === req.body.email);

		if (userToLogin) {
			// 2. Comparamos las contraseñas
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password);

			if (isPasswordCorrect) {
				// 3. Guardar al usuario logeado en Session
				delete userToLogin.password; // Borramos el password del usuario que estamos almacenando en sesion
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie("userEmail", userToLogin.email, { maxAge: (1000 * 60) * 10 });
				}
	
				// 4. Finalmente redireccionamos a user/profile
				return res.redirect("/");
			}
		}
	},

    

        

    
        
}

module.exports = controller