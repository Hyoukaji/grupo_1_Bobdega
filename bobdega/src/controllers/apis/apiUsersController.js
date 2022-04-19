//api de usuarios

const { User } = require("../../../database/models");

const usersController = {
    'list': (req, res) => {
        User.findAll()
        .then(allUsers => {
            let users = [];
            allUsers.forEach(data => {
                let user = {
                    id: data.id,
                    name: data.firstName,
                    lastname: data.lastname,
                    email: data.email,
                    detail: `api/users/detail/${data.id}`
                };
                users.push(user);
               
            })
            res.status(200).json( {
                    status:200,
                    count: users.length,
                    url: "api/users",
                    users
            })
        })
    },
    'detail': (req, res) => {
        User.findByPk(req.params.id)
            .then(data => {
                let user = {
                    id: data.id,
                    name: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    image: data.image
                    };
                    
                res.status(200).json( {
                    status:200,
                    url: "api/users/:id",
                    user
                });
            });
    }
}

module.exports = usersController;