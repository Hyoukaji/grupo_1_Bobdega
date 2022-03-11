module.exports = (sequelize, DataTypes) => {
	
	const User = sequelize.define('user', {
		firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
		email: DataTypes.STRING,
        password: DataTypes.STRING,
        category: DataTypes.STRING,
		image: DataTypes.STRING,
	} );

	

    User.associate = function (models) {
            
            User.hasMany(models.Cart, {
                as: "cart",
                foreignKey: "userId"
            });
	

};

	return User;
};