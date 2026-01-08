/**
 * Dashboard Routes
 * Provides aggregated statistics and metrics for the dashboard
 */

const express = require('express');
const router = express.Router();

const db = require('../database/init');
const { authenticate, optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics
 */
router.get('/stats', optionalAuth, (req, res) => {
    try {
        // User stats
        const totalUsers = db.get('SELECT COUNT(*) as count FROM users WHERE is_active = 1')?.count || 0;
        const usersByRole = db.all(`
            SELECT role, COUNT(*) as count FROM users WHERE is_active = 1 GROUP BY role
        `);
        
        // Incident stats
        const totalIncidents = db.get('SELECT COUNT(*) as count FROM incidents')?.count || 0;
        const openIncidents = db.get(`
            SELECT COUNT(*) as count FROM incidents WHERE status IN ('reported', 'investigating')
        `)?.count || 0;
        const resolvedThisMonth = db.get(`
            SELECT COUNT(*) as count FROM incidents 
            WHERE status = 'resolved' 
            AND resolved_at >= datetime('now', 'start of month')
        `)?.count || 0;
        
        const incidentsByType = db.all(`
            SELECT type, COUNT(*) as count FROM incidents GROUP BY type
        `);
        const incidentsBySeverity = db.all(`
            SELECT severity, COUNT(*) as count FROM incidents GROUP BY severity
        `);
        
        // Training stats
        const totalModules = db.get('SELECT COUNT(*) as count FROM training_modules WHERE is_active = 1')?.count || 0;
        const completedTraining = db.get(`
            SELECT COUNT(*) as count FROM training_progress WHERE status = 'completed'
        `)?.count || 0;
        
        // Calculate completion rate
        let completionRate = 0;
        if (totalUsers > 0 && totalModules > 0) {
            const maxCompletions = totalUsers * totalModules;
            completionRate = Math.round((completedTraining / maxCompletions) * 100);
        }
        
        // Photo stats
        const totalPhotos = db.get('SELECT COUNT(*) as count FROM photos')?.count || 0;
        const photosByPhase = db.all(`
            SELECT phase, COUNT(*) as count FROM photos GROUP BY phase
        `);
        
        res.json({
            users: {
                total: totalUsers,
                byRole: usersByRole
            },
            incidents: {
                total: totalIncidents,
                open: openIncidents,
                resolvedThisMonth,
                byType: incidentsByType,
                bySeverity: incidentsBySeverity
            },
            training: {
                totalModules,
                completedTraining,
                completionRate
            },
            photos: {
                total: totalPhotos,
                byPhase: photosByPhase
            }
        });
        
    } catch (error) {
        logger.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

/**
 * GET /api/dashboard/activity
 * Get recent activity feed
 */
router.get('/activity', optionalAuth, (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        // Collect recent activities from different tables
        const activities = [];
        
        // Recent incidents
        const incidents = db.all(`
            SELECT id, title, type, created_at as timestamp 
            FROM incidents 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        incidents.forEach(i => {
            activities.push({
                type: 'incident',
                title: i.title,
                description: `${i.type} incident reported`,
                timestamp: i.timestamp,
                entityId: i.id
            });
        });
        
        // Recent photos
        const photos = db.all(`
            SELECT id, phase, description, created_at as timestamp 
            FROM photos 
            ORDER BY created_at DESC 
            LIMIT 5
        `);
        photos.forEach(p => {
            activities.push({
                type: 'photo',
                title: `Photo Upload - ${p.phase}`,
                description: p.description || `${p.phase}-task documentation`,
                timestamp: p.timestamp,
                entityId: p.id
            });
        });
        
        // Recent training completions
        const training = db.all(`
            SELECT tp.id, tp.completed_at as timestamp, tm.title
            FROM training_progress tp
            JOIN training_modules tm ON tp.module_id = tm.id
            WHERE tp.status = 'completed'
            ORDER BY tp.completed_at DESC 
            LIMIT 5
        `);
        training.forEach(t => {
            activities.push({
                type: 'training',
                title: `Training Completed: ${t.title}`,
                description: 'Module completed successfully',
                timestamp: t.timestamp,
                entityId: t.id
            });
        });
        
        // Sort by timestamp and limit
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.json(activities.slice(0, limit));
        
    } catch (error) {
        logger.error('Activity feed error:', error);
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});

/**
 * GET /api/dashboard/compliance
 * Get compliance metrics
 */
router.get('/compliance', authenticate, (req, res) => {
    try {
        // Training compliance
        const requiredModules = db.get(`
            SELECT COUNT(*) as count FROM training_modules WHERE is_required = 1 AND is_active = 1
        `)?.count || 0;
        
        const usersWithAllRequired = db.get(`
            SELECT COUNT(DISTINCT tp.user_id) as count
            FROM training_progress tp
            JOIN training_modules tm ON tp.module_id = tm.id
            WHERE tm.is_required = 1 AND tp.status = 'completed'
            GROUP BY tp.user_id
            HAVING COUNT(*) >= ?
        `, [requiredModules])?.count || 0;
        
        const totalActiveUsers = db.get('SELECT COUNT(*) as count FROM users WHERE is_active = 1')?.count || 0;
        
        const trainingCompliance = totalActiveUsers > 0 
            ? Math.round((usersWithAllRequired / totalActiveUsers) * 100) 
            : 0;
        
        // Incident resolution time
        const avgResolutionTime = db.get(`
            SELECT AVG(JULIANDAY(resolved_at) - JULIANDAY(created_at)) as avg_days
            FROM incidents 
            WHERE resolved_at IS NOT NULL
        `)?.avg_days || 0;
        
        // Open critical incidents
        const criticalOpen = db.get(`
            SELECT COUNT(*) as count FROM incidents 
            WHERE severity = 'critical' AND status IN ('reported', 'investigating')
        `)?.count || 0;
        
        res.json({
            trainingCompliance,
            requiredModules,
            avgResolutionDays: Math.round(avgResolutionTime * 10) / 10,
            criticalOpenIncidents: criticalOpen,
            overallScore: Math.max(0, 100 - (criticalOpen * 10) - (100 - trainingCompliance) / 2)
        });
        
    } catch (error) {
        logger.error('Compliance metrics error:', error);
        res.status(500).json({ error: 'Failed to fetch compliance metrics' });
    }
});

module.exports = router;
