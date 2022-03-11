module.exports = (sequelize, DataTypes) => {
	
	const Type = sequelize.define('Type', {
		name: DataTypes.STRING,
	});

	 	Type.associate = function (models) {
	 	
	 	Type.hasMany(models.product, {
	 		as: "products",
	 		foreignKey: "typeId"
	 	});

	 };

	return Type;
};