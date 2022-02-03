const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Menu extends Model {}

Menu.init(
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
        notEmpty: [true, 'El nombre no puede ser vacio'],
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripcion no puede ser vacio' },
      },
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      allowNull: false,
    },
    idPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prices',
        key: 'id',
      },
    },
  },
  {
    sequelize: sql,
    modelName: 'menus',
  }
);

module.exports = Menu;