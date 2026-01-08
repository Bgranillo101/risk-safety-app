# PGH Risk & Safety

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js">
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License">
</p>

<p align="center">
  <strong>Enterprise-grade workplace safety management platform</strong><br>
  Full-Stack Node.js • RESTful API • JWT Authentication • Real-time Analytics
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-demo-credentials">Demo</a>
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

---

## ✨ Features

### Frontend

- **Responsive Dashboard** - Real-time safety KPI metrics & activity feed
- **Photo Documentation** - Drag-and-drop upload with phase-based organization
- **Training Center** - Module progress tracking with completion certificates
- **Incident Reporting** - Multi-step forms with severity classification
- **Dark Mode** - Full theme support with persistent preferences
- **Admin Panel** - User management, incidents overview, compliance metrics

### Backend (v2.0)

- **RESTful API** - Complete CRUD operations for all entities
- **JWT Authentication** - Secure token-based auth with refresh support
- **Role-Based Access** - Admin, Manager, Supervisor, Employee roles
- **File Uploads** - Multer-powered photo/document management
- **SQLite Database** - Zero-config database with sql.js
- **Rate Limiting** - API protection against abuse (100 requests/15 min)
- **Security Headers** - Helmet.js for enhanced security

### User Experience

| Feature | Implementation |
|---------|----------------|
| **Dark Mode** | System-aware toggle with localStorage persistence |
| **Responsive Design** | Mobile-first CSS with 4 breakpoints |
| **Accessibility** | WCAG 2.1 compliant with ARIA labels & semantic HTML |
| **Performance** | Optimized assets, lazy loading, minimal dependencies |
| **Feedback** | Toast notifications, loading states, form validation |

---

## 🛠 Tech Stack

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
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="48" height="48" alt="Node.js" />
  <br>Node.js
</td>
<td align="center" width="96">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="48" height="48" alt="Express" />
  <br>Express
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

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Git**

### Quick Start

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

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
HOST=localhost
NODE_ENV=development
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=*
```

### Available Scripts

```bash
npm start        # Production server
npm run dev      # Development with hot reload (nodemon)
npm run db:init  # Initialize database schema
npm run db:seed  # Populate demo data
npm run lint     # Run ESLint
npm test         # Run Jest tests
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@pghsafety.com | Password123! |
| **Manager** | manager@pghsafety.com | Password123! |
| **Supervisor** | supervisor@pghsafety.com | Password123! |
| **Employee** | employee@pghsafety.com | Password123! |

---

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
│
├── js/
│   └── api.js              # Frontend API client
│
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
│
├── uploads/                # User uploads directory
│   ├── photos/
│   └── documents/
│
├── data/
│   └── safety.db           # SQLite database
│
├── package.json
└── README.md
```

---

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

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new account |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/profile` | Get current user |
| POST | `/auth/refresh` | Refresh JWT token |

### User Endpoints (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users (paginated) |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Deactivate user |

### Incident Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/incidents` | List incidents (filtered) |
| GET | `/incidents/:id` | Get incident details |
| POST | `/incidents` | Create incident |
| PUT | `/incidents/:id` | Update incident |
| DELETE | `/incidents/:id` | Delete incident |

### Photo Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/photos` | List photos |
| GET | `/photos/:id` | Get photo metadata |
| GET | `/photos/:id/image` | Get photo file |
| POST | `/photos` | Upload photo |
| DELETE | `/photos/:id` | Delete photo |

### Training Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/training/modules` | List modules |
| GET | `/training/modules/:id` | Get module details |
| POST | `/training/modules` | Create module |
| GET | `/training/progress` | Get user progress |
| POST | `/training/modules/:id/complete` | Complete module |

### Dashboard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Get statistics |
| GET | `/dashboard/activity` | Get activity feed |
| GET | `/dashboard/compliance` | Get compliance metrics |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Dashboard │  │Incidents │  │ Training │  │  Photos  │        │
│  │ (HTML5)  │  │ (HTML5)  │  │ (HTML5)  │  │ (HTML5)  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       └─────────────┴─────────────┴─────────────┘               │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │  API Client     │                           │
│                   │  (js/api.js)    │                           │
│                   └────────┬────────┘                           │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼────────────────────────────────────┐
│                        SERVER LAYER                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 Express.js Application                      │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │ │
│  │  │ Helmet  │  │  CORS   │  │  Rate   │  │ Morgan  │       │ │
│  │  │Security │  │ Policy  │  │ Limiter │  │ Logging │       │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            │                                     │
│  ┌─────────────────────────▼──────────────────────────────────┐ │
│  │                    API Routes                               │ │
│  │  ┌──────┬──────┬──────────┬──────┬──────────┬───────────┐  │ │
│  │  │/auth │/users│/incidents│/photos│/training │/dashboard │  │ │
│  │  └──────┴──────┴──────────┴──────┴──────────┴───────────┘  │ │
│  └─────────────────────────▲──────────────────────────────────┘ │
│                            │                                     │
│  ┌─────────────────────────┴──────────────────────────────────┐ │
│  │                  Middleware Layer                           │ │
│  │  ┌────────────────┐  ┌────────────────┐                    │ │
│  │  │  JWT Auth      │  │  Role-Based    │                    │ │
│  │  │  Verification  │  │  Authorization │                    │ │
│  │  └────────────────┘  └────────────────┘                    │ │
│  └─────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                         DATA LAYER                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    sql.js (SQLite)                          │ │
│  │  ┌───────┐ ┌─────────┐ ┌──────┐ ┌────────┐ ┌────────────┐  │ │
│  │  │ users │ │incidents│ │photos│ │training│ │activity_log│  │ │
│  │  └───────┘ └─────────┘ └──────┘ └────────┘ └────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Features

- **Helmet.js** - Sets secure HTTP headers (CSP, HSTS, X-Frame-Options)
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable origin whitelist
- **Password Hashing** - bcrypt with 12 salt rounds
- **JWT Tokens** - Short-lived access tokens with refresh capability
- **Input Validation** - Request sanitization and validation
- **SQL Injection Prevention** - Parameterized queries
- **File Upload Validation** - MIME type and size restrictions (10MB max)

---

## 📱 Responsive Design

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| **xs** | < 576px | Mobile phones |
| **sm** | ≥ 576px | Large phones, small tablets |
| **md** | ≥ 768px | Tablets |
| **lg** | ≥ 992px | Laptops, desktops |
| **xl** | ≥ 1200px | Large desktops |

---

## ✅ Quality Assurance

### Validation

- ✅ W3C HTML5 validation passing
- ✅ W3C CSS3 validation passing
- ✅ ESLint JavaScript linting

### Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios (WCAG AA)
- ✅ Screen reader compatible

### Browser Testing

- ✅ Chrome (macOS, Windows)
- ✅ Firefox (macOS, Windows)
- ✅ Safari (macOS, iOS)
- ✅ Edge (Windows)

---

## 🔮 Future Enhancements

- [ ] WebSocket integration for real-time notifications
- [ ] Email notifications for critical incidents
- [ ] PDF report generation
- [ ] Progressive Web App (PWA) support
- [ ] Two-factor authentication (2FA)
- [ ] Integration with external compliance APIs
- [ ] Data visualization with Chart.js
- [ ] Offline functionality with service workers

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
</td>
</tr>
</table>

---

## 📄 License

This project is proprietary software developed for PGH Risk & Safety.  
© 2026 PGH Risk & Safety. All rights reserved.

---

<p align="center">
  <strong>PGH Risk & Safety</strong><br>
  <sub>Professional Safety Management Solutions</sub><br><br>
</p>
