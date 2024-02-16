// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../schemas/schemas');

// Register
exports.register = async (req, res) => {
  try {
    const { email, username, password1 } = req.body;
    const hashedPassword = await bcrypt.hash(password1, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password1 } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password1, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Auto-login
exports.autoLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    res.status(200).json({ message: 'Auto-login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};
