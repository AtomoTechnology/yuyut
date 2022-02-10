const router = require('express').Router();
const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');

// router.use(authController.protect, authController.restrictTo('admin'));
router.route('/').get(menuController.GetAll).post(menuController.Create);
router
  .route('/:id')
  .get(menuController.GetById)
  .put(menuController.UpdateOne)
  .delete(menuController.DeleteOne);

module.exports = router;
