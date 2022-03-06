module.exports = (sequelize, DataTypes) => {
	
	const type = sequelize.define('type', {
		name: DataTypes.STRING,
	});

	 type.associate = function (models) {
	 	
	 	type.hasMany(models.product, {
	 		as: "products",
	 		foreignKey: "typeId"
	 	});

	 };

	return type;
};