/**
 * Database Seed Script
 * 
 * Populates the database with demo data for testing and development
 * Includes sample users, incidents, training modules, and documents
 */

const bcrypt = require('bcryptjs');
const { initDatabase, run, get, all, saveDatabase } = require('./init');

/**
 * Seed the database with demo data
 */
async function seedDatabase() {
    console.log('🌱 Starting database seed...\n');
    
    // Initialize database first
    await initDatabase();
    
    // Seed users
    await seedUsers();
    
    // Seed training modules
    await seedTrainingModules();
    
    // Seed incidents
    await seedIncidents();
    
    // Seed documents
    await seedDocuments();
    
    // Save final state
    saveDatabase();
    
    console.log('\n✅ Database seeding complete!');
}

/**
 * Seed demo users
 */
async function seedUsers() {
    console.log('👥 Seeding users...');
    
    const users = [
        {
            email: 'admin@pghsafety.com',
            password: 'Password123!',
            first_name: 'Admin',
            last_name: 'User',
            role: 'admin',
            department: 'Safety Management'
        },
        {
            email: 'manager@pghsafety.com',
            password: 'Password123!',
            first_name: 'Sarah',
            last_name: 'Johnson',
            role: 'manager',
            department: 'Operations'
        },
        {
            email: 'supervisor@pghsafety.com',
            password: 'Password123!',
            first_name: 'Mike',
            last_name: 'Williams',
            role: 'supervisor',
            department: 'Construction'
        },
        {
            email: 'employee@pghsafety.com',
            password: 'Password123!',
            first_name: 'John',
            last_name: 'Doe',
            role: 'employee',
            department: 'Field Operations'
        }
    ];
    
    for (const user of users) {
        // Check if user already exists
        const existing = get('SELECT id FROM users WHERE email = ?', [user.email]);
        if (existing) {
            console.log(`  ⏭️  User ${user.email} already exists`);
            continue;
        }
        
        // Hash password
        const passwordHash = await bcrypt.hash(user.password, 12);
        
        // Insert user
        run(`
            INSERT INTO users (email, password_hash, first_name, last_name, role, department)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [user.email, passwordHash, user.first_name, user.last_name, user.role, user.department]);
        
        console.log(`  ✅ Created user: ${user.email} (${user.role})`);
    }
}

/**
 * Seed training modules
 */
async function seedTrainingModules() {
    console.log('📚 Seeding training modules...');
    
    const modules = [
        {
            title: 'OSHA 10-Hour General Industry',
            description: 'Comprehensive OSHA safety training covering workplace hazards, PPE, and safety regulations.',
            category: 'OSHA',
            duration_minutes: 600,
            difficulty: 'beginner',
            is_required: 1
        },
        {
            title: 'OSHA 30-Hour Construction',
            description: 'Advanced construction safety training for supervisors and workers with specialized roles.',
            category: 'OSHA',
            duration_minutes: 1800,
            difficulty: 'advanced',
            is_required: 0
        },
        {
            title: 'Fall Protection Fundamentals',
            description: 'Learn proper fall protection equipment usage, inspection, and safety procedures.',
            category: 'Fall Protection',
            duration_minutes: 120,
            difficulty: 'intermediate',
            is_required: 1
        },
        {
            title: 'Hazard Communication (HazCom)',
            description: 'Understanding chemical hazards, SDS sheets, and proper labeling requirements.',
            category: 'Chemical Safety',
            duration_minutes: 90,
            difficulty: 'beginner',
            is_required: 1
        },
        {
            title: 'Lockout/Tagout Procedures',
            description: 'Critical procedures for controlling hazardous energy during equipment maintenance.',
            category: 'Equipment Safety',
            duration_minutes: 60,
            difficulty: 'intermediate',
            is_required: 1
        },
        {
            title: 'Fire Safety and Prevention',
            description: 'Fire prevention, extinguisher usage, and emergency evacuation procedures.',
            category: 'Emergency Response',
            duration_minutes: 45,
            difficulty: 'beginner',
            is_required: 1
        },
        {
            title: 'First Aid and CPR Certification',
            description: 'Basic first aid, CPR, and AED usage for workplace emergencies.',
            category: 'Emergency Response',
            duration_minutes: 240,
            difficulty: 'beginner',
            is_required: 0
        },
        {
            title: 'Confined Space Entry',
            description: 'Safe entry and work procedures for permit-required confined spaces.',
            category: 'Specialized',
            duration_minutes: 180,
            difficulty: 'advanced',
            is_required: 0
        }
    ];
    
    for (const module of modules) {
        // Check if module already exists
        const existing = get('SELECT id FROM training_modules WHERE title = ?', [module.title]);
        if (existing) {
            console.log(`  ⏭️  Module "${module.title}" already exists`);
            continue;
        }
        
        run(`
            INSERT INTO training_modules (title, description, category, duration_minutes, difficulty, is_required)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [module.title, module.description, module.category, module.duration_minutes, module.difficulty, module.is_required]);
        
        console.log(`  ✅ Created module: ${module.title}`);
    }
}

