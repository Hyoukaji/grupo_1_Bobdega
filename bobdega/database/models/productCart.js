module.exports = (sequelize, DataTypes) => {
	
	const ProductCart = sequelize.define('ProductCart', {
		productId: DataTypes.INTEGER,
        cartId: DataTypes.INTEGER,
		productPrice: DataTypes.DECIMAL(10,2),
		quantity: DataTypes.INTEGER,
	}, {
        tableName: 'productcart',

        timestamps: false,

        });

	return ProductCart;
};