const router = require('express').Router();
const rolesController = require('./../controllers/rolesController');
const authController = require('./../controllers/authController');

router.route('/').get(rolesController.GetAll);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(rolesController.Create);
router
  .route('/:id')
  .get(rolesController.GetById)
  .put(rolesController.UpdateOne)
  .delete(rolesController.DeleteOne);

module.exports = router;
