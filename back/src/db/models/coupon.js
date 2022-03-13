const { Model, DataTypes } = require('sequelize');
const sql = require('../db');

class Coupon extends Model {}

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },    
    coupontypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coupontypes',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    nro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    expirationDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false,
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
  },
  {
    sequelize: sql,
    modelName: 'coupons',
  }
);

module.exports = Coupon;
