/**
 * User Management Routes
 * CRUD operations for user administration
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const db = require('../database/init');
const { authenticate, requireRole } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * GET /api/users
 * Get all users (admin/manager only)
 */
router.get('/', authenticate, requireRole(['admin', 'manager']), (req, res) => {
    try {
        const users = db.all(`
            SELECT id, email, first_name, last_name, role, department, 
                   is_active, last_login, created_at
            FROM users ORDER BY created_at DESC
        `);
        
        res.json({ users });
        
    } catch (error) {
        logger.error('Fetch users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * GET /api/users/:id
 * Get user by ID
 */
router.get('/:id', authenticate, (req, res) => {
    try {
        const user = db.get(`
            SELECT id, email, first_name, last_name, role, department, 
                   phone, is_active, last_login, created_at
            FROM users WHERE id = ?
        `, [req.params.id]);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user });
        
    } catch (error) {
        logger.error('Fetch user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

/**
 * POST /api/users
 * Create new user (admin only)
 */
router.post('/', authenticate, requireRole(['admin']), [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('role').isIn(['admin', 'manager', 'supervisor', 'employee'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Validation Error', details: errors.array() });
        }
        
        const { email, password, firstName, lastName, role, department } = req.body;
        
        // Check if exists
        const existing = db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        
        const passwordHash = await bcrypt.hash(password, 12);
        
        const result = db.run(`
            INSERT INTO users (email, password_hash, first_name, last_name, role, department)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [email, passwordHash, firstName, lastName, role, department || null]);
        
        logger.info('User created', { createdBy: req.user.id, newUserId: result.lastInsertRowid });
        
        res.status(201).json({
            message: 'User created',
            user: { id: result.lastInsertRowid, email, firstName, lastName, role }
        });
        
    } catch (error) {
        logger.error('Create user error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

/**
 * PUT /api/users/:id
 * Update user
 */
router.put('/:id', authenticate, [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('role').optional().isIn(['admin', 'manager', 'supervisor', 'employee'])
], (req, res) => {
    try {
        // Users can only update themselves, admins can update anyone
        if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        const user = db.get('SELECT id FROM users WHERE id = ?', [req.params.id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const { firstName, lastName, department, phone, role } = req.body;
        
        db.run(`
            UPDATE users SET
                first_name = COALESCE(?, first_name),
                last_name = COALESCE(?, last_name),
                department = COALESCE(?, department),
                phone = COALESCE(?, phone),
                role = COALESCE(?, role),
                updated_at = datetime('now')
            WHERE id = ?
        `, [firstName, lastName, department, phone, role, req.params.id]);
        
        res.json({ message: 'User updated' });
        
    } catch (error) {
        logger.error('Update user error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

/**
 * DELETE /api/users/:id
 * Deactivate user (admin only)
 */
router.delete('/:id', authenticate, requireRole(['admin']), (req, res) => {
    try {
        if (req.user.id === parseInt(req.params.id)) {
            return res.status(400).json({ error: 'Cannot delete yourself' });
        }
        
        const user = db.get('SELECT id FROM users WHERE id = ?', [req.params.id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        db.run('UPDATE users SET is_active = 0, updated_at = datetime("now") WHERE id = ?', [req.params.id]);
        
        logger.info('User deactivated', { adminId: req.user.id, userId: req.params.id });
        
        res.json({ message: 'User deactivated' });
        
    } catch (error) {
        logger.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
