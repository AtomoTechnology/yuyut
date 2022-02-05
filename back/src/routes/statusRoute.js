const router = require('express').Router();
const statusController = require('../controllers/statusController');
const authController = require('../controllers/authController');

router.route('/').get(statusController.GetAll);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(statusController.Create);
router
  .route('/:id')
  .get(statusController.GetById)
  .put(statusController.UpdateOne)
  .delete(statusController.DeleteOne);

module.exports = router;
