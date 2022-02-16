const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Role = require('./../db/models/role');

exports.GetAll = async (req, res, next) => {
  const roles = await Role.findAll({
    where: req.query,
    order: [['name', 'ASC']],
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    results: roles.length,
    roles,
  });
};

exports.Create = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { name, description } = req.body;
  const role = await Role.create({ name, description });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Rol creado con existo',
    role,
  });
});

exports.DeleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const role = await Role.destroy({
    where: { id },
  });

  if (!role) return next(new appError(`No existe role con el id : ${id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Rol borrado con existo',
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const role = await Role.update(req.body, {
    where: { id },
  });

  if (!role[0])
    return next(
      new appError(
        'No se pudo modificar el role y/o los datos no se cambiaron y/o no existe el role con este id...',
        process.env.FAIL_CODE
      )
    );

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'Rol actualizado con existo',
    role,
  });
});

exports.GetById = catchAsync(async (req, res, next) => {
  const role = await Role.findByPk(req.params.id);

  if (!role) return next(new appError(`No existe role con el id : ${req.params.id}. `, process.env.FAIL_CODE));

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    role,
  });
});
