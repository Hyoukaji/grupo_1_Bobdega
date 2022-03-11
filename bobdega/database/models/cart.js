module.exports = (sequelize, DataTypes) => {
	
	const Cart = sequelize.define('Cart', {
		userId: DataTypes.INTEGER,
	}, {
        tableName: 'cart',

        timestamps: false,

        });

    Cart.associate = function (models) {
        
        Cart.belongsTo(models.User, {
             as: "users",
             foreignKey: "userId"
         });

        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "productCart",
            foreignKey: "cartId",
            otherKey: "productId",
        })

    };

	return Cart;
};