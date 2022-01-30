const router = require('express').Router();

const rolesController = require('./../controllers/rolesController');
router.route('/').get(rolesController.GetAll);

module.exports = router;
