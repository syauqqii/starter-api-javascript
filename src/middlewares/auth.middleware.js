const { ResponseUtil } = require('../utils');
const JwtUtil = require('../utils/jwt.util');
const { User, Role, Permission } = require('../models');

class AuthMiddleware {
    /**
     * Verify JWT token and attach user to request
     */
    static async authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json(ResponseUtil.Unauthorized('Access token is required'));
            }

            const token = authHeader.split(' ')[1];
            const decoded = JwtUtil.verifyAccessToken(token);

            if (!decoded) {
                return res.status(401).json(ResponseUtil.TokenInvalid('Invalid or expired token'));
            }

            // Fetch user with roles and permissions
            const user = await User.findByPk(decoded.userId, {
                include: [{
                    model: Role,
                    as: 'roles',
                    where: { isActive: true },
                    required: false,
                    include: [{
                        model: Permission,
                        as: 'permissions'
                    }]
                }]
            });

            if (!user || !user.isActive) {
                return res.status(401).json(ResponseUtil.Unauthorized('User not found or inactive'));
            }

            // Extract all permissions/attributes for the user
            const attributes = new Set();
            if (user.roles) {
                user.roles.forEach(role => {
                    if (role.permissions) {
                        role.permissions.forEach(permission => {
                            attributes.add(permission.attribute);
                        });
                    }
                });
            }

            req.user = user;
            req.userAttributes = Array.from(attributes);
            req.userRoles = user.roles ? user.roles.map(r => r.name) : [];

            next();
        } catch (error) {
            console.error('Authentication error:', error.message);
            return res.status(500).json(ResponseUtil.InternalServerError('Authentication failed'));
        }
    }

    /**
     * ABAC: Check if user has required attributes
     * @param  {...string} requiredAttributes - Required attributes (e.g., 'user:create', 'post:delete')
     */
    static requireAttributes(...requiredAttributes) {
        return (req, res, next) => {
            if (!req.user || !req.userAttributes) {
                return res.status(401).json(ResponseUtil.Unauthorized('Authentication required'));
            }

            const hasAllAttributes = requiredAttributes.every(attr =>
                req.userAttributes.includes(attr)
            );

            if (!hasAllAttributes) {
                return res.status(403).json(ResponseUtil.Forbidden(
                    `Missing required permissions: ${requiredAttributes.filter(attr =>
                        !req.userAttributes.includes(attr)
                    ).join(', ')}`
                ));
            }

            next();
        };
    }

    /**
     * ABAC: Check if user has any of the specified attributes
     * @param  {...string} attributes - At least one required attribute
     */
    static requireAnyAttribute(...attributes) {
        return (req, res, next) => {
            if (!req.user || !req.userAttributes) {
                return res.status(401).json(ResponseUtil.Unauthorized('Authentication required'));
            }

            const hasAnyAttribute = attributes.some(attr =>
                req.userAttributes.includes(attr)
            );

            if (!hasAnyAttribute) {
                return res.status(403).json(ResponseUtil.Forbidden(
                    `Requires at least one of: ${attributes.join(', ')}`
                ));
            }

            next();
        };
    }

    /**
     * Check if user has specific role
     * @param  {...string} roles - Required roles
     */
    static requireRoles(...roles) {
        return (req, res, next) => {
            if (!req.user || !req.userRoles) {
                return res.status(401).json(ResponseUtil.Unauthorized('Authentication required'));
            }

            const hasRole = roles.some(role => req.userRoles.includes(role));

            if (!hasRole) {
                return res.status(403).json(ResponseUtil.Forbidden(
                    `Requires one of these roles: ${roles.join(', ')}`
                ));
            }

            next();
        };
    }

    /**
     * Optional authentication - doesn't fail if no token provided
     */
    static async optionalAuth(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return next();
            }

            const token = authHeader.split(' ')[1];
            const decoded = JwtUtil.verifyAccessToken(token);

            if (decoded) {
                const user = await User.findByPk(decoded.userId, {
                    include: [{
                        model: Role,
                        as: 'roles',
                        where: { isActive: true },
                        required: false,
                        include: [{
                            model: Permission,
                            as: 'permissions'
                        }]
                    }]
                });

                if (user && user.isActive) {
                    const attributes = new Set();
                    if (user.roles) {
                        user.roles.forEach(role => {
                            if (role.permissions) {
                                role.permissions.forEach(permission => {
                                    attributes.add(permission.attribute);
                                });
                            }
                        });
                    }

                    req.user = user;
                    req.userAttributes = Array.from(attributes);
                    req.userRoles = user.roles ? user.roles.map(r => r.name) : [];
                }
            }

            next();
        } catch (error) {
            next();
        }
    }
}

module.exports = AuthMiddleware;
