const router = require('express').Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.route('/').get(orderController.GetAll).post(orderController.Create);
router.route('/:id').get(orderController.GetById).put(orderController.UpdateOne).delete(orderController.DeleteOne);
router.post('/:id/updatestatus', orderController.AddStatus);
router.post('/:id/addmenu', orderController.AddMenu);

module.exports = router;
