const express = require('express');
const router = express.Router();
const { PermissionController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

// All permission routes require authentication
router.get('/permissions',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:read'),
    PermissionController.GetAll
);

router.get('/permissions/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:read'),
    PermissionController.GetById
);

router.post('/permissions',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:create'),
    PermissionController.Create
);

router.post('/permissions/bulk',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:create'),
    PermissionController.BulkCreate
);

router.put('/permissions/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:update'),
    PermissionController.Update
);

router.delete('/permissions/:id',
    AuthMiddleware.authenticate,
    AuthMiddleware.requireAttributes('permission:delete'),
    PermissionController.Delete
);

module.exports = router;
