const AuthService = require('../services/auth.service');
const AuthDto = require('../dtos/auth.dto');
const { ResponseUtil } = require('../utils');

class AuthController {
    static async Register(req, res) {
        try {
            const { username, email, password } = AuthDto.register(req.body);
            const result = await AuthService.register(username, email, password);
            return res.status(201).json(ResponseUtil.Created(result, 'User registered successfully'));
        } catch (error) {
            if (error.message.includes('already')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async Login(req, res) {
        try {
            const { email, password } = AuthDto.login(req.body);
            const result = await AuthService.login(email, password);
            return res.status(200).json(ResponseUtil.Ok(result, 'Login successful'));
        } catch (error) {
            return res.status(401).json(ResponseUtil.Unauthorized(error.message));
        }
    }

    static async RefreshToken(req, res) {
        try {
            const { refreshToken } = AuthDto.refreshToken(req.body);
            const result = await AuthService.refreshToken(refreshToken);
            return res.status(200).json(ResponseUtil.Ok(result, 'Token refreshed successfully'));
        } catch (error) {
            return res.status(401).json(ResponseUtil.TokenInvalid(error.message));
        }
    }

    static async AssignRole(req, res) {
        try {
            const { userId, roleId } = AuthDto.assignRole(req.body);
            const result = await AuthService.assignRole(userId, roleId);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json(ResponseUtil.NotFound(error.message));
            }
            if (error.message.includes('already')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async RemoveRole(req, res) {
        try {
            const { userId, roleId } = AuthDto.removeRole(req.body);
            const result = await AuthService.removeRole(userId, roleId);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async GetProfile(req, res) {
        try {
            const result = await AuthService.getProfile(req.user.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async GetUserRoles(req, res) {
        try {
            const userId = req.params.userId || req.user.id;
            const result = await AuthService.getUserRoles(userId);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }
}

module.exports = AuthController;
