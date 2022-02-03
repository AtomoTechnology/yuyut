const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Price extends Model {}

Price.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: [true, 'El precio no puede ser vacio'],
      },
    },
    date: {
      type: DataTypes.DATE,
      default: Date.now,
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
    modelName: 'prices',
  }
);

module.exports = Price;
