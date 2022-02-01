const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Role = require('./../db/models/role');
const { Op } = require('sequelize');

exports.GetAll = async (req, res, next) => {
  const roles = await Role.findAll({
    where: req.query,
  });
  console.log(req.query);

  res.status(200).json({
    status: true,
    results: roles.length,
    roles,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const role = await Role.create({ name, description });

  res.json({
    status: true,
    code: 200,
    role,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const role = await Role.destroy({
    where: { id },
  });

  if (!role) return next(new appError(`No existe role con el id : ${id}. `, 400));

  res.status(200).json({
    status: true,
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const role = await Role.update(req.body, {
    where: { id },
  });

  if (!role[0])
    return next(new appError('No se pudo modificar el role y/o los datos no se cambiaron...', 400));

  res.status(200).json({
    status: true,
    role,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const role = await Role.findOne({
    where: { id },
  });

  if (!role) return next(new appError(`No existe role con el id : ${id}. `, 400));

  res.status(200).json({
    status: true,
    role,
  });
});
