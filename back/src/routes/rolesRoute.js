const router = require('express').Router();
const rolesController = require('./../controllers/rolesController');

router.route('/').get(rolesController.GetAll).post(rolesController.Create);
router
  .route('/:id')
  .get(rolesController.GetById)
  .put(rolesController.UpdateOne)
  .delete(rolesController.DeleteOne);

module.exports = router;
