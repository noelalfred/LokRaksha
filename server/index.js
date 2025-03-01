const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./Models/Users');
const Admin = require('./Models/Admin');
const Police = require('./Models/Police');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Raksha")
 .then(() => console.log("MongoDB Connected"))
 .catch(err => console.error("MongoDB Connection Error:", err));

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, role, password } = req.body;
  let user;

  if (role === 'Admin') user = await Admin.findOne({ username });
  else if (role === 'Police') user = await Police.findOne({ username });
  else user = await User.findOne({ username });

  if (!user) return res.json("Unauthorised");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json("Unauthorised");

  res.json({ username: user.username, role });
});

// Start Server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
