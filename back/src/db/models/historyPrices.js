const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Historyprices extends Model {}

Historyprices.init(
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
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prices',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
  },
  {
    sequelize: sql,
    modelName: 'historyprices',
  }
);

module.exports = Historyprices;
