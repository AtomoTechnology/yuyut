const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Order = require('../db/models/order');
const User = require('../db/models/user');
const { Op } = require('sequelize');
const StatusOrder = require('../db/models/statusOrder');
const Status = require('../db/models/status');
const OrderDetail = require('../db/models/orderDetail');
const Menu = require('../db/models/menu');

exports.GetAll = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: req.query,
    order: [['createdAt']],
    include: [
      {
        model: Status,
      },
      {
        model: Menu,
      },
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    results: orders.length,
    orders,
  });
});

exports.Create = catchAsync(async (req, res, next) => {

  if(req.body.order === undefined){
    return next( new appError(process.env.FAIL_CODE,'Debe elegir un menu'));
  }
  if(req.body.OrderDetail === undefined){
    return next( new appError(process.env.FAIL_CODE,'Debe elegir un menu agregar'));
  }
  if(req.body.OrderDetail.length === 0){
    return next(  new  appError(process.env.FAIL_CODE,'Debe elegir un menu falta'));
  }
  const order = await Order.create(req.body.order );

  req.body.OrderDetail.forEach(element => {
    element.orderId = order.id;
     OrderDetail.create(element);
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    order,
  });
});
exports.GetById = catchAsync(async (req, res, next) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: Status,
      },
      {
        model: Menu,
      },
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
  });

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    order,
  });
});
exports.UpdateOne = catchAsync(async (req, res, next) => {});
exports.DeleteOne = catchAsync(async (req, res, next) => {});

exports.AddStatus = catchAsync(async (req, res, next) => {
  // const idOrder = req.body.idOrder;
  console.log(req.params);
  const addStatus = await StatusOrder.create(req.body);

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    message: 'Estado actualizado con exito..',
  });
});

exports.AddMenu = catchAsync(async (req, res, next) => {
  // const idOrder = req.body.idOrder;
  console.log(req.params);
  const addStatus = await OrderDetail.create(req.body);

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    message: 'Menu agregado con exito..',
  });
});
