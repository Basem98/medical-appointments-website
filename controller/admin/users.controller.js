const User = require('../../model/user.model');


const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const users = await User.aggregate([
      {
        $project: { password: 0 }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $skip: page * limit
      },
      {
        $limit: limit
      }
    ]);

    if (users.length < 1) {
      const err = new Error('No users found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ data: users });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
}

module.exports = getAllUsers;