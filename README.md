# 🛡️ Risk & Safety Management Platform# PGH Risk & Safety



<div align="center"><p align="center">

  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version">

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License">

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)  <img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)</p>

![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)<p align="center">

  <strong>Enterprise-grade workplace safety management platform</strong><br>

**A full-stack enterprise-grade workplace safety management system**  Full-Stack Node.js • RESTful API • JWT Authentication • Real-time Analytics

</p>

*Designed and developed to streamline incident reporting, safety training, and compliance tracking*

<p align="center">

[Features](#-key-features) • [Architecture](#-system-architecture) • [API Documentation](#-api-documentation) • [Installation](#-installation) • [Demo](#-demo-credentials)  <a href="#-live-demo">Live Demo</a> •

  <a href="#-features">Features</a> •

</div>  <a href="#-tech-stack">Tech Stack</a> •

  <a href="#-getting-started">Getting Started</a> •

---  <a href="#-api-documentation">API Docs</a>

</p>

## 📋 Project Overview

---

This **Risk & Safety Management Platform** is a comprehensive full-stack web application built to modernize workplace safety operations. The system enables organizations to track incidents in real-time, manage employee training programs, upload photographic documentation, and maintain regulatory compliance through centralized dashboards and analytics.

## 📋 Overview

**Built as a solo project demonstrating end-to-end software development capabilities**, this platform showcases modern web development practices including RESTful API design, secure authentication, database management, and responsive UI/UX design.

PGH Risk & Safety is a **full-stack web application** designed for independent safety consultants and enterprise organizations to manage workplace safety operations. Built with modern technologies and enterprise-grade architecture, it provides a complete solution for incident reporting, training compliance tracking, and safety documentation.

---

**Key Business Value:**

## ✨ Key Features- 📉 Reduce incident response time with streamlined reporting workflows

- 📊 Maintain OSHA compliance with automated training tracking

### 🔐 Authentication & Authorization- 📸 Document site conditions with organized photo management

- **JWT-based authentication** with access & refresh tokens- 🔄 Enable real-time safety metrics visibility across teams

- **Role-Based Access Control (RBAC)** supporting Admin, Manager, Supervisor, and Employee roles- 🔐 Role-based access control for enterprise security

- Secure password hashing with **bcrypt** (salt rounds: 12)

- Session management with token refresh capabilities## 🚀 Quick Start

- Protected routes with middleware authorization

```bash

### 📊 Incident Management System# Clone the repository

- Full CRUD operations for safety incidentsgit clone https://github.com/Bgranillo101/risk-safety-app.git

- Multi-status workflow: `open` → `investigating` → `resolved` → `closed`cd risk-safety-app

- Priority classification (Low, Medium, High, Critical)

- Advanced search and filtering by date, type, status, severity# Install dependencies

- Incident assignment and ownership trackingnpm install



### 📸 Photo Documentation# Initialize database with demo data

- Secure file upload with **Multer** middlewarenpm run db:init

- Supported formats: JPEG, PNG, WebP (max 10MB)npm run db:seed

- Photo association with incidents and locations

- Gallery view with thumbnail generation# Start development server

npm run dev

### 📚 Training Management```

- Training module creation and assignment

- Employee progress tracking with completion timestamps**Demo Accounts:**

- Compliance deadline management| Role | Email | Password |

- Training analytics and completion rates|------|-------|----------|

| Admin | admin@pghsafety.com | Password123! |

### 👥 User Management| Manager | manager@pghsafety.com | Password123! |

- Complete user lifecycle management| Supervisor | supervisor@pghsafety.com | Password123! |

- Role assignment and modification| Employee | employee@pghsafety.com | Password123! |

- Paginated user listings with search

- Activity logging and audit trails## ✨ Features



### 📈 Analytics Dashboard### Frontend

- Real-time incident statistics- **Responsive Dashboard** - Real-time safety KPI metrics & activity feed

- Training compliance metrics- **Photo Documentation** - Drag-and-drop upload with phase-based organization

- Recent activity feeds- **Training Center** - Module progress tracking with completion certificates

- Visual data representation with charts- **Incident Reporting** - Multi-step forms with severity classification

- **Dark Mode** - Full theme support with persistent preferences

---- **Admin Panel** - User management, incidents overview, compliance metrics



## 🏗️ System Architecture### Backend (NEW in v2.0)

- **RESTful API** - Complete CRUD operations for all entities

```- **JWT Authentication** - Secure token-based auth with refresh support

┌─────────────────────────────────────────────────────────────────────────┐- **Role-Based Access** - Admin, Manager, Supervisor, Employee roles

│                           CLIENT LAYER                                   │- **File Uploads** - Multer-powered photo/document management

│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │- **SQLite Database** - Zero-config database with sql.js

│  │  Dashboard  │  │  Incidents  │  │  Training   │  │   Photos    │     │- **Rate Limiting** - API protection against abuse

│  │   (HTML5)   │  │   (HTML5)   │  │   (HTML5)   │  │   (HTML5)   │     │- **Security Headers** - Helmet.js for enhanced security

│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │

│         │                │                │                │             │## 🛠 Tech Stack

│         └────────────────┴────────────────┴────────────────┘             │

│                                   │                                       │### Frontend

│                          ┌────────▼────────┐                             │- Phase-based organization system

│                          │  API Client     │                             │- Preview before upload

│                          │  (js/api.js)    │                             │

│                          └────────┬────────┘                             │</td>

└───────────────────────────────────┼─────────────────────────────────────┘<td width="50%">

                                    │ HTTP/REST

┌───────────────────────────────────▼─────────────────────────────────────┐### 🎓 Training Management

│                           SERVER LAYER                                   │- Progress tracking with visual indicators

│  ┌─────────────────────────────────────────────────────────────────┐    │- Module filtering & search

│  │                    Express.js Application                        │    │- Downloadable safety documents

│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐     │    │- Certification status badges

│  │  │  Helmet   │  │   CORS    │  │Rate Limit │  │  Morgan   │     │    │

│  │  │ Security  │  │  Policy   │  │ 100/15min │  │  Logging  │     │    │### 📝 Incident Reporting

│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘     │    │- Multi-step validated forms

│  └─────────────────────────────────────────────────────────────────┘    │- Severity classification system

│                                    │                                     │- Witness information capture

│  ┌─────────────────────────────────▼───────────────────────────────┐    │- Emergency contact integration

│  │                      API Routes (RESTful)                        │    │

│  │  ┌──────────┬──────────┬──────────┬──────────┬──────────┐       │    │</td>

│  │  │  /auth   │ /users   │/incidents│ /photos  │/training │       │    │</tr>

│  │  ├──────────┼──────────┼──────────┼──────────┼──────────┤       │    │</table>

│  │  │/documents│/dashboard│          │          │          │       │    │

│  │  └──────────┴──────────┴──────────┴──────────┴──────────┘       │    │### 🎨 User Experience

│  └─────────────────────────────────────────────────────────────────┘    │

│                                    │                                     │| Feature | Implementation |

│  ┌─────────────────────────────────▼───────────────────────────────┐    │|---------|----------------|

│  │                   Middleware Layer                               │    │| **Dark Mode** | System-aware toggle with localStorage persistence |

│  │  ┌──────────────────┐  ┌──────────────────┐                     │    │| **Responsive Design** | Mobile-first CSS with 4 breakpoints |

│  │  │  JWT Auth        │  │  Role-Based      │                     │    │| **Accessibility** | WCAG 2.1 compliant with ARIA labels & semantic HTML |

│  │  │  Verification    │  │  Authorization   │                     │    │| **Performance** | Optimized assets, lazy loading, minimal dependencies |

│  │  └──────────────────┘  └──────────────────┘                     │    │| **Feedback** | Toast notifications, loading states, form validation |

│  └─────────────────────────────────────────────────────────────────┘    │

└───────────────────────────────────┬─────────────────────────────────────┘## 🛠️ Tech Stack

                                    │

┌───────────────────────────────────▼─────────────────────────────────────┐<table>

│                           DATA LAYER                                     │<tr>

│  ┌─────────────────────────────────────────────────────────────────┐    │<td align="center" width="96">

│  │                     sql.js (SQLite)                              │    │  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="48" height="48" alt="HTML5" />

│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │    │  <br>HTML5

│  │  │  users  │ │incidents│ │ photos  │ │training │ │ activity│    │    │</td>

│  │  │         │ │         │ │         │ │_modules │ │  _log   │    │    │<td align="center" width="96">

│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │    │  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="48" height="48" alt="CSS3" />

│  │  ┌─────────┐ ┌─────────┐                                        │    │  <br>CSS3

│  │  │training │ │documents│                                        │    │</td>

│  │  │_progress│ │         │                                        │    │<td align="center" width="96">

│  │  └─────────┘ └─────────┘                                        │    │  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="48" height="48" alt="JavaScript" />

│  └─────────────────────────────────────────────────────────────────┘    │  <br>JavaScript

└─────────────────────────────────────────────────────────────────────────┘</td>

```<td align="center" width="96">

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="48" height="48" alt="Bootstrap" />

---  <br>Bootstrap 5

</td>

## 🛠️ Tech Stack</tr>

</table>

### Backend

| Technology | Purpose || Category | Technologies |

|------------|---------||----------|--------------|

| **Node.js** | JavaScript runtime environment || **Frontend** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3.0 |

| **Express.js 4.18** | Web application framework || **Backend** | Node.js, Express 4.18 |

| **sql.js** | Pure JavaScript SQLite implementation || **Database** | SQLite (sql.js) |

| **JWT (jsonwebtoken)** | Stateless authentication tokens || **Authentication** | JWT, bcrypt |

| **bcryptjs** | Password hashing and verification || **Security** | Helmet.js, CORS, Rate Limiting |

| **Helmet** | Security headers middleware || **Icons** | Font Awesome 6.4.0 |

| **CORS** | Cross-Origin Resource Sharing || **Typography** | Google Fonts (Poppins, Inter) |

| **express-rate-limit** | API rate limiting protection || **File Uploads** | Multer |

| **Multer** | Multipart form data / file uploads || **Logging** | Winston |

| **Winston** | Structured logging framework |

| **dotenv** | Environment variable management |## 📁 Project Structure



### Frontend```

| Technology | Purpose |risk-safety-app/

|------------|---------|├── index.html              # Main dashboard page

| **HTML5** | Semantic markup structure |├── login.html              # Authentication page

| **CSS3** | Custom properties, Flexbox, Grid |├── admin.html              # Admin dashboard

| **JavaScript (ES6+)** | Dynamic interactivity |├── photos.html             # Photo documentation

| **Bootstrap 5.3** | Responsive UI framework |├── training.html           # Training modules

| **Font Awesome 6.4** | Icon library |├── report.html             # Incident reporting

| **Google Fonts** | Typography (Poppins, Inter) |├── about.html              # About page

├── styles.css              # Main stylesheet with CSS variables

### Development Tools├── script.js               # Frontend JavaScript

| Tool | Purpose |├── js/

|------|---------|│   └── api.js              # Frontend API client

| **nodemon** | Development auto-restart |├── server/

| **ESLint** | Code quality and linting |│   ├── index.js            # Express server entry point

| **Jest** | Testing framework |│   ├── database/

| **Git** | Version control |│   │   ├── init.js         # Database initialization

| **npm** | Package management |│   │   └── seed.js         # Demo data seeder

│   ├── middleware/

---│   │   └── auth.js         # JWT authentication

│   ├── routes/

## 📡 API Documentation│   │   ├── auth.js         # Auth endpoints

│   │   ├── users.js        # User CRUD

### Base URL│   │   ├── incidents.js    # Incident management

```│   │   ├── photos.js       # Photo uploads

http://localhost:3000/api│   │   ├── training.js     # Training modules

```│   │   ├── documents.js    # Document management

│   │   └── dashboard.js    # Dashboard stats

### Authentication Endpoints│   └── utils/

| Method | Endpoint | Description |│       └── logger.js       # Winston logger

|--------|----------|-------------|├── uploads/                # User uploads directory

| `POST` | `/auth/register` | Register new user |│   ├── photos/

| `POST` | `/auth/login` | Authenticate user |│   └── documents/

| `POST` | `/auth/logout` | Invalidate session |├── data/

| `GET` | `/auth/profile` | Get current user profile |│   └── safety.db           # SQLite database

| `POST` | `/auth/refresh` | Refresh access token |├── package.json

└── README.md

### User Management```

| Method | Endpoint | Description | Auth Required |

|--------|----------|-------------|---------------|## 📡 API Documentation

| `GET` | `/users` | List all users (paginated) | Admin |

| `GET` | `/users/:id` | Get user by ID | Admin/Manager |### Base URL

| `PUT` | `/users/:id` | Update user | Admin |```

| `DELETE` | `/users/:id` | Delete user | Admin |http://localhost:3000/api

```

### Incident Management

| Method | Endpoint | Description | Auth Required |### Authentication

|--------|----------|-------------|---------------|All protected endpoints require a Bearer token:

| `GET` | `/incidents` | List incidents (filtered) | ✅ |```

| `POST` | `/incidents` | Create new incident | ✅ |Authorization: Bearer <jwt_token>

| `GET` | `/incidents/:id` | Get incident details | ✅ |```

| `PUT` | `/incidents/:id` | Update incident | ✅ |

| `DELETE` | `/incidents/:id` | Delete incident | Admin/Manager |### Endpoints



### Training Endpoints#### Auth

| Method | Endpoint | Description | Auth Required || Method | Endpoint | Description |

|--------|----------|-------------|---------------||--------|----------|-------------|

| `GET` | `/training/modules` | List training modules | ✅ || POST | `/auth/register` | Create new account |

| `POST` | `/training/modules` | Create module | Admin/Manager || POST | `/auth/login` | User login |

| `GET` | `/training/progress` | Get user progress | ✅ || POST | `/auth/logout` | User logout |

| `POST` | `/training/progress/:moduleId/complete` | Mark complete | ✅ || GET | `/auth/me` | Get current user |

| POST | `/auth/refresh` | Refresh JWT token |

### Dashboard

| Method | Endpoint | Description | Auth Required |#### Users (Admin)

|--------|----------|-------------|---------------|| Method | Endpoint | Description |

| `GET` | `/dashboard/stats` | Get statistics | ✅ ||--------|----------|-------------|

| `GET` | `/dashboard/activity` | Recent activity | ✅ || GET | `/users` | List all users |

| GET | `/users/:id` | Get user by ID |

---| POST | `/users` | Create user |

| PUT | `/users/:id` | Update user |

## 🚀 Installation| DELETE | `/users/:id` | Deactivate user |



### Prerequisites#### Incidents

- **Node.js** v18.0.0 or higher| Method | Endpoint | Description |

- **npm** v9.0.0 or higher|--------|----------|-------------|

- **Git**| GET | `/incidents` | List incidents |

| GET | `/incidents/:id` | Get incident |

### Quick Start| POST | `/incidents` | Create incident |

| PUT | `/incidents/:id` | Update incident |

```bash| PATCH | `/incidents/:id/status` | Update status |

# Clone the repository| DELETE | `/incidents/:id` | Delete incident |

git clone https://github.com/yourusername/risk-safety-app.git

cd risk-safety-app#### Photos

| Method | Endpoint | Description |

# Install dependencies|--------|----------|-------------|

npm install| GET | `/photos` | List photos |

| GET | `/photos/:id` | Get photo metadata |

# Configure environment| GET | `/photos/:id/image` | Get photo file |

cp .env.example .env| POST | `/photos` | Upload photo |

# Edit .env with your settings| DELETE | `/photos/:id` | Delete photo |



# Initialize and seed database#### Training

npm run db:init| Method | Endpoint | Description |

npm run db:seed|--------|----------|-------------|

| GET | `/training/modules` | List modules |

# Start development server| GET | `/training/modules/:id` | Get module |

npm run dev| POST | `/training/modules` | Create module |

```| GET | `/training/progress` | Get user progress |

| POST | `/training/modules/:id/start` | Start module |

### Environment Variables| POST | `/training/modules/:id/complete` | Complete module |

```env

PORT=3000#### Dashboard

NODE_ENV=development| Method | Endpoint | Description |

JWT_SECRET=your-super-secret-jwt-key|--------|----------|-------------|

JWT_EXPIRES_IN=24h| GET | `/dashboard/stats` | Get statistics |

REFRESH_TOKEN_EXPIRES_IN=7d| GET | `/dashboard/activity` | Get activity feed |

BCRYPT_SALT_ROUNDS=12| GET | `/dashboard/compliance` | Get compliance metrics |

```

## � Deployment

### Available Scripts

```bash### Development

npm start        # Production server```bash

npm run dev      # Development with hot reloadnpm run dev    # Starts nodemon with hot reload

npm run db:init  # Initialize database schema```

npm run db:seed  # Populate demo data

npm run lint     # Run ESLint### Production

npm test         # Run Jest tests```bash

```npm start      # Starts production server

```

---

### Environment Variables

## 🔑 Demo CredentialsCreate a `.env` file:

```env

| Role | Email | Password |PORT=3000

|------|-------|----------|HOST=localhost

| **Admin** | admin@safety.com | Password123! |NODE_ENV=development

| **Manager** | manager@safety.com | Password123! |JWT_SECRET=your-super-secret-key

| **Supervisor** | supervisor@safety.com | Password123! |JWT_EXPIRES_IN=7d

| **Employee** | employee@safety.com | Password123! |CORS_ORIGIN=*

```

---risk-safety-app/

│

## 📁 Project Structure├── 📄 index.html           # Dashboard with metrics & activity feed

├── 📄 photos.html          # Photo upload & gallery management

```├── 📄 training.html        # Training modules & documents

risk-safety-app/├── 📄 report.html          # Incident reporting form

├── 📁 data/                    # SQLite database files├── 📄 about.html           # Company info & contact form

├── 📁 js/│

│   └── api.js                  # Frontend API client├── 🎨 styles.css           # Comprehensive stylesheet (1,500+ lines)

├── 📁 server/│   ├── CSS Custom Properties (50+ design tokens)

│   ├── 📁 database/│   ├── Component styles (21 organized sections)

│   │   ├── init.js             # Database initialization│   ├── Dark mode theming

│   │   └── seed.js             # Demo data seeding│   └── Responsive breakpoints

│   ├── 📁 middleware/│

│   │   └── auth.js             # JWT authentication├── ⚡ script.js            # Application logic (~600 lines)

│   ├── 📁 routes/│   ├── Toast notification system

│   │   ├── auth.js             # Authentication routes│   ├── Form validation handlers

│   │   ├── users.js            # User management│   ├── Dark mode toggle

│   │   ├── incidents.js        # Incident CRUD│   ├── File upload processing

│   │   ├── photos.js           # Photo uploads│   └── UI interaction handlers

│   │   ├── training.js         # Training modules│

│   │   ├── documents.js        # Document management├── 🖼️ hero-img.jpg         # Hero section background

│   │   └── dashboard.js        # Analytics└── 📖 README.md            # Documentation

│   ├── 📁 utils/```

│   │   └── logger.js           # Winston logging

│   └── index.js                # Express server entry## � Getting Started

├── 📁 uploads/                 # File upload storage

├── 📄 index.html               # Main dashboard### Prerequisites

├── 📄 login.html               # Authentication page

├── 📄 admin.html               # Admin panel- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

├── 📄 report.html              # Incident reporting- No build tools, package managers, or server required

├── 📄 photos.html              # Photo gallery

├── 📄 training.html            # Training center### Quick Start

├── 📄 about.html               # About page

├── 📄 styles.css               # Global styles```bash

├── 📄 script.js                # Frontend logic# Clone the repository

├── 📄 package.json             # Dependenciesgit clone https://github.com/Bgranillo101/risk-safety-app.git

└── 📄 .env.example             # Environment template

```# Navigate to project directory

cd risk-safety-app

---

# Open in browser (macOS)

## 🔒 Security Featuresopen index.html



- **Helmet.js** - Sets secure HTTP headers# Or start a local server for development

- **Rate Limiting** - 100 requests per 15 minutes per IPpython -m http.server 8000

- **CORS Protection** - Configurable origin whitelist```

- **Password Hashing** - bcrypt with 12 salt rounds

- **JWT Tokens** - Short-lived access tokens with refresh capability### Development Server Options

- **Input Validation** - Request sanitization and validation

- **SQL Injection Prevention** - Parameterized queries```bash

- **File Upload Validation** - MIME type and size restrictions# Python 3

python -m http.server 8000

---

# Node.js

## 📈 Future Enhancementsnpx serve -p 8000



- [ ] WebSocket integration for real-time notifications# PHP

- [ ] Email notifications for critical incidentsphp -S localhost:8000

- [ ] PDF report generation

- [ ] Mobile-responsive PWA conversion# VS Code: Use "Live Server" extension

- [ ] Two-factor authentication (2FA)```

- [ ] Integration with external compliance APIs

- [ ] Data visualization with Chart.js## 🏗️ Architecture

- [ ] Automated backup and recovery

### CSS Architecture

---

The stylesheet follows a **scalable component-based architecture** with clear separation of concerns:

## 👨‍💻 Developer

```

**Solo Full-Stack Development Project**styles.css

│

*This application was independently designed, developed, and deployed as a demonstration of comprehensive software engineering capabilities including:*├── 1. Design Tokens          # CSS custom properties for theming

├── 2. Base & Reset           # Normalize and base element styles

- Full-stack JavaScript/Node.js development├── 3. Typography             # Font families, sizes, weights

- RESTful API design and implementation├── 4. Layout Components      # Navbar, footer, sections

- Database schema design and management├── 5. UI Components          # Cards, buttons, badges, forms

- Authentication and security best practices├── 6. Page-Specific          # Dashboard, photos, training, report

- Responsive frontend development├── 7. Utilities              # Helper classes

- Version control and deployment workflows├── 8. Dark Mode              # Theme overrides (300+ lines)

└── 9. Media Queries          # Responsive breakpoints

---```



## 📄 License### JavaScript Architecture



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.Modular vanilla JavaScript with **no external dependencies**:



---```javascript

// Module Pattern Structure

<div align="center">├── initApp()               // Application bootstrap

├── initDarkMode()          // Theme management

**Built with ❤️ using modern web technologies**├── initToastSystem()       // Notification handling

├── initFormValidation()    // Form handlers

*Demonstrating enterprise-grade application development practices*├── initPhotoUpload()       // File processing

├── initScrollEffects()     // UI animations

</div>└── initBackToTop()         // Navigation helper

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
