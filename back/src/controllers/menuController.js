const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Menu = require('../db/models/menu');
const Price = require('../db/models/price');
const { Op } = require('sequelize');

exports.GetAll = async (req, res, next) => {
  const menus = await Menu.findAll({
    where: req.query,
    order: [['name', 'ASC']],
    // include: Price,
    // paranoid: false,
  });

  res.status(200).json({
    status: true,
    results: menus.length,
    menus,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  console.log('estoy...');
  const menu = await Menu.create(req.body);

  res.status(201).json({
    status: true,
    menu,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const menu = await Menu.destroy({
    where: { id },
    force: true,
  });

  if (!menu) return next(new appError(`No existe menu con el id : ${id}. `, 400));

  res.status(200).json({
    status: true,
    message: 'Menu borrado con exito.',
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const menu = await Menu.update(req.body, {
    where: { id },
  });

  if (!menu[0]) return next(new appError('No se pudo modificar el menu y/o los datos no se cambiaron...', 400));

  res.status(200).json({
    status: true,
    message: 'menu actualizado con exito',
    menu,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const menu = await Menu.findByPk(req.params.id);

  if (!menu) return next(new appError(`No existe menu con el id : ${req.params.id}. `, 400));

  res.status(200).json({
    status: true,
    menu,
  });
});
