const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../schemas/schemas');

// Register
exports.register = async (req, res) => {
  try {
    const { role, email, username, password1, firstName, lastName, address, gender, age } = req.body;
    const hashedPassword = await bcrypt.hash(password1, 10);
    const newUser = new User({
      role,
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      gender,
      age,
    });
    await newUser.save();
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password1, token } = req.body;
    const user = await User.findOne({ email });
    const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (token) {
      return res.status(200).json({ token: jwtToken, username: user.username, role: user.role, message: 'success' });
    }
    const validPassword = await bcrypt.compare(password1, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'success', token: jwtToken, username: user.username, role: user.role });
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
