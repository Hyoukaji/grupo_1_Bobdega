module.exports = (sequelize, DataTypes) => {
	
	const Type = sequelize.define('Type', {
		name: DataTypes.STRING,
	}, {
        tableName: 'types',

        timestamps: false,

        });

	 	Type.associate = function (models) {
	 	
	 	Type.hasMany(models.Product, {
	 		as: "products",
	 		foreignKey: "typeId"
	 	});

	 };

	return Type;
};