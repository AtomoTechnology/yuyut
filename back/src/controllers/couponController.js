const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Coupon = require('./../db/models/coupon');
const { generateUUID } = require('../helpers/guid');
const User = require('../db/models/user');


exports.GetAll = async (req, res, next) => {
    const coupon = await Coupon.findAll({
      where: req.query,
      order: [['expirationDate', 'ASC']]
    });
  
    res.status(200).json({
      status: true,
      results: coupon.length,
      coupon,
    });
};
exports.getById = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne(req.params.id);  
    res.status(200).json({
        status: true,
        results: coupon.length,
        data: coupon,
    });
});

// exports.Post = catchAsync(async (req, res, next) => {
//   const coup = "";
//   var listuser = []; 
//   if(req.body.coupontypeid === 1){
//     coup =generateUUID('All'); 
//     listuser = await User.findAll({
//       where: req.query
//     });
//   }
//   else{
//     listuser = await User.findAll({
//       where: req.query,
//       order: [['expirationDate', 'ASC']]
//     });
//   }
 
//   const coupon = await Coupon.create(req.body);

//   res.status(process.env.SUCCESS_CODE).json({
//     status: true,
//     message: 'codigo de promocion fue agregado con exito..',
//   });
// });