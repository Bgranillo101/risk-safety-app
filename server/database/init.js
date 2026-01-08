/**
 * Database Initialization Module
 * 
 * Uses sql.js for SQLite database operations (pure JavaScript, no native bindings)
 * Creates all tables with proper schemas, indexes, and foreign key relationships
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/safety.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

let db = null;
let SQL = null;
let initialized = false;

/**
 * Initialize the database
 */
async function initDatabase() {
    if (initialized && db) return db;
    
    // Initialize sql.js
    SQL = await initSqlJs();
    
    // Load existing database or create new one
    try {
        if (fs.existsSync(DB_PATH)) {
            const buffer = fs.readFileSync(DB_PATH);
            db = new SQL.Database(buffer);
            console.log('📂 Loaded existing database');
        } else {
            db = new SQL.Database();
            console.log('🆕 Created new database');
        }
    } catch (error) {
        console.error('Database load error:', error);
        db = new SQL.Database();
    }
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    // Create tables
    createTables();
    
    // Save the database
    saveDatabase();
    
    initialized = true;
    return db;
}

/**
 * Save database to file
 */
function saveDatabase() {
    if (!db) return;
    
    try {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(DB_PATH, buffer);
    } catch (error) {
        console.error('Error saving database:', error);
    }
}

/**
 * Create all database tables
 */
function createTables() {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            role TEXT DEFAULT 'employee' CHECK (role IN ('admin', 'manager', 'supervisor', 'employee')),
            department TEXT,
            phone TEXT,
            avatar_url TEXT,
            is_active INTEGER DEFAULT 1,
            last_login TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
        )
    `);
    
    // Create indexes
    db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);
    
    // Incidents table
    db.run(`
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            type TEXT NOT NULL CHECK (type IN ('injury', 'near-miss', 'property', 'environmental', 'equipment', 'fire', 'chemical', 'other')),
            severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
            status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')),
            location TEXT,
            incident_date TEXT,
            reporter_id INTEGER,
            assigned_to INTEGER,
            witnesses TEXT,
            root_cause TEXT,
            corrective_actions TEXT,
            resolution_notes TEXT,
            resolved_at TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (reporter_id) REFERENCES users(id),
            FOREIGN KEY (assigned_to) REFERENCES users(id)
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_incidents_severity ON incidents(severity)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_incidents_type ON incidents(type)`);
    
    // Photos table
    db.run(`
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            original_name TEXT,
            mime_type TEXT,
            file_size INTEGER,
            phase TEXT CHECK (phase IN ('pre', 'during', 'post')),
            description TEXT,
            location TEXT,
            incident_id INTEGER,
            uploaded_by INTEGER,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE SET NULL,
            FOREIGN KEY (uploaded_by) REFERENCES users(id)
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_photos_phase ON photos(phase)`);
    
    // Training modules table
    db.run(`
        CREATE TABLE IF NOT EXISTS training_modules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            duration_minutes INTEGER,
            content_url TEXT,
            thumbnail_url TEXT,
            difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
            is_required INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            created_by INTEGER,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_training_category ON training_modules(category)`);
    
    // Training progress table
    db.run(`
        CREATE TABLE IF NOT EXISTS training_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            module_id INTEGER NOT NULL,
            status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
            progress INTEGER DEFAULT 0,
            started_at TEXT,
            completed_at TEXT,
            score INTEGER,
            certificate_url TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (module_id) REFERENCES training_modules(id) ON DELETE CASCADE,
            UNIQUE(user_id, module_id)
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_progress_user ON training_progress(user_id)`);
    
    // Documents table
    db.run(`
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL CHECK (category IN ('sds', 'procedure', 'policy', 'permit', 'checklist', 'manual', 'other')),
            filename TEXT NOT NULL,
            original_name TEXT,
            mime_type TEXT,
            file_size INTEGER,
            version TEXT DEFAULT '1.0',
            is_active INTEGER DEFAULT 1,
            uploaded_by INTEGER,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (uploaded_by) REFERENCES users(id)
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category)`);
    
    // Audit log table
    db.run(`
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            entity_type TEXT NOT NULL,
            entity_id INTEGER,
            old_values TEXT,
            new_values TEXT,
            ip_address TEXT,
            user_agent TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        )
    `);
    
    db.run(`CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id)`);
    
    console.log('✅ All tables created successfully');
}

/**
 * Get the database instance
 */
function getDatabase() {
    return db;
}

/**
 * Execute a query and return results
 */
function query(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    
    try {
        const stmt = db.prepare(sql);
        if (params.length > 0) {
            stmt.bind(params);
        }
        
        const results = [];
        while (stmt.step()) {
            results.push(stmt.getAsObject());
        }
        stmt.free();
        
        return results;
    } catch (error) {
        console.error('Query error:', sql, error.message);
        throw error;
    }
}

/**
 * Execute a statement (INSERT, UPDATE, DELETE)
 */
function run(sql, params = []) {
    if (!db) throw new Error('Database not initialized');
    
    try {
        db.run(sql, params);
        saveDatabase();
        
        // Get last insert ID and changes
        const lastId = query('SELECT last_insert_rowid() as id')[0]?.id;
        const changes = query('SELECT changes() as changes')[0]?.changes;
        
        return { lastInsertRowid: lastId, changes };
    } catch (error) {
        console.error('Run error:', sql, error.message);
        throw error;
    }
}

/**
 * Get a single row
 */
function get(sql, params = []) {
    const results = query(sql, params);
    return results[0] || null;
}

/**
 * Get all rows
 */
function all(sql, params = []) {
    return query(sql, params);
}

// Export functions
module.exports = {
    initDatabase,
    getDatabase,
    saveDatabase,
    query,
    run,
    get,
    all
};

// Run if called directly
if (require.main === module) {
    initDatabase()
        .then(() => {
            console.log('🎉 Database initialization complete!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Database initialization failed:', error);
            process.exit(1);
        });
}
