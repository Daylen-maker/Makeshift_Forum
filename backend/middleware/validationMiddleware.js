const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const Filter = require('bad-words');
const filter = new Filter();

module.exports = {
  validPassword: (req, res, next) => {
    const { password1, password2 } = req.body;
    if (password1.length < 4 || password1.length > 20) {
      return res.status(400).json({ message: 'Password length must be 4-20' });
    } else if (password1 !== password2) {
      return res.status(400).json({ message: 'Passwords must match.' });
    } else if (!/[A-Z]/.test(password1)) {
      return res.status(400).json({ message: 'Password must contain 1 uppercase letter.' });
    } else if (!/[0-9]/.test(password1)) {
      return res.status(400).json({ message: 'Password must contain 1 digit.' });
    }
    next();
  },
  validToken: (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) return res.status(400).json({ message: 'Invalid token.' });
      req.user = { email: decoded.email };
      next();
    });
  },
  validEmail: (req, res, next) => {
    const { email } = req.body;
    if (!validator.validate(email)) {
      return res.status(400).json({ message: 'Invalid Email.' });
    }
    next();
  },
  noInappropriateWords: (req, res, next) => {
    const { username, message, content, header } = req.body;
    if (filter.isProfane(username)) {
      return res.status(400).json({ message: 'Inappropriate username.' });
    }
    next();
  },
  validAge: (req, res, next) => {
    const { age } = req.body;
    if (age > 40) {
      return res.status(400).json({ message: 'To Old' });
    }
    next();
  },
};
