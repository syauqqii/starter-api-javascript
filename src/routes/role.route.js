const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

// All role routes require authentication and role:read or higher
router.get('/roles',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:read'),
    RoleController.GetAll
);

router.get('/roles/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:read'),
    RoleController.GetById
);

router.get('/roles/:id/permissions',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:read'),
    RoleController.GetPermissions
);

router.post('/roles',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:create'),
    RoleController.Create
);

router.put('/roles/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:update'),
    RoleController.Update
);

router.delete('/roles/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:delete'),
    RoleController.Delete
);

// Permission assignment
router.post('/roles/assign-permission',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:update'),
    RoleController.AssignPermission
);

router.post('/roles/remove-permission',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('role:update'),
    RoleController.RemovePermission
);

module.exports = router;
