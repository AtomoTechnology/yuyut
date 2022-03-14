const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: { msg: 'Debe ser un numero entero' },
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,     
    },
  },
  {
    sequelize: sql,
    modelName: 'order_details',
  }
);

module.exports = OrderDetail;
