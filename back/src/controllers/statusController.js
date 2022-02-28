const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Status = require('../db/models/status');

exports.GetAll = async (req, res, next) => {
  const statuses = await Status.findAll({
    where: req.query,
    order: [['name', 'ASC']],
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    results: statuses.length,
    statuses,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const stat = await Status.create({ name });
  res.json({
    status: true,
    msg: 'Estado creado con existo',
    stat,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const stat = await Status.destroy({
    where: { id },
  });

  if (!stat) return next(new appError(`No existe Status con el id : ${id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    message: 'Estado borrado con existo',
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const stat = await Status.update(req.body, {
    where: { id },
  });

  if (!stat[0])
    return next(new appError('No se pudo modificar el Status y/o los datos no se cambiaron...', process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Estado actualizado con existo',

    stat,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const stat = await Status.findByPk(req.params.id);

  if (!stat) return next(new appError(`No existe Status con el id : ${req.params.id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    stat,
  });
});
