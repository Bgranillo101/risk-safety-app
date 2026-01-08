# PGH Risk & Safety

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js">
</p>

<p align="center">
  <strong>Enterprise-grade workplace safety management platform</strong><br>
  Full-Stack Node.js • RESTful API • JWT Authentication • Real-time Analytics
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a>
</p>

---

## 📋 Overview

PGH Risk & Safety is a **full-stack web application** designed for independent safety consultants and enterprise organizations to manage workplace safety operations. Built with modern technologies and enterprise-grade architecture, it provides a complete solution for incident reporting, training compliance tracking, and safety documentation.

**Key Business Value:**
- 📉 Reduce incident response time with streamlined reporting workflows
- 📊 Maintain OSHA compliance with automated training tracking
- 📸 Document site conditions with organized photo management
- 🔄 Enable real-time safety metrics visibility across teams
- 🔐 Role-based access control for enterprise security

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Bgranillo101/risk-safety-app.git
cd risk-safety-app

# Install dependencies
npm install

# Initialize database with demo data
npm run db:init
npm run db:seed

# Start development server
npm run dev
```

**Demo Accounts:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pghsafety.com | Password123! |
| Manager | manager@pghsafety.com | Password123! |
| Supervisor | supervisor@pghsafety.com | Password123! |
| Employee | employee@pghsafety.com | Password123! |

## ✨ Features

### Frontend
- **Responsive Dashboard** - Real-time safety KPI metrics & activity feed
- **Photo Documentation** - Drag-and-drop upload with phase-based organization
- **Training Center** - Module progress tracking with completion certificates
- **Incident Reporting** - Multi-step forms with severity classification
- **Dark Mode** - Full theme support with persistent preferences
- **Admin Panel** - User management, incidents overview, compliance metrics

### Backend (NEW in v2.0)
- **RESTful API** - Complete CRUD operations for all entities
- **JWT Authentication** - Secure token-based auth with refresh support
- **Role-Based Access** - Admin, Manager, Supervisor, Employee roles
- **File Uploads** - Multer-powered photo/document management
- **SQLite Database** - Zero-config database with sql.js
- **Rate Limiting** - API protection against abuse
- **Security Headers** - Helmet.js for enhanced security

## 🛠 Tech Stack

### Frontend
- Phase-based organization system
- Preview before upload

</td>
<td width="50%">

### 🎓 Training Management
- Progress tracking with visual indicators
- Module filtering & search
- Downloadable safety documents
- Certification status badges

### 📝 Incident Reporting
- Multi-step validated forms
- Severity classification system
- Witness information capture
- Emergency contact integration

</td>
</tr>
</table>

### 🎨 User Experience

| Feature | Implementation |
|---------|----------------|
| **Dark Mode** | System-aware toggle with localStorage persistence |
| **Responsive Design** | Mobile-first CSS with 4 breakpoints |
| **Accessibility** | WCAG 2.1 compliant with ARIA labels & semantic HTML |
| **Performance** | Optimized assets, lazy loading, minimal dependencies |
| **Feedback** | Toast notifications, loading states, form validation |

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="48" height="48" alt="HTML5" />
  <br>HTML5
</td>
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="48" height="48" alt="CSS3" />
  <br>CSS3
</td>
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="48" height="48" alt="JavaScript" />
  <br>JavaScript
</td>
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="48" height="48" alt="Bootstrap" />
  <br>Bootstrap 5
</td>
</tr>
</table>

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3.0 |
| **Backend** | Node.js, Express 4.18 |
| **Database** | SQLite (sql.js) |
| **Authentication** | JWT, bcrypt |
| **Security** | Helmet.js, CORS, Rate Limiting |
| **Icons** | Font Awesome 6.4.0 |
| **Typography** | Google Fonts (Poppins, Inter) |
| **File Uploads** | Multer |
| **Logging** | Winston |

## 📁 Project Structure

```
risk-safety-app/
├── index.html              # Main dashboard page
├── login.html              # Authentication page
├── admin.html              # Admin dashboard
├── photos.html             # Photo documentation
├── training.html           # Training modules
├── report.html             # Incident reporting
├── about.html              # About page
├── styles.css              # Main stylesheet with CSS variables
├── script.js               # Frontend JavaScript
├── js/
│   └── api.js              # Frontend API client
├── server/
│   ├── index.js            # Express server entry point
│   ├── database/
│   │   ├── init.js         # Database initialization
│   │   └── seed.js         # Demo data seeder
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── routes/
│   │   ├── auth.js         # Auth endpoints
│   │   ├── users.js        # User CRUD
│   │   ├── incidents.js    # Incident management
│   │   ├── photos.js       # Photo uploads
│   │   ├── training.js     # Training modules
│   │   ├── documents.js    # Document management
│   │   └── dashboard.js    # Dashboard stats
│   └── utils/
│       └── logger.js       # Winston logger
├── uploads/                # User uploads directory
│   ├── photos/
│   └── documents/
├── data/
│   └── safety.db           # SQLite database
├── package.json
└── README.md
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Endpoints

#### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new account |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/me` | Get current user |
| POST | `/auth/refresh` | Refresh JWT token |

#### Users (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Deactivate user |

#### Incidents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/incidents` | List incidents |
| GET | `/incidents/:id` | Get incident |
| POST | `/incidents` | Create incident |
| PUT | `/incidents/:id` | Update incident |
| PATCH | `/incidents/:id/status` | Update status |
| DELETE | `/incidents/:id` | Delete incident |

