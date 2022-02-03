const Role = require('./models/role');
const Complement = require('./models/complement');
const User = require('./models/user');
const Price = require('./models/price');
const Menu = require('./models/menu');
const Order = require('./models/order');
const Status = require('./models/status');
const StatusOrder = require('./models/statusOrder');
const Contact = require('./models/contact');
const Historyprices = require('./models/historyPrices');

Role.hasOne(User, { as: 'users_roles', foreignKey: 'idRole' });
User.belongsTo(Role, { as: 'role_users', foreignKey: 'idRole' });
// User.(Role, { as: 'role_users', foreignKey: 'idRole' });
