const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Coupon = require('./../db/models/coupon');


exports.GetAll = async (req, res, next) => {
    const coupon = await Coupon.findAll({
      where: req.query,
      order: [['expirationDate', 'ASC']],
      // include: 'users',
      // paranoid: false,
    });
  
    res.status(200).json({
      status: true,
      results: coupon.length,
      coupon,
    });
  };