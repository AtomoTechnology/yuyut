const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Contact = require('./../db/models/contact');
const { Op } = require('sequelize');

exports.GetAll = async (req, res, next) => {
  const contacts = await Contact.findAll({
    where: req.query,
    order: [['createdAt', 'ASC']],
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    results: contacts.length,
    contacts,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    message: 'Consulta creado con existo',
    contact,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.destroy({
    where: { id },
    // force: true,
  });

  if (!contact) return next(new appError(`No existe contact con el id : ${id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Consulta borrado con existo',
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const contact = await Contact.update(req.body, {
    where: { id },
  });

  if (!contact[0])
    return next(
      new appError(
        'No se pudo modificar el contact y/o los datos no se cambiaron y/o no existe el contact con este id...',
        process.env.FAIL_CODE
      )
    );

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Contacto actualizado con existo',
    contact,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByPk(req.params.id);

  if (!contact) return next(new appError(`No existe contact con el id : ${req.params.id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    contact,
  });
});
