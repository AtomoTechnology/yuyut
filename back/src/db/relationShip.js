const Complement = require('./models/complement');
const Role = require('./models/role');
const User = require('./models/user');

Role.hasMany(User, { as: 'users_roles', foreignKey: 'idRole' });
User.belongsTo(Role, { as: 'role_users', foreignKey: 'idRole' });
