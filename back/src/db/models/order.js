const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    idMenu: {
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
    idComplement: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'complements',
        key: 'id',
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 0]],
          msg: 'Solo permite 0 | 1',
        },
      },
    },
  },
  {
    sequelize: sql,
    modelName: 'orders',
  }
);

module.exports = Order;
