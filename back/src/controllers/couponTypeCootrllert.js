const CouponType = require('../db/models/coupontype');
const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Coupon = require('./../db/models/coupon');


exports.GetAll = async (req, res, next) => {
    const coupontype = await CouponType.findAll({
      where: req.query,
      order: [['id', 'ASC']]
    });  
    res.status(200).json({
      status: true,
      results: coupontype.length,
      coupontype,
    });
  };

exports.getById = catchAsync(async (req, res, next) => {
const coupontype = await User.findOne(req.params.id);  
    res.status(200).json({
        status: true,
        results: coupontype.length,
        data: coupontype,
    });
});
  