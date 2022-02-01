const router = require('express').Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.route('/signup').post(authController.signUp);
router.route('/').get(userController.GetAll);

module.exports = router;
