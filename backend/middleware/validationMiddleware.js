const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const resSend = require('../plugins/resSend');

require('dotenv').config();

module.exports = {
  validEmail: (req, res, next) => {
    const { email } = req.body;
    if (!validator.validate(email)) {
      return resSend(res, false, null, 'Nevalidus pašto adresas.');
    }
    next();
  },

  validPassword: (req, res, next) => {
    const { password1, password2 } = req.body;
    if (password1.length < 4 || password1.length > 20) {
      return resSend(res, false, null, 'Slaptažodžio ilgis neteisingas. Ilgis turi būti tarp 4 ir 20 simbolių.');
    } else if (password1 !== password2) {
      return resSend(res, false, null, 'Slaptažodžiai nesutampa.');
    } else if (!/[A-Z]/.test(password1)) {
      return resSend(res, false, null, 'Slaptažodyje turi būti bent viena didžioji raidė.');
    } else if (!/[0-9]/.test(password1)) {
      return resSend(res, false, null, 'Slaptažodyje turi būti bent vienas skaitmuo.');
    }

    next();
  },
  validToken: (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return resSend(res, false, null, 'Blogas validacijos žetonas.');
      req.user = { email: decoded.email };
      next();
    });
  },
  validBilling: (req, res, next) => {
    const { title, description, items, owner } = req.body;
    if (!title || !description || !Array.isArray(items) || !owner) {
      return resSend(res, false, null, 'Trūksta reikalaujamų laukelių.');
    }
    const isValidItems = items.every((item) => item.title && typeof item.price === 'number');
    if (!isValidItems) {
      return resSend(res, false, null, 'Klaida, neteisinga struktūra.');
    }

    next();
  },
};
