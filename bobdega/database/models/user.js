module.exports = (sequelize, DataTypes) => {
	
	const User = sequelize.define('User', {
		firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
		email: DataTypes.STRING,
        password: DataTypes.STRING,
        category: DataTypes.STRING,
		image: DataTypes.STRING,
	}, {
        tableName: 'users',

        timestamps: false,

        } );

	

    User.associate = function (models) {
            
            User.hasMany(models.Cart, {
                as: "cart",
                foreignKey: "userId"
            });
	

};

	return User;
};