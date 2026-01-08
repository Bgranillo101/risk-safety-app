/**
 * Authentication Routes
 * Handles user login, registration, logout, and token management
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const db = require('../database/init');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('firstName').trim().notEmpty().withMessage('First name required'),
    body('lastName').trim().notEmpty().withMessage('Last name required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                details: errors.array()
            });
        }
        
        const { email, password, firstName, lastName, department } = req.body;
        
        // Check if email exists
        const existingUser = db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'Email already registered'
            });
        }
        
        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);
        
        // Create user
        const result = db.run(`
            INSERT INTO users (email, password_hash, first_name, last_name, department)
            VALUES (?, ?, ?, ?, ?)
        `, [email, passwordHash, firstName, lastName, department || null]);
        
        // Generate token
        const token = jwt.sign(
            { userId: result.lastInsertRowid },
            process.env.JWT_SECRET || 'dev-secret-change-in-production',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        
        logger.info('New user registered', { userId: result.lastInsertRowid, email });
        
        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: result.lastInsertRowid,
                email,
                firstName,
                lastName,
                role: 'employee'
            }
        });
        
    } catch (error) {
        logger.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

/**
 * POST /api/auth/login
 * User login
 */
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }
        
        const { email, password } = req.body;
        
        // Find user
        const user = db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }
        
        // Check if active
        if (!user.is_active) {
            return res.status(403).json({
                error: 'Account disabled'
            });
        }
        
        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }
        
        // Update last login
        db.run('UPDATE users SET last_login = datetime("now") WHERE id = ?', [user.id]);
        
        // Generate token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'dev-secret-change-in-production',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        
        logger.info('User logged in', { userId: user.id, email });
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
                department: user.department
            }
        });
        
    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

/**
 * POST /api/auth/logout
 * User logout (for token blacklisting if implemented)
 */
router.post('/logout', authenticate, (req, res) => {
    logger.info('User logged out', { userId: req.user.id });
    res.json({ message: 'Logout successful' });
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticate, (req, res) => {
    try {
        const user = db.get(`
            SELECT id, email, first_name, last_name, role, department, phone, 
                   is_active, last_login, created_at
            FROM users WHERE id = ?
        `, [req.user.id]);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
                department: user.department,
                phone: user.phone,
                lastLogin: user.last_login,
                createdAt: user.created_at
            }
        });
        
    } catch (error) {
        logger.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', authenticate, (req, res) => {
    try {
        const token = jwt.sign(
            { userId: req.user.id },
            process.env.JWT_SECRET || 'dev-secret-change-in-production',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        
        res.json({ token });
        
    } catch (error) {
        logger.error('Token refresh error:', error);
        res.status(500).json({ error: 'Token refresh failed' });
    }
});

module.exports = router;
