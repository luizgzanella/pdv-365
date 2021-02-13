'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET);

const signup = async (req, res) => {
  const { username, name, password } = req.body;

  try {
    await User.create({
      name,
      username,
      password,
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(422).json(error);
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res
      .status(422)
      .json({ error: 'Por favor forneça uma senha, um usuario.' });
  }

  const user = await User.findOne({
    attributes: ['password', 'id'],
    where: { username },
  });

  if (!user || !(await User.validatePassword(password, user.password))) {
    return res.status(401).json({});
  }

  const token = createToken(user.id);

  res.status(200).json({ status: 'success', token });
};

module.exports = {
  signup,
  signin,
};
