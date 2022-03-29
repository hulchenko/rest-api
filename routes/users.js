const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Getting All users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    // 500 error = server side error
    res.status(500).json({ message: err.message });
  }
});

//Getting One
router.get('/:id', getUser, (req, res) => {
  //   res.send(res.user.name);
  res.json(res.user);
});

//Creating ONe
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    lovesDogs: req.body.lovesDogs,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    // 400 error = user side error
    res.status(400).json({ message: err.message });
  }
});

//Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name !== null) {
    res.user.name = req.body.name;
  }

  if (req.body.lovesDogs !== null) {
    res.user.lovesDogs = req.body.lovesDogs;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted the user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get user id middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User is not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
