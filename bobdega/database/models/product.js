module.exports = (sequelize, DataTypes) => {
	
	const Product = sequelize.define('Product', {
		name: DataTypes.STRING,
        typeId: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10,2),
        alcohol: DataTypes.INTEGER,
		description: DataTypes.STRING,
        image: DataTypes.STRING,
	});

	 Product.associate = function (models) {
	 	
	 	Product.belongsTo(models.Type, {
	 		as: "types",
	 		foreignKey: "typeId"
	 	});

	 	Product.belongsToMany(models.Cart, {
	 		as: "cart",
	 		through: "productCart",
	 		foreignKey: "productId",
	 		otherKey: "cartId",
	 	});


	 };

	return Product;
};