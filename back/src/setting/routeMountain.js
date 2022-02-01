const router = require('express').Router();
router.use('/api/v1/roles', require('../routes/rolesRoute'));
router.use('/api/v1/users', require('../routes/usersRoute'));

module.exports = router;
