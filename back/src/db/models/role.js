const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class Role extends Model {}

Role.init(
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
        isIn: {
          args: [['user', 'admin', 'employee']],
          msg: 'Este rol no es valido',
        },

        len: [3, 10],
      },
      isEven(value) {
        if (!value) {
          throw new Error('El nombre no puede ser vacio');
        }
      },
    },
    description: DataTypes.STRING,
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize: sql,
    modelName: 'roles',
  }
);

module.exports = Role;
