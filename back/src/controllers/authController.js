const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('../helpers/catchAsync');
const User = require('./../db/models/user');
const Role = require('./../db/models/role');
const jwt = require('jsonwebtoken');
const appError = require('../helpers/appError');
const { encrypt, comparePassword } = require('../helpers/bcript');
// const Email = require('../helpers/email');

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role_users.name,
      idRole: user.role_users.id,
    },
    process.env.SECRET_TOKEN_YUYUT,
    {
      expiresIn: process.env.SECRET_TOKEN_YUYUT_INSPIRE_IN,
    }
  );
};

const createSendToken = async (user, statusCode, res) => {
  const token = createToken(user);

  res.status(statusCode).json({
    status: true,
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  req.body.password = encrypt(req.body.password);

  await User.create(req.body);

  res.status(201).json({
    status: true,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new appError('INgrese su email y/o la contraseña por favor', 400));
  }

  const user = await User.findOne({
    where: { email: email, state: 1 },
    include: {
      model: Role,
      as: 'role_users',
      where: { state: 1 },
    },
  });

  console.log(user.toJSON());

  //validate user and password
  if (!user || !(await comparePassword(password, user.dataValues.password))) {
    return next(new appError('Contraseña y/o email incorrecto', 401));
  }
  //  console.log(user.role_users.dataValues);
  //  return;

  //create token
  const token = createToken(user.toJSON());

  res.status(200).json({
    token: token,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user: null,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //getting token
  console.log(req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  //validate token
  if (!token) {
    return next(new appError('No estás loggeado , por favor inicia session .', 401));
  }

  //vaerify token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN_YUYUT);
  console.log(decoded);

  // return;

  //check if user exist
  const currentUser = await User.findOne({ where: { id: decoded.id, state: 1 } });
  if (!currentUser) {
    return next(new appError('Este usuario ya no existe o se dio de baja', 401));
  }

  //check if user change the password
  // if (currentUser.changePasswordAfter(decoded.iat)) {
  //   return next(new appError('El usuario cambió su contraseña recientemente', 401));
  // }

  // console.log(currentUser);
  //grant the access
  req.user = decoded;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError(
          `No tiene permiso para realizar esta accion con el role :  ${req.user.role} .`,
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get the user and validate it
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('This is no user with this email ..', 404));
  }

  //2) generate the random  token
  const resetToken = user.createPasswordResetToken();

  // we just modify data from the object  we have to save it
  await user.save({ validateBeforeSave: false }); //

  //send email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was a problem sending the email ', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get Uer based on the token
  const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('This is no user for this token. Token invalid or expired ..', 404));
  }

  //validate user and token
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //Log in user again
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user
  const user = await User.findOne({ email: req.user.email }).select('+password');

  //check password
  if (!user || !(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Wrong password', 401));
  }

  //update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //User.findByIdAndUpdate() will not work

  //log in user
  createSendToken(user, 200, res);
});
