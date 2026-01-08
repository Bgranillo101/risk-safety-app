/**
 * Document Management Routes
 * Handles safety documents, SDS sheets, procedures, etc.
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const db = require('../database/init');
const { authenticate, optionalAuth, requireRole } = require('../middleware/auth');
const logger = require('../utils/logger');

// Configure multer for document uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/documents');
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

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

/**
 * GET /api/documents
 * Get all documents
 */
router.get('/', optionalAuth, (req, res) => {
    try {
        const { category, limit = 50 } = req.query;
        
        let sql = 'SELECT * FROM documents WHERE is_active = 1';
        const params = [];
        
        if (category) {
            sql += ' AND category = ?';
            params.push(category);
        }
        
        sql += ' ORDER BY created_at DESC LIMIT ?';
        params.push(parseInt(limit));
        
        const documents = db.all(sql, params);
        
        res.json({ documents });
        
    } catch (error) {
        logger.error('Fetch documents error:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

/**
 * GET /api/documents/:id
 * Get document by ID
 */
router.get('/:id', optionalAuth, (req, res) => {
    try {
        const document = db.get('SELECT * FROM documents WHERE id = ?', [req.params.id]);
        
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        res.json({ document });
        
    } catch (error) {
        logger.error('Fetch document error:', error);
        res.status(500).json({ error: 'Failed to fetch document' });
    }
});

/**
 * GET /api/documents/:id/download
 * Download document file
 */
router.get('/:id/download', authenticate, (req, res) => {
    try {
        const document = db.get('SELECT * FROM documents WHERE id = ?', [req.params.id]);
        
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        const filePath = path.join(__dirname, '../../uploads/documents', document.filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        res.download(filePath, document.original_name || document.filename);
        
    } catch (error) {
        logger.error('Download document error:', error);
        res.status(500).json({ error: 'Failed to download document' });
    }
});

/**
 * POST /api/documents
 * Upload new document (manager/admin only)
 */
router.post('/', authenticate, requireRole(['admin', 'manager']), upload.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { title, description, category, version } = req.body;
        
        if (!title || !category) {
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Title and category are required' });
        }
        
        const validCategories = ['sds', 'procedure', 'policy', 'permit', 'checklist', 'manual', 'other'];
        if (!validCategories.includes(category)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Invalid category' });
        }
        
        const result = db.run(`
            INSERT INTO documents (title, description, category, filename, original_name, mime_type, file_size, version, uploaded_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            title,
            description,
            category,
            req.file.filename,
            req.file.originalname,
            req.file.mimetype,
            req.file.size,
            version || '1.0',
            req.user.id
        ]);
        
        logger.info('Document uploaded', { documentId: result.lastInsertRowid, uploadedBy: req.user.id });
        
        res.status(201).json({
            message: 'Document uploaded',
            id: result.lastInsertRowid
        });
        
    } catch (error) {
        logger.error('Upload document error:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});

/**
 * PUT /api/documents/:id
 * Update document metadata
 */
router.put('/:id', authenticate, requireRole(['admin', 'manager']), (req, res) => {
    try {
        const document = db.get('SELECT id FROM documents WHERE id = ?', [req.params.id]);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        const { title, description, category, version } = req.body;
        
        db.run(`
            UPDATE documents SET
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                category = COALESCE(?, category),
                version = COALESCE(?, version),
                updated_at = datetime('now')
            WHERE id = ?
        `, [title, description, category, version, req.params.id]);
        
        res.json({ message: 'Document updated' });
        
    } catch (error) {
        logger.error('Update document error:', error);
        res.status(500).json({ error: 'Failed to update document' });
    }
});

/**
 * DELETE /api/documents/:id
 * Delete document (admin only)
 */
router.delete('/:id', authenticate, requireRole(['admin']), (req, res) => {
    try {
        const document = db.get('SELECT * FROM documents WHERE id = ?', [req.params.id]);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        // Delete file
        const filePath = path.join(__dirname, '../../uploads/documents', document.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // Delete record
        db.run('DELETE FROM documents WHERE id = ?', [req.params.id]);
        
        logger.info('Document deleted', { documentId: req.params.id, deletedBy: req.user.id });
        
        res.json({ message: 'Document deleted' });
        
    } catch (error) {
        logger.error('Delete document error:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});

module.exports = router;
