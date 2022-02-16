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
        // isIn: {
        //   args: [['user', 'admin', 'employee', 'responsable']],
        //   msg: 'Este rol no es valido',
        // },
        len: [3, 15],
      },
    },
    description: DataTypes.STRING,
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      // get() {
      //   return this.getDataValue('state') === 1 ? 'active' : 'inactive';
      // },
    },
  },
  {
    sequelize: sql,
    modelName: 'roles',
    paranoid: true,
  }
);

module.exports = Role;
