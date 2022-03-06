module.exports = (sequelize, DataTypes) => {
	
	const productCart = sequelize.define('productCart', {
		productId: DataTypes.INTEGER,
        cartId: DataTypes.INTEGER,
		productPrice: DataTypes.DECIMAL(10,2),
		quantity: DataTypes.INTEGER,
	});

	return productCart;
};