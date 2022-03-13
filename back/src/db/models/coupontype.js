const { Model, DataTypes } = require('sequelize');
const sql = require('../db');

class CouponType extends Model {}

CouponType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede ser vacio' },
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    }
  },
  {
    sequelize: sql,
    modelName: 'coupontypes',
  }
);

module.exports = CouponType;