#### Photos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/photos` | List photos |
| GET | `/photos/:id` | Get photo metadata |
| GET | `/photos/:id/image` | Get photo file |
| POST | `/photos` | Upload photo |
| DELETE | `/photos/:id` | Delete photo |

#### Training
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/training/modules` | List modules |
| GET | `/training/modules/:id` | Get module |
| POST | `/training/modules` | Create module |
| GET | `/training/progress` | Get user progress |
| POST | `/training/modules/:id/start` | Start module |
| POST | `/training/modules/:id/complete` | Complete module |

#### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Get statistics |
| GET | `/dashboard/activity` | Get activity feed |
| GET | `/dashboard/compliance` | Get compliance metrics |

## � Deployment

### Development
```bash
npm run dev    # Starts nodemon with hot reload
```

### Production
```bash
npm start      # Starts production server
```

### Environment Variables
Create a `.env` file:
```env
PORT=3000
HOST=localhost
NODE_ENV=development
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```
risk-safety-app/
│
├── 📄 index.html           # Dashboard with metrics & activity feed
├── 📄 photos.html          # Photo upload & gallery management
├── 📄 training.html        # Training modules & documents
├── 📄 report.html          # Incident reporting form
├── 📄 about.html           # Company info & contact form
│
├── 🎨 styles.css           # Comprehensive stylesheet (1,500+ lines)
│   ├── CSS Custom Properties (50+ design tokens)
│   ├── Component styles (21 organized sections)
│   ├── Dark mode theming
│   └── Responsive breakpoints
│
├── ⚡ script.js            # Application logic (~600 lines)
│   ├── Toast notification system
│   ├── Form validation handlers
│   ├── Dark mode toggle
│   ├── File upload processing
│   └── UI interaction handlers
│
├── 🖼️ hero-img.jpg         # Hero section background
└── 📖 README.md            # Documentation
```

## � Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No build tools, package managers, or server required

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Bgranillo101/risk-safety-app.git

# Navigate to project directory
cd risk-safety-app

# Open in browser (macOS)
open index.html

# Or start a local server for development
python -m http.server 8000
```

### Development Server Options

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve -p 8000

# PHP
php -S localhost:8000

# VS Code: Use "Live Server" extension
```

## 🏗️ Architecture

### CSS Architecture

The stylesheet follows a **scalable component-based architecture** with clear separation of concerns:

```
styles.css
│
├── 1. Design Tokens          # CSS custom properties for theming
├── 2. Base & Reset           # Normalize and base element styles
├── 3. Typography             # Font families, sizes, weights
├── 4. Layout Components      # Navbar, footer, sections
├── 5. UI Components          # Cards, buttons, badges, forms
├── 6. Page-Specific          # Dashboard, photos, training, report
├── 7. Utilities              # Helper classes
├── 8. Dark Mode              # Theme overrides (300+ lines)
└── 9. Media Queries          # Responsive breakpoints
```

### JavaScript Architecture

Modular vanilla JavaScript with **no external dependencies**:

```javascript
// Module Pattern Structure
├── initApp()               // Application bootstrap
├── initDarkMode()          // Theme management
├── initToastSystem()       // Notification handling
├── initFormValidation()    // Form handlers
├── initPhotoUpload()       // File processing
├── initScrollEffects()     // UI animations
└── initBackToTop()         // Navigation helper
```

### Design System

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--primary-color` | `#000191` | `#000191` |
| `--background` | `#ffffff` | `#1a1a1a` |
| `--text-primary` | `#333333` | `#e9ecef` |
| `--text-muted` | `#6c757d` | `#888888` |
| `--card-bg` | `#ffffff` | `#282828` |
| `--border-color` | `#dee2e6` | `#555555` |

## 📱 Responsive Design

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| **xs** | < 576px | Mobile phones |
| **sm** | ≥ 576px | Large phones, small tablets |
| **md** | ≥ 768px | Tablets |
| **lg** | ≥ 992px | Laptops, desktops |
| **xl** | ≥ 1200px | Large desktops |

## ✅ Quality Assurance

### Validation
- [x] W3C HTML5 validation passing
- [x] W3C CSS3 validation passing
- [x] ESLint JavaScript linting

### Accessibility
- [x] Semantic HTML structure
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Color contrast ratios (WCAG AA)
- [x] Screen reader compatible

### Browser Testing
- [x] Chrome (macOS, Windows)
- [x] Firefox (macOS, Windows)
- [x] Safari (macOS, iOS)
- [x] Edge (Windows)

## 🔮 Future Enhancements

- [ ] Backend API integration (Node.js/Express or Python/FastAPI)
- [ ] User authentication & role-based access
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] PDF report generation
- [ ] Email notification system
- [ ] Progressive Web App (PWA) support
- [ ] Offline functionality with service workers

## 📄 License

This project is proprietary software developed for PGH Risk & Safety.  
© 2026 PGH Risk & Safety. All rights reserved.

---

## 👤 Author

<table>
<tr>
<td align="center">
  <strong>Brandon Granillo</strong><br>
  <sub>Computer Systems Engineering @ Arizona State University '28</sub><br><br>
  <a href="https://github.com/Bgranillo101">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/bgranillo">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://app.joinhandshake.com/profiles/bgranillo">
    <img src="https://img.shields.io/badge/Handshake-FF7043?style=for-the-badge&logo=handshake&logoColor=white" alt="Handshake">
  </a>
</td>
</tr>
</table>

---

<p align="center">
  <strong>PGH Risk & Safety</strong><br>
  <sub>Professional Safety Management Solutions</sub><br><br>
  <sub>Built with ❤️ in Phoenix, Arizona</sub>
</p>
