const { Model, DataTypes } = require('sequelize');
const sql = require('../db');

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede ser vacio' },
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
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'El mensaje es obligatorio' },
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: { msg: 'Debe tener solamente numeros [1234567890]' },
      },
    },
  },
  {
    sequelize: sql,
    modelName: 'contacts',
  }
);

module.exports = Contact;
