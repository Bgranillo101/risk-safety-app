/**
 * Authentication Middleware
 * Handles JWT verification and role-based access control
 */

const jwt = require('jsonwebtoken');
const db = require('../database/init');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

/**
 * Verify JWT token and attach user to request
 */
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No token provided'
            });
        }
        
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Get user from database
        const user = db.get(`
            SELECT id, email, first_name, last_name, role, department, is_active
            FROM users WHERE id = ? AND is_active = 1
        `, [decoded.userId]);
        
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'User not found or inactive'
            });
        }
        
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Token expired'
            });
        }
        
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token'
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            
            const user = db.get(`
                SELECT id, email, first_name, last_name, role, department, is_active
                FROM users WHERE id = ? AND is_active = 1
            `, [decoded.userId]);
            
            if (user) {
                req.user = user;
                req.token = token;
            }
        }
        next();
    } catch (error) {
        // Token invalid, continue without user
        next();
    }
};

/**
 * Require specific roles
 */
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Insufficient permissions'
            });
        }
        
        next();
    };
};

/**
 * Require admin role
 */
const requireAdmin = requireRole(['admin']);

/**
 * Require manager or admin role
 */
const requireManager = requireRole(['admin', 'manager']);

module.exports = {
    authenticate,
    optionalAuth,
    requireRole,
    requireAdmin,
    requireManager
};
