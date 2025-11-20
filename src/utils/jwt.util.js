const jwt = require('jsonwebtoken');

class JwtUtil {
    static generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN || '15m',
            issuer: process.env.JWT_ISSUER || 'starter-api',
            audience: process.env.JWT_AUDIENCE || 'starter-client'
        });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_JWT_EXPIRES_IN || '7d',
            issuer: process.env.JWT_ISSUER || 'starter-api',
            audience: process.env.JWT_AUDIENCE || 'starter-client'
        });
    }

    static verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_JWT_SECRET, {
                issuer: process.env.JWT_ISSUER || 'starter-api',
                audience: process.env.JWT_AUDIENCE || 'starter-client'
            });
        } catch (error) {
            return null;
        }
    }

    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET, {
                issuer: process.env.JWT_ISSUER || 'starter-api',
                audience: process.env.JWT_AUDIENCE || 'starter-client'
            });
        } catch (error) {
            return null;
        }
    }

    static decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = JwtUtil;