/**
 * Seed sample incidents
 */
async function seedIncidents() {
    console.log('⚠️  Seeding incidents...');
    
    const incidents = [
        {
            title: 'Slip hazard in warehouse',
            description: 'Water leak from HVAC unit created a slippery surface near loading dock B.',
            type: 'near-miss',
            severity: 'medium',
            status: 'resolved',
            location: 'Warehouse - Loading Dock B'
        },
        {
            title: 'Missing guardrail on scaffolding',
            description: 'Guardrail section missing on level 3 of scaffolding at Site A. Immediate corrective action required.',
            type: 'property',
            severity: 'high',
            status: 'investigating',
            location: 'Construction Site A - Building 2'
        },
        {
            title: 'Minor hand injury - improper glove use',
            description: 'Employee sustained minor cut while handling materials without required cut-resistant gloves.',
            type: 'injury',
            severity: 'low',
            status: 'closed',
            location: 'Manufacturing Floor - Station 12'
        },
        {
            title: 'Chemical spill in storage area',
            description: 'Small spill of cleaning solution due to damaged container. Area cordoned off and cleaned.',
            type: 'chemical',
            severity: 'medium',
            status: 'resolved',
            location: 'Storage Building C'
        },
        {
            title: 'Forklift near-miss incident',
            description: 'Forklift operator nearly struck pedestrian at intersection. Visibility obstruction identified.',
            type: 'near-miss',
            severity: 'high',
            status: 'reported',
            location: 'Warehouse - Aisle 7 Intersection'
        }
    ];
    
    // Get a reporter ID
    const reporter = get('SELECT id FROM users WHERE role = ? LIMIT 1', ['employee']);
    const reporterId = reporter?.id || null;
    
    for (const incident of incidents) {
        // Check if similar incident exists
        const existing = get('SELECT id FROM incidents WHERE title = ?', [incident.title]);
        if (existing) {
            console.log(`  ⏭️  Incident "${incident.title}" already exists`);
            continue;
        }
        
        run(`
            INSERT INTO incidents (title, description, type, severity, status, location, reporter_id, incident_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-' || abs(random() % 30) || ' days'))
        `, [incident.title, incident.description, incident.type, incident.severity, incident.status, incident.location, reporterId]);
        
        console.log(`  ✅ Created incident: ${incident.title}`);
    }
}

/**
 * Seed sample documents
 */
async function seedDocuments() {
    console.log('📄 Seeding documents...');
    
    const documents = [
        {
            title: 'Emergency Action Plan',
            description: 'Comprehensive emergency response procedures for all facility locations.',
            category: 'procedure',
            filename: 'emergency-action-plan.pdf'
        },
        {
            title: 'PPE Requirements Matrix',
            description: 'Required personal protective equipment by job task and hazard level.',
            category: 'policy',
            filename: 'ppe-matrix.pdf'
        },
        {
            title: 'Safety Data Sheet - Cleaning Chemicals',
            description: 'SDS for all cleaning and maintenance chemicals used on site.',
            category: 'sds',
            filename: 'cleaning-chemicals-sds.pdf'
        },
        {
            title: 'Daily Safety Inspection Checklist',
            description: 'Standard checklist for daily site safety inspections.',
            category: 'checklist',
            filename: 'daily-inspection-checklist.pdf'
        },
        {
            title: 'Hot Work Permit Form',
            description: 'Required permit documentation for welding, cutting, and hot work operations.',
            category: 'permit',
            filename: 'hot-work-permit.pdf'
        }
    ];
    
    for (const doc of documents) {
        // Check if document already exists
        const existing = get('SELECT id FROM documents WHERE title = ?', [doc.title]);
        if (existing) {
            console.log(`  ⏭️  Document "${doc.title}" already exists`);
            continue;
        }
        
        run(`
            INSERT INTO documents (title, description, category, filename)
            VALUES (?, ?, ?, ?)
        `, [doc.title, doc.description, doc.category, doc.filename]);
        
        console.log(`  ✅ Created document: ${doc.title}`);
    }
}

// Run seeder
seedDatabase()
    .then(() => {
        console.log('\n🎉 Seeding complete! The database is ready for use.');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    });
