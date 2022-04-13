//api de usuarios

const db = require('../../../database/models');
const sequelize = db.sequelize;

const usersController = {
    'list': (req, res) => {
        db.User.findAll()
        .then(allUsers => {
            let users = [];
            allUsers.forEach(data => {
                let user = {
                    id: data.id,
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    detail: `/users/profile/${data.id}`
                };
                users.push(user);
            })
            res.status(200).json( {
                meta: {
                    status:200,
                    count: users.length,
                    url: "api/users"
                },
                users
            })
        })
    },
    'detail': (req, res) => {
        db.User.findByPk(req.params.id, {
            include: ['Image']
        })
            .then(data => {
                let user = {
                    id: data.id,
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    image: `/img/user_photo/${data.Image[0].avatar}`//hay que ver como traer la imagen o sino descartarlo 
                };
                res.status(200).json( {
                    meta: {
                        status:200,
                        url: "api/users/:id"
                    },
                    user
                });
            });
    }
}

module.exports = usersController;