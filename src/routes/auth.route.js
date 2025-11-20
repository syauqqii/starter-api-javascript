const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

// Public routes
router.post('/auth/register', AuthController.Register);
router.post('/auth/login', AuthController.Login);
router.post('/auth/refresh-token', AuthController.RefreshToken);

// Protected routes
router.get('/auth/profile', AuthMiddleware.authenticate, AuthController.GetProfile);
router.get('/auth/user-roles/:userId?', AuthMiddleware.authenticate, AuthController.GetUserRoles);

// Admin routes - requires user:manage attribute
router.post('/auth/assign-role',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('user:manage'),
    AuthController.AssignRole
);

router.post('/auth/remove-role',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('user:manage'),
    AuthController.RemoveRole
);

module.exports = router;
