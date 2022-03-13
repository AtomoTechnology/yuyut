const { Model, DataTypes } = require('sequelize');
const sql = require('../db');

class CouponUser extends Model {}

CouponUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
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
    couponId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coupons',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
  },
  {
    sequelize: sql,
    modelName: 'couponusers',
  }
);

module.exports = CouponUser;
