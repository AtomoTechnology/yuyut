const Role = require('../db/models/role');
const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('./../db/models/user');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

//without saving it to the buffer

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

//save the photo to memory(buffer)
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('It nt a image please upload only image.', 400), false);
//   }
// };

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();
//   req.file.filename = ` user-${req.user._id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);
//   next();
// });

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadUserPhoto = upload.single('photo');

exports.GetAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: {
      attributes: ['name', 'id'],
      model: Role,
      where: { state: 1 },
      // as: 'role_users',
    },
  });

  res.status(200).json({
    status: true,
    results: users.length,
    users,
  });
});

// exports.StatsUsers = catchAsync(async (req, res, next) => {
//   const [resp] = await User.sequelize
//     .query(`select count(usr.id) QuantUsers , max(idRole) , min(idRole)
//                             from users usr
//                             inner join roles rol
//                             on rol.id = usr.idRole
//                             group by usr.state`);

//   console.log(resp);
//   res.json({
//     ok: true,
//   });
// });

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  const role = await user.getRole();
  console.log(user.toJSON(), role.toJSON());
  user.toJSON().role = role.toJSON().name;

  res.status(200).json({
    status: true,
    results: user.length,
    data: user,
  });
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.update(req.body, {
    where: { id },
  });

  // if (!user[0])
  //   return next(
  //     new appError(
  //       'No se pudo modificar el usuario',
  //       process.env.FAIL_CODE
  //     )
  //   );

  res.status(process.env.SUCCESS_CODE).json({
    status: true,
    msg: 'El usuario fue actualizado con existo',
    user,
  });
});

// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);

// exports.GetMe = (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// };

// exports.updateMe = catchAsync(async (req, res, next) => {
//   //create error for updating the passoword
//   console.log(req.file);
//   console.log(req.body);
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(new AppError('This route is not for password update. Please use /updateMyPassword', 400));
//   }

//   //update
//   const filterBody = filterObj(req.body, 'name', 'email');
//   if (req.file) filterBody.photo = req.file.filename;
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
