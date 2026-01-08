/**
 * Training Module Routes
 * Manages training courses and user progress tracking
 */

const express = require('express');
const router = express.Router();

const db = require('../database/init');
const { authenticate, optionalAuth, requireRole } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * GET /api/training/modules
 * Get all training modules
 */
router.get('/modules', optionalAuth, (req, res) => {
    try {
        const { category, is_required, limit = 50 } = req.query;
        
        let sql = 'SELECT * FROM training_modules WHERE is_active = 1';
        const params = [];
        
        if (category) {
            sql += ' AND category = ?';
            params.push(category);
        }
        if (is_required !== undefined) {
            sql += ' AND is_required = ?';
            params.push(is_required === 'true' ? 1 : 0);
        }
        
        sql += ' ORDER BY is_required DESC, title ASC LIMIT ?';
        params.push(parseInt(limit));
        
        const modules = db.all(sql, params);
        
        res.json({ modules });
        
    } catch (error) {
        logger.error('Fetch modules error:', error);
        res.status(500).json({ error: 'Failed to fetch modules' });
    }
});

/**
 * GET /api/training/modules/:id
 * Get training module by ID
 */
router.get('/modules/:id', optionalAuth, (req, res) => {
    try {
        const module = db.get('SELECT * FROM training_modules WHERE id = ?', [req.params.id]);
        
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }
        
        res.json({ module });
        
    } catch (error) {
        logger.error('Fetch module error:', error);
        res.status(500).json({ error: 'Failed to fetch module' });
    }
});

/**
 * POST /api/training/modules
 * Create training module (admin/manager only)
 */
router.post('/modules', authenticate, requireRole(['admin', 'manager']), (req, res) => {
    try {
        const { title, description, category, duration_minutes, content_url, difficulty, is_required } = req.body;
        
        if (!title || !category) {
            return res.status(400).json({ error: 'Title and category are required' });
        }
        
        const result = db.run(`
            INSERT INTO training_modules (title, description, category, duration_minutes, content_url, difficulty, is_required, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [title, description, category, duration_minutes || 60, content_url, difficulty || 'beginner', is_required ? 1 : 0, req.user.id]);
        
        logger.info('Training module created', { moduleId: result.lastInsertRowid, createdBy: req.user.id });
        
        res.status(201).json({
            message: 'Module created',
            id: result.lastInsertRowid
        });
        
    } catch (error) {
        logger.error('Create module error:', error);
        res.status(500).json({ error: 'Failed to create module' });
    }
});

/**
 * GET /api/training/progress
 * Get current user's training progress
 */
router.get('/progress', authenticate, (req, res) => {
    try {
        const progress = db.all(`
            SELECT tp.*, tm.title, tm.category, tm.duration_minutes
            FROM training_progress tp
            JOIN training_modules tm ON tp.module_id = tm.id
            WHERE tp.user_id = ?
            ORDER BY tp.completed_at DESC NULLS LAST, tp.started_at DESC
        `, [req.user.id]);
        
        res.json({ progress });
        
    } catch (error) {
        logger.error('Fetch progress error:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

/**
 * POST /api/training/modules/:id/start
 * Start a training module
 */
router.post('/modules/:id/start', authenticate, (req, res) => {
    try {
        const module = db.get('SELECT id FROM training_modules WHERE id = ?', [req.params.id]);
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }
        
        // Check if already started
        const existing = db.get(`
            SELECT id, status FROM training_progress 
            WHERE user_id = ? AND module_id = ?
        `, [req.user.id, req.params.id]);
        
        if (existing) {
            if (existing.status === 'completed') {
                return res.json({ message: 'Module already completed' });
            }
            return res.json({ message: 'Module already started' });
        }
        
        // Create progress record
        db.run(`
            INSERT INTO training_progress (user_id, module_id, status, progress, started_at)
            VALUES (?, ?, 'in_progress', 0, datetime('now'))
        `, [req.user.id, req.params.id]);
        
        logger.info('Training started', { userId: req.user.id, moduleId: req.params.id });
        
        res.json({ message: 'Training started' });
        
    } catch (error) {
        logger.error('Start training error:', error);
        res.status(500).json({ error: 'Failed to start training' });
    }
});

/**
 * PATCH /api/training/modules/:id/progress
 * Update progress on a training module
 */
router.patch('/modules/:id/progress', authenticate, (req, res) => {
    try {
        const { progress } = req.body;
        
        if (progress === undefined || progress < 0 || progress > 100) {
            return res.status(400).json({ error: 'Progress must be between 0 and 100' });
        }
        
        const existing = db.get(`
            SELECT id FROM training_progress 
            WHERE user_id = ? AND module_id = ?
        `, [req.user.id, req.params.id]);
        
        if (!existing) {
            return res.status(404).json({ error: 'Progress record not found. Start the module first.' });
        }
        
        db.run(`
            UPDATE training_progress SET
                progress = ?,
                status = CASE WHEN ? >= 100 THEN 'completed' ELSE 'in_progress' END,
                completed_at = CASE WHEN ? >= 100 THEN datetime('now') ELSE completed_at END
            WHERE user_id = ? AND module_id = ?
        `, [progress, progress, progress, req.user.id, req.params.id]);
        
        res.json({ message: 'Progress updated', progress });
        
    } catch (error) {
        logger.error('Update progress error:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

/**
 * POST /api/training/modules/:id/complete
 * Complete a training module
 */
router.post('/modules/:id/complete', authenticate, (req, res) => {
    try {
        const { score } = req.body;
        
        const existing = db.get(`
            SELECT id FROM training_progress 
            WHERE user_id = ? AND module_id = ?
        `, [req.user.id, req.params.id]);
        
        if (existing) {
            db.run(`
                UPDATE training_progress SET
                    status = 'completed',
                    progress = 100,
                    completed_at = datetime('now'),
                    score = ?
                WHERE user_id = ? AND module_id = ?
            `, [score || null, req.user.id, req.params.id]);
        } else {
            db.run(`
                INSERT INTO training_progress (user_id, module_id, status, progress, started_at, completed_at, score)
                VALUES (?, ?, 'completed', 100, datetime('now'), datetime('now'), ?)
            `, [req.user.id, req.params.id, score || null]);
        }
        
        logger.info('Training completed', { userId: req.user.id, moduleId: req.params.id, score });
        
        res.json({ message: 'Training completed!' });
        
    } catch (error) {
        logger.error('Complete training error:', error);
        res.status(500).json({ error: 'Failed to complete training' });
    }
});

/**
 * GET /api/training/stats
 * Get training statistics (admin/manager)
 */
router.get('/stats', authenticate, requireRole(['admin', 'manager']), (req, res) => {
    try {
        const totalModules = db.get('SELECT COUNT(*) as count FROM training_modules WHERE is_active = 1')?.count || 0;
        const totalUsers = db.get('SELECT COUNT(*) as count FROM users WHERE is_active = 1')?.count || 0;
        
        const completions = db.get(`
            SELECT COUNT(*) as count FROM training_progress WHERE status = 'completed'
        `)?.count || 0;
        
        const inProgress = db.get(`
            SELECT COUNT(*) as count FROM training_progress WHERE status = 'in_progress'
        `)?.count || 0;
        
        res.json({
            totalModules,
            totalUsers,
            completions,
            inProgress,
            completionRate: totalUsers > 0 ? Math.round((completions / (totalUsers * totalModules)) * 100) : 0
        });
        
    } catch (error) {
        logger.error('Fetch stats error:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
