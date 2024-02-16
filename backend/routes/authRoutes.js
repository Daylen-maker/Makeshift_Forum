const express = require('express');
const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');
const router = express.Router();
const controller = require('../controllers/controller');

// Login / Register
router.post(
  '/register',
  validationMiddleware.validPassword,
  validationMiddleware.validEmail,
  validationMiddleware.noInappropriateWords,
  authController.register
);
router.post('/login', validationMiddleware.validPassword, validationMiddleware.validEmail, authController.login);
router.post('/autoLogin', validationMiddleware.validToken, authController.autoLogin);

// Posts
router.post('/posts/add', validationMiddleware.validToken, controller.addPost);
router.post('/posts/patch', validationMiddleware.validToken, controller.patchPost);
router.post('/posts/delete', validationMiddleware.validToken, controller.deletePost);
router.post('/posts/get', validationMiddleware.validToken, controller.getPosts);
//  Comments
router.post('/comment/add', validationMiddleware.validToken, controller.addComment);
router.post('/comment/patch', validationMiddleware.validToken, controller.patchComment);
router.post('/comment/delete', validationMiddleware.validToken, controller.deleteComment);
// Community
router.post('/community/add', validationMiddleware.validToken, controller.addCommunity);
router.post('/community/patch', validationMiddleware.validToken, controller.patchCommunity);
router.post('/community/delete', validationMiddleware.validToken, controller.deleteCommunity);
router.post('/community/get', validationMiddleware.validToken, controller.getCommunities);

module.exports = router;
