const Role = require('./models/role');
const User = require('./models/user');
const Price = require('./models/price');
const Menu = require('./models/menu');
const Order = require('./models/order');
const Status = require('./models/status');
const StatusOrder = require('./models/statusOrder');
const Coupon = require('./models/coupon');
const Historyprices = require('./models/historyPrices');
const OrderDetail = require('./models/orderDetail');
const CouponType = require('./models/coupontype');
const CouponUser = require('./models/couponuser');

Role.hasMany(User);
User.belongsTo(Role);

Status.belongsToMany(Order, { through: StatusOrder });
Order.belongsToMany(Status, { through: StatusOrder });

// Price.hasMany(Menu);
// Menu.belongsTo(Price);

Menu.belongsToMany(User, { through: Historyprices });
User.belongsToMany(Menu, { through: Historyprices });

Order.belongsToMany(Menu, { through: OrderDetail });
Menu.belongsToMany(Order, { through: OrderDetail });

User.hasMany(Order);
Order.belongsTo(User);

User.belongsToMany(Coupon, { through: CouponUser });
Coupon.belongsToMany(User, { through: CouponUser });

CouponType.hasMany(Coupon);
Coupon.belongsTo(CouponType);
