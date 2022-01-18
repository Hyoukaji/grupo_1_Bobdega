const fs = require('fs');
const path = require('path');

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
		// Calculo el id del nuevo usuario 
		// let newId=lastId+1;
        lastId=lastId+1;
        // Inserto el nuevo producto al array de productos existen
        arrayDatos.push({
			id: lastId,
			first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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
        }
}

module.exports = controller