'use strict';
const User = require('../models/user.model');

const deleteUser = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ status: 'not found' });
  }
  user.destroy();

  res.status(200).json({
    status: 'success',
  });
};

const updateUser = async (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    username: req.body.username,
  };

  const { username } = req.params;

  const user = await User.update(updatedUser, {
    where: {
      username,
    },
  });

  res.status(200).json({
    data: {
      status: 'succesful',
    },
  });
};

const getUsers = async (req, res, next) => {
  const usersList = await User.findAll({});
  const users = usersList.map((el) => {
    el.password = undefined;
    el.confirmPassword = undefined;
    return el;
  });

  res.status(200).json({
    users,
  });
};

module.exports = {
  deleteUser,
  updateUser,
  getUsers,
};
