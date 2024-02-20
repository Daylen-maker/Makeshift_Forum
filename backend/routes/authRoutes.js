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
router.post('/login', validationMiddleware.validEmail, authController.login);
router.post('/autoLogin', validationMiddleware.validToken, authController.autoLogin);

// Posts
router.post('/posts/add', validationMiddleware.isImage, validationMiddleware.validToken, controller.addPost);
router.post('/posts/patch', validationMiddleware.isImage, validationMiddleware.validToken, controller.patchPost);
router.post('/posts/delete', validationMiddleware.validToken, controller.deletePost);
router.post('/posts/get', controller.getPosts);
router.post('/post/get', controller.getPost);
//  Comments
router.post('/comment/add', validationMiddleware.validToken, controller.addComment);
router.post('/comment/patch', validationMiddleware.validToken, controller.patchComment);
router.post('/comment/delete', validationMiddleware.validToken, controller.deleteComment);
router.post('/comment/get', controller.getComments);
// Community
router.post('/community/add', validationMiddleware.isImage, validationMiddleware.validToken, controller.addCommunity);
router.post('/community/patch', validationMiddleware.isImage, validationMiddleware.validToken, controller.patchCommunity);
router.post('/community/delete', validationMiddleware.validToken, controller.deleteCommunity);
router.post('/community/get', controller.getCommunities);

module.exports = router;
