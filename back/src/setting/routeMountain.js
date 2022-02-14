const router = require('express').Router();
router.use('/api/v1/roles', require('../routes/rolesRoute'));
router.use('/api/v1/users', require('../routes/usersRoute'));
router.use('/api/v1/status', require('../routes/statusRoute'));
router.use('/api/v1/menus', require('../routes/menusRoute'));
router.use('/api/v1/precios', require('../routes/precioRoute'));
router.use('/api/v1/orders', require('../routes/orderRoute'));
router.use('/api/v1/contacts', require('../routes/contactRoute'));

module.exports = router;
