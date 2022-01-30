const Role = require('./../db/models/role');

exports.GetAll = async (req, res, next) => {
  const roles = await Role.findAll({
    attributes: ['name', 'id'],
    where: {
      name: 'user',
    },
  });

  // Role.findAll().then((data) =>{
  //   res.json(data)
  // })

  res.status(200).json({
    status: true,
    roles,
  });
};

exports.Create = (req, res, next) => {
  const role = Role.create(req.body);
};
