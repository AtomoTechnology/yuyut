const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class StatusOrder extends Model {}

StatusOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    idOrder: {
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
    idStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statuses',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
  },
  {
    sequelize: sql,
    modelName: 'status_orders',
  }
);

module.exports = StatusOrder;
