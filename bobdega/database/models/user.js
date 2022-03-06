module.exports = (sequelize, DataTypes) => {
	
	const user = sequelize.define('user', {
		firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
		email: DataTypes.STRING,
        password: DataTypes.STRING,
        category: DataTypes.STRING,
		image: DataTypes.STRING,
	} );

	

    user.associate = function (models) {
            
            user.hasMany(models.cart, {
                as: "cart",
                foreignKey: "userId"
            });
	

};

	return user;
};