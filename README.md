# PGH Risk & Safety

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License">
</p>

<p align="center">
  <strong>Enterprise-grade workplace safety management platform</strong><br>
  Incident reporting • Training compliance • Photo documentation • Real-time analytics
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-architecture">Architecture</a>
</p>

---

## 📋 Overview

PGH Risk & Safety is a comprehensive web application designed for independent safety consultants and enterprise organizations to manage workplace safety operations. The platform streamlines incident reporting, training compliance tracking, and safety documentation with an intuitive, accessible interface.

**Key Business Value:**
- 📉 Reduce incident response time with streamlined reporting workflows
- 📊 Maintain OSHA compliance with automated training tracking
- 📸 Document site conditions with organized photo management
- 🔄 Enable real-time safety metrics visibility across teams

## 🎬 Live Demo

> **[View Live Application →](https://bgranillo101.github.io/risk-safety-app/)**

| Page | Description |
|------|-------------|
| [Dashboard](https://bgranillo101.github.io/risk-safety-app/index.html) | Safety metrics & activity overview |
| [Photos](https://bgranillo101.github.io/risk-safety-app/photos.html) | Drag-and-drop photo documentation |
| [Training](https://bgranillo101.github.io/risk-safety-app/training.html) | Module progress & certifications |
| [Report](https://bgranillo101.github.io/risk-safety-app/report.html) | Incident reporting form |
| [About](https://bgranillo101.github.io/risk-safety-app/about.html) | Contact & company information |

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Dashboard
- Real-time safety KPI metrics
- Activity feed with timestamped events
- Quick-action navigation cards
- Responsive metric visualizations

### 📸 Photo Documentation
- Drag-and-drop file upload
- Client-side image validation
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
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Framework** | Bootstrap 5.3.0 |
| **Icons** | Font Awesome 6.4.0 |
| **Typography** | Google Fonts (Poppins, Inter) |
| **Version Control** | Git, GitHub |
| **Deployment** | GitHub Pages |

## 📁 Project Structure

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
