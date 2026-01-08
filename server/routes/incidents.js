/**
 * Incident Management Routes
 * Full CRUD for safety incident reports
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../database/init');
const { authenticate, optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * GET /api/incidents
 * Get all incidents with optional filters
 */
router.get('/', optionalAuth, (req, res) => {
    try {
        const { status, severity, type, limit = 50, offset = 0 } = req.query;
        
        let sql = 'SELECT * FROM incidents WHERE 1=1';
        const params = [];
        
        if (status) {
            sql += ' AND status = ?';
            params.push(status);
        }
        if (severity) {
            sql += ' AND severity = ?';
            params.push(severity);
        }
        if (type) {
            sql += ' AND type = ?';
            params.push(type);
        }
        
        sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        
        const incidents = db.all(sql, params);
        
        // Get total count
        const countSql = 'SELECT COUNT(*) as total FROM incidents';
        const total = db.get(countSql)?.total || 0;
        
        res.json({ incidents, total, limit: parseInt(limit), offset: parseInt(offset) });
        
    } catch (error) {
        logger.error('Fetch incidents error:', error);
        res.status(500).json({ error: 'Failed to fetch incidents' });
    }
});

/**
 * GET /api/incidents/:id
 * Get incident by ID
 */
router.get('/:id', optionalAuth, (req, res) => {
    try {
        const incident = db.get('SELECT * FROM incidents WHERE id = ?', [req.params.id]);
        
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        
        // Get related photos
        const photos = db.all('SELECT * FROM photos WHERE incident_id = ?', [req.params.id]);
        
        res.json({ incident, photos });
        
    } catch (error) {
        logger.error('Fetch incident error:', error);
        res.status(500).json({ error: 'Failed to fetch incident' });
    }
});

/**
 * POST /api/incidents
 * Create new incident
 */
router.post('/', authenticate, [
    body('type').isIn(['injury', 'near-miss', 'property', 'environmental', 'equipment', 'fire', 'chemical', 'other']),
    body('severity').isIn(['low', 'medium', 'high', 'critical']),
    body('title').optional().trim(),
    body('description').optional().trim()
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Validation Error', details: errors.array() });
        }
        
        const { type, severity, title, description, location, witnesses, date } = req.body;
        
        const incidentTitle = title || `${type} Incident - ${location || 'Unknown Location'}`;
        
        const result = db.run(`
            INSERT INTO incidents (title, description, type, severity, location, witnesses, incident_date, reporter_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [incidentTitle, description, type, severity, location, witnesses, date, req.user.id]);
        
        logger.info('Incident created', { incidentId: result.lastInsertRowid, reporterId: req.user.id });
        
        res.status(201).json({
            message: 'Incident reported',
            id: result.lastInsertRowid
        });
        
    } catch (error) {
        logger.error('Create incident error:', error);
        res.status(500).json({ error: 'Failed to create incident' });
    }
});

/**
 * PUT /api/incidents/:id
 * Update incident
 */
router.put('/:id', authenticate, (req, res) => {
    try {
        const incident = db.get('SELECT * FROM incidents WHERE id = ?', [req.params.id]);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        
        const { title, description, status, severity, assigned_to, corrective_actions, resolution_notes } = req.body;
        
        db.run(`
            UPDATE incidents SET
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                status = COALESCE(?, status),
                severity = COALESCE(?, severity),
                assigned_to = COALESCE(?, assigned_to),
                corrective_actions = COALESCE(?, corrective_actions),
                resolution_notes = COALESCE(?, resolution_notes),
                resolved_at = CASE WHEN ? = 'resolved' THEN datetime('now') ELSE resolved_at END,
                updated_at = datetime('now')
            WHERE id = ?
        `, [title, description, status, severity, assigned_to, corrective_actions, resolution_notes, status, req.params.id]);
        
        logger.info('Incident updated', { incidentId: req.params.id, updatedBy: req.user.id });
        
        res.json({ message: 'Incident updated' });
        
    } catch (error) {
        logger.error('Update incident error:', error);
        res.status(500).json({ error: 'Failed to update incident' });
    }
});

/**
 * PATCH /api/incidents/:id/status
 * Update incident status
 */
router.patch('/:id/status', authenticate, [
    body('status').isIn(['reported', 'investigating', 'resolved', 'closed'])
], (req, res) => {
    try {
        const incident = db.get('SELECT * FROM incidents WHERE id = ?', [req.params.id]);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        
        const { status } = req.body;
        
        db.run(`
            UPDATE incidents SET
                status = ?,
                resolved_at = CASE WHEN ? = 'resolved' THEN datetime('now') ELSE resolved_at END,
                updated_at = datetime('now')
            WHERE id = ?
        `, [status, status, req.params.id]);
        
        logger.info('Incident status updated', { incidentId: req.params.id, status, updatedBy: req.user.id });
        
        res.json({ message: 'Status updated', status });
        
    } catch (error) {
        logger.error('Update status error:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

/**
 * DELETE /api/incidents/:id
 * Delete incident (admin only)
 */
router.delete('/:id', authenticate, (req, res) => {
    try {
        if (!['admin', 'manager'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        const incident = db.get('SELECT id FROM incidents WHERE id = ?', [req.params.id]);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        
        db.run('DELETE FROM incidents WHERE id = ?', [req.params.id]);
        
        logger.info('Incident deleted', { incidentId: req.params.id, deletedBy: req.user.id });
        
        res.json({ message: 'Incident deleted' });
        
    } catch (error) {
        logger.error('Delete incident error:', error);
        res.status(500).json({ error: 'Failed to delete incident' });
    }
});

module.exports = router;
