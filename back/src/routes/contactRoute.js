const router = require('express').Router();
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

router.route('/').get(contactController.GetAll);
router.route('/').post(contactController.Create);
router
  .route('/:id')
  .get(contactController.GetById)
  .put(contactController.UpdateOne)
  .delete(contactController.DeleteOne);

module.exports = router;
