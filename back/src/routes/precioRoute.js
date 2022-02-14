const router = require('express').Router();
const precioController = require('../controllers/precioController');
const authController = require('../controllers/authController');

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(precioController.GetAll).post(precioController.Create);
router.route('/:id').get(precioController.GetById).put(precioController.UpdateOne).delete(precioController.DeleteOne);

module.exports = router;
