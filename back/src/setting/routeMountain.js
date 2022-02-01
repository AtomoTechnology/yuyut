const router = require('express').Router();
router.use('/api/v1/roles', require('../routes/rolesRoute'));

module.exports = router;
