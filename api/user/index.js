const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tokenAuth = require('../../middleware/tokenAuth');
const UserModel = require('../../models/User');

const router = express.Router();

router.get('/', tokenAuth, (req, res) => {
  res.send({ ...req.user });
});

router.post('/', async (req, res) => {
  const {
    username, password, confirmPassword, email,
  } = req.body;
  try {
    const validate = ![username, password, confirmPassword, email].filter((e) => !e).length;
    const users = await UserModel.find({ username });
    if (users.length) {
      res.status(400).send({ error: `Username ${username} already exists` });
    } else if (password !== confirmPassword) {
      res.status(400).send({ error: 'Passwords Do Not Match' });
    } else if (validate) {
      const hash = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username, password: hash, email,
      });
      await user.save();
      res.status(200).send(user);
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put('/', tokenAuth, async (req, res) => {
  const {
    username, password, newPassword, confirmPassword, email, spotify,
  } = req.body;
  const validate = ![username, password, newPassword, confirmPassword, email, spotify].filter((e) => !e).length;

  if (validate);

  res.send({ connection: true });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const validate = ![username, password].filter((e) => !e).length;

  if (validate) {
    try {
      const user = await UserModel.findOne({ username });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(user.toJSON(), 'secret');
          const properties = { httpOnly: true };
          res.cookie('token', token, properties);
          res.status(200).send({
            user,
            authenticated: true,
          });
        } else {
          res.status(401).send({ error: 'Username or Password Incorrect' });
        }
      } else {
        res.status(401).send({ error: 'Username or Password Incorrect' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
});

router.post('/logout', tokenAuth, (req, res) => {
  res.clearCookie('token');
  res.send({ logout: true });
});

router.delete('/', tokenAuth, async (req, res) => {
  const { id } = req.body;
  if (id === req.user._id) {
    try {
      await UserModel.findOneAndDelete({ _id: req.user._id });
      res.send({ delete: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    res.status(401).send({ error: 'User Not Authorized' });
  }
});

module.exports = router;
