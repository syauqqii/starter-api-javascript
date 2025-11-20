const { User, Role, Permission, UserRole } = require('../models');
const { PasswordUtil, JwtUtil } = require('../utils');

class AuthService {
    static async register(username, email, password) {
        // Check if user exists
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        const existingUsername = await User.findOne({
            where: { username }
        });

        if (existingUsername) {
            throw new Error('Username already taken');
        }

        // Hash password
        const hashedPassword = await PasswordUtil.hashPassword(password);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }

    static async login(email, password) {
        // Find user
        const user = await User.findOne({
            where: { email, isActive: true },
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

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isValidPassword = await PasswordUtil.comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Update last login
        await user.update({ lastLogin: new Date() });

        // Generate tokens
        const accessToken = JwtUtil.generateAccessToken({
            userId: user.id,
            username: user.username,
            email: user.email
        });

        const refreshToken = JwtUtil.generateRefreshToken({
            userId: user.id
        });

        // Extract attributes
        const attributes = [];
        const roles = [];
        if (user.roles) {
            user.roles.forEach(role => {
                roles.push(role.name);
                if (role.permissions) {
                    role.permissions.forEach(permission => {
                        if (!attributes.includes(permission.attribute)) {
                            attributes.push(permission.attribute);
                        }
                    });
                }
            });
        }

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles,
                attributes
            },
            accessToken,
            refreshToken
        };
    }

    static async refreshToken(refreshToken) {
        const decoded = JwtUtil.verifyRefreshToken(refreshToken);

        if (!decoded) {
            throw new Error('Invalid or expired refresh token');
        }

        const user = await User.findByPk(decoded.userId);

        if (!user || !user.isActive) {
            throw new Error('User not found or inactive');
        }

        const accessToken = JwtUtil.generateAccessToken({
            userId: user.id,
            username: user.username,
            email: user.email
        });

        const newRefreshToken = JwtUtil.generateRefreshToken({
            userId: user.id
        });

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }

    static async assignRole(userId, roleId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const role = await Role.findByPk(roleId);
        if (!role) {
            throw new Error('Role not found');
        }

        // Check if already assigned
        const existing = await UserRole.findOne({
            where: { userId, roleId }
        });

        if (existing) {
            throw new Error('Role already assigned to user');
        }

        await UserRole.create({ userId, roleId });

        return { message: `Role '${role.name}' assigned to user '${user.username}'` };
    }

    static async removeRole(userId, roleId) {
        const result = await UserRole.destroy({
            where: { userId, roleId }
        });

        if (result === 0) {
            throw new Error('Role assignment not found');
        }

        return { message: 'Role removed from user' };
    }

    static async getUserRoles(userId) {
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                as: 'roles',
                include: [{
                    model: Permission,
                    as: 'permissions'
                }]
            }]
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user.roles;
    }

    static async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'isActive', 'lastLogin', 'createdAt'],
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

        if (!user) {
            throw new Error('User not found');
        }

        const attributes = [];
        const roles = [];
        if (user.roles) {
            user.roles.forEach(role => {
                roles.push(role.name);
                if (role.permissions) {
                    role.permissions.forEach(permission => {
                        if (!attributes.includes(permission.attribute)) {
                            attributes.push(permission.attribute);
                        }
                    });
                }
            });
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            roles,
            attributes
        };
    }
}

module.exports = AuthService;
