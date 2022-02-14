const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Precio = require('../db/models/price');
const { Op } = require('sequelize');

exports.GetAll = async (req, res, next) => {
  const precios = await Precio.findAll({
    where: req.query,
    order: [['price', 'ASC']],
    // include: 'users',
    // paranoid: false,
  });

  res.status(200).json({
    status: true,
    results: precios.length,
    precios,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  const precio = await Precio.create(req.body);

  res.status(201).json({
    status: true,
    precio,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const precio = await Precio.destroy({
    where: { id },
    force: true,
  });

  if (!precio) return next(new appError(`No existe precio con el id : ${id}. `, 400));

  res.status(200).json({
    status: true,
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const precio = await Precio.update(req.body, {
    where: { id },
  });

  if (!precio[0]) return next(new appError('No se pudo modificar el precio y/o los datos no se cambiaron...', 400));

  res.status(200).json({
    status: true,
    precio,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const precio = await Precio.findByPk(req.params.id);

  if (!precio) return next(new appError(`No existe precio con el id : ${req.params.id}. `, 400));

  res.status(200).json({
    status: true,
    precio,
  });
});
