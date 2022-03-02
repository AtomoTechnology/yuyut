const router = require('express').Router();
const contactController = require('../controllers/contactController');
const ctrl = require('../controllers/couponController');
const authctrl = require('../controllers/authController');

router.use(authctrl.protect);
router.route('/').get(ctrl.GetAll);

module.exports = router;