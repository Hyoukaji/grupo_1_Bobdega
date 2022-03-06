module.exports = (sequelize, DataTypes) => {
	
	const product = sequelize.define('product', {
		name: DataTypes.STRING,
        typeId: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10,2),
        alcohol: DataTypes.INTEGER,
		description: DataTypes.STRING,
        image: DataTypes.STRING,
	});

	 product.associate = function (models) {
	 	
	 	Product.belongsTo(models.type, {
	 		as: "types",
	 		foreignKey: "typeId"
	 	});

	 	product.belongsToMany(models.cart, {
	 		as: "cart",
	 		through: "productCart",
	 		foreignKey: "productId",
	 		otherKey: "cartId",
	 	});


	 };

	return product;
};