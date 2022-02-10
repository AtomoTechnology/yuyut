const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Status extends Model {}

Status.init(
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
        isAlpha: true,
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
    modelName: 'status',
  }
);

module.exports = Status;
