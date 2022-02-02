const { Model, DataTypes } = require('sequelize');
const sql = require('./../db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
      validate: {
        isNumeric: true,
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // len: [6, 12],
        notEmpty: { msg: 'La contraseña es obligatoria' },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: 'El email no es valido' },
      },
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La direccion debe contener el numero y timbre del depto.' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: { msg: 'Debe tener solamente numeros [1234567890]' },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 0]],
          msg: 'Solo permite 0 | 1',
        },
      },
    },
  },
  {
    sequelize: sql,
    modelName: 'users',
  }
);

module.exports = User;
