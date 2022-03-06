module.exports = (sequelize, DataTypes) => {
	
	const cart = sequelize.define('cart', {
		userId: DataTypes.INTEGER,
	});

    cart.associate = function (models) {
        
        cart.belongsTo(models.user, {
            as: "users",
            foreignKey: "userId"
        });

        cart.belongsToMany(models.product, {
            as: "products",
            through: "productCart",
            foreignKey: "cartId",
            otherKey: "productId",
        });

	

};

	return cart;
};