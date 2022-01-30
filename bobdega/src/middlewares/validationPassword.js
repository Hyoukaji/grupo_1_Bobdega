const bcrypt = require('bcryptjs')

// Ubicación del archivo JSON
const filePath = path.resolve(__dirname, '../../data/users.json');

// Lectura del archivo JSON y parseado a array 
const usersArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function validationPassword (req, res, next) {
    const userToLogin = usersArray.find(oneUser => oneUser.name === req.body.usuario);
    if (userToLogin){
        let check = bcrypt.compareSync(req.body.password, userToLogin.password)
        if (check) {
            next()
        }else{
            res.redirect("login")
        }
    }
    
}

module.exports = validationPassword