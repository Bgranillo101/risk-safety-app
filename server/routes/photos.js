/**
 * Photo Upload Routes
 * Handles jobsite photo upload, retrieval, and management
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const db = require('../database/init');
const { authenticate, optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/photos');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/**
 * GET /api/photos
 * Get all photos with optional filters
 */
router.get('/', optionalAuth, (req, res) => {
    try {
        const { phase, incident_id, limit = 50, offset = 0 } = req.query;
        
        let sql = 'SELECT * FROM photos WHERE 1=1';
        const params = [];
        
        if (phase) {
            sql += ' AND phase = ?';
            params.push(phase);
        }
        if (incident_id) {
            sql += ' AND incident_id = ?';
            params.push(incident_id);
        }
        
        sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        
        const photos = db.all(sql, params);
        
        res.json({ photos });
        
    } catch (error) {
        logger.error('Fetch photos error:', error);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
});

/**
 * GET /api/photos/:id
 * Get photo by ID
 */
router.get('/:id', (req, res) => {
    try {
        const photo = db.get('SELECT * FROM photos WHERE id = ?', [req.params.id]);
        
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        
        res.json({ photo });
        
    } catch (error) {
        logger.error('Fetch photo error:', error);
        res.status(500).json({ error: 'Failed to fetch photo' });
    }
});

/**
 * GET /api/photos/:id/image
 * Serve actual photo file
 */
router.get('/:id/image', (req, res) => {
    try {
        const photo = db.get('SELECT * FROM photos WHERE id = ?', [req.params.id]);
        
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        
        const filePath = path.join(__dirname, '../../uploads/photos', photo.filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        res.sendFile(filePath);
        
    } catch (error) {
        logger.error('Serve photo error:', error);
        res.status(500).json({ error: 'Failed to serve photo' });
    }
});

/**
 * POST /api/photos
 * Upload new photo
 */
router.post('/', authenticate, upload.single('photo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { phase, description, location, incident_id } = req.body;
        
        const result = db.run(`
            INSERT INTO photos (filename, original_name, mime_type, file_size, phase, description, location, incident_id, uploaded_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            req.file.filename,
            req.file.originalname,
            req.file.mimetype,
            req.file.size,
            phase || 'pre',
            description,
            location,
            incident_id || null,
            req.user.id
        ]);
        
        logger.info('Photo uploaded', { photoId: result.lastInsertRowid, uploadedBy: req.user.id });
        
        res.status(201).json({
            message: 'Photo uploaded',
            id: result.lastInsertRowid,
            filename: req.file.filename
        });
        
    } catch (error) {
        logger.error('Upload photo error:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

/**
 * DELETE /api/photos/:id
 * Delete photo
 */
router.delete('/:id', authenticate, (req, res) => {
    try {
        const photo = db.get('SELECT * FROM photos WHERE id = ?', [req.params.id]);
        
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        
        // Check permissions (owner or admin)
        if (photo.uploaded_by !== req.user.id && !['admin', 'manager'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        // Delete file
        const filePath = path.join(__dirname, '../../uploads/photos', photo.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // Delete record
        db.run('DELETE FROM photos WHERE id = ?', [req.params.id]);
        
        logger.info('Photo deleted', { photoId: req.params.id, deletedBy: req.user.id });
        
        res.json({ message: 'Photo deleted' });
        
    } catch (error) {
        logger.error('Delete photo error:', error);
        res.status(500).json({ error: 'Failed to delete photo' });
    }
});

// Error handler for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum 10MB allowed.' });
        }
        return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({ error: error.message });
    }
    next(error);
});

module.exports = router;
