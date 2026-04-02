# BlinkEye Project - Comprehensive Audit Report

**Project Name:** BlinkEye - Multi-Tenant Hospital Management Platform  
**Audit Date:** March 18, 2026  
**Auditor:** Project Analysis

---

## 1. Executive Summary

BlinkEye is a **multi-tenant hospital management and web platform** that enables hospitals to have their own dedicated web presence through subdomains or custom domains. The system consists of two main components:

1. **Blink_eye** - Laravel Backend (Admin Panel + API)
2. **hospital-frontend** - React Frontend (Public Website)

This is a sophisticated SaaS platform that allows hospital administrators to manage their content while patients can discover hospitals, view services, browse doctors, and book appointments.

---

## 2. Project Architecture Overview

### 2.1 Technology Stack

#### Backend (Blink_eye)
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Laravel | 12.0 |
| PHP | PHP | ^8.2 |
| Server-Side Rendering | Inertia.js | ^2.0 |
| Frontend (Admin) | Vue.js | 3.5+ |
| Authentication | Laravel Sanctum | ^4.0 |
| Database | SQLite | - |
| CSS Framework | Tailwind CSS | 3.2+ |
| Rich Text Editor | Tiptap | ^3.20.0 |
| Maps | Leaflet | ^1.9.4 |

#### Frontend (hospital-frontend)
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React | 19.2+ |
| Build Tool | Vite | 8.0 |
| Routing | React Router DOM | 7.13+ |
| HTTP Client | Axios | ^1.13.6 |
| CSS Framework | Tailwind CSS | 3.4+ |
| Animations | Framer Motion | 12.36+ |
| Icons | Lucide React | 0.577+ |

---

## 3. Complete Workflow Explanation

### 3.1 High-Level Architecture

The project follows a **client-server architecture** where the React frontend communicates with the Laravel backend via REST APIs.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                  │
│                                                                      │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│   │  Main Site      │    │  Subdomain       │    │  Custom      │  │
│   │  blinkeye.com   │    │  amritsar.       │    │  Domain      │  │
│   │                 │    │  blinkeye.com    │    │  myhopital.com│ │
│   └────────┬────────┘    └────────┬────────┘    └──────┬──────┘  │
│            │                       │                      │          │
└────────────┼───────────────────────┼──────────────────────┼──────────┘
             │                       │                      │
             ▼                       ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   hospital-frontend (React + Vite)                   │
│                                                                      │
│   1. Detects URL (subdomain/path/domain)                            │
│   2. Extracts hospital identifier                                   │
│   3. Calls API: getTenantConfig() or getHospitalBySlug()            │
│   4. Receives JSON with hospital data                              │
│   5. Renders page with hospital-specific content                   │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    API Call (Axios)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Blink_eye API (Laravel 12)                        │
│                                                                      │
│   Controllers:                                                       │
│   - WebEngineController (Public API)                                │
│   - Frontend Controllers (Server-rendered pages)                   │
│   - Admin Controllers (Dashboard & CRUD)                          │
│                                                                      │
│   Middleware:                                                        │
│   - IdentifyHospitalByDomain (Multi-tenant detection)              │
│   - CheckAdminRole (Admin access control)                          │
| [`Location`](app/Models/Location.php) | Geographic locations (hierarchical) |
| [`Appointment`](app/Models/Appointment.php) | Patient appointments |
| [`Lead`](app/Models/Lead.php) | Marketing leads |
| [`Blog`](app/Models/Blog.php) | Dynamic blog/content pages |
| [`Review`](app/Models/Review.php) | Hospital reviews |
| [`User`](app/Models/User.php) | Admin users |
| [`SeoMetadata`](app/Models/SeoMetadata.php) | SEO configuration (polymorphic) |
| Gallery Models | Hospital, Service, Disease, Blog galleries |

#### Key Controllers

**Admin Controllers** (`app/Http/Controllers/Admin/`)
- [`DashboardController`](app/Http/Controllers/Admin/DashboardController.php) - Admin dashboard
- [`HospitalController`](app/Http/Controllers/Admin/HospitalController.php) - Hospital CRUD
- [`DoctorController`](app/Http/Controllers/Admin/DoctorController.php) - Doctor management
- [`ServiceController`](app/Http/Controllers/Admin/ServiceController.php) - Services management
- [`DiseaseController`](app/Http/Controllers/Admin/DiseaseController.php) - Diseases management
- [`LocationController`](app/Http/Controllers/Admin/LocationController.php) - Location management
- [`AppointmentController`](app/Http/Controllers/Admin/AppointmentController.php) - Appointments
- [`LeadController`](app/Http/Controllers/Admin/LeadController.php) - Lead management
- [`BlogGalleryController`](app/Http/Controllers/Admin/BlogGalleryController.php) - Blog media
- [`TemplateController`](app/Http/Controllers/Admin/TemplateController.php) - Page templates
- [`GroupController`](app/Http/Controllers/Admin/GroupController.php) - Content grouping
- [`ReviewController`](app/Http/Controllers/Admin/ReviewController.php) - Reviews management

**API Controllers** (`app/Http/Controllers/Api/`)
- [`WebEngineController`](app/Http/Controllers/Api/WebEngineController.php) - Public API for frontend

**Frontend Controllers** (`app/Http/Controllers/Frontend/`)
- [`PageController`](app/Http/Controllers/Frontend/PageController.php) - Dynamic page rendering
- [`HospitalController`](app/Http/Controllers/Frontend/HospitalController.php) - Hospital pages
- [`SearchController`](app/Http/Controllers/Frontend/SearchController.php) - Search functionality
- [`AppointmentController`](app/Http/Controllers/Frontend/AppointmentController.php) - Appointment booking
- [`LocationPageController`](app/Http/Controllers/Frontend/LocationPageController.php) - Location pages
- [`SitemapController`](app/Http/Controllers/Frontend/SitemapController.php) - SEO sitemaps

#### API Endpoints (WebEngine)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/web-engine/test` | GET | API connectivity test |
| `/api/web-engine/hospitals` | GET | List all hospitals |
| `/api/web-engine/hospital/{slug}` | GET | Get hospital by slug |
| `/api/web-engine/tenant-config` | GET | Get tenant by subdomain/domain |
| `/api/web-engine/hospital/{id}/details` | GET | Get hospital details |
| `/api/web-engine/hospital/{id}/doctors` | GET | Get hospital doctors |
| `/api/web-engine/hospital/{id}/services` | GET | Get hospital services |
| `/api/web-engine/hospital/{id}/diseases` | GET | Get hospital diseases |
| `/api/web-engine/seo-metadata` | GET | Get SEO metadata |
| `/api/web-engine/diseases` | GET | List all diseases |
| `/api/web-engine/diseases/{slug}` | GET | Get disease by slug |
| `/api/web-engine/blogs` | GET | List all blogs |
| `/api/web-engine/blogs/{slug}` | GET | Get blog by slug |

#### Database Migrations (37 migration files)
- Users, Cache, Jobs (Laravel defaults)
- Core: Diseases, Locations, Services, Groups
- Hospital: Hospitals, Hospital Galleries
- Content: Blogs, Blog Groups, Content Sections
- Staff: Doctors
- Patient: Appointments, Leads
- Reviews: Reviews
- SEO: SEO Metadata
- Gallery: Service, Disease, Blog galleries
- Performance: Indexes
- Settings: Hospital settings, web engine fields, dynamic fields

---

### 3.2 hospital-frontend (React Frontend)

#### Directory Structure
```
hospital-frontend/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # Reusable React components
│   │   ├── DoctorCard.jsx   # Doctor profile card
│   │   ├── Footer.jsx       # Site footer
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   └── ServiceCard.jsx # Service card component
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── About.jsx        # About page
│   │   ├── Services.jsx    # Services listing
│   │   ├── Doctors.jsx      # Doctors listing
│   │   ├── Contact.jsx      # Contact form
│   │   └── BookAppointment.jsx # Appointment booking
│   ├── services/
│   │   └── api.js           # API client (Axios)
│   ├── utils/
│   │   └── subdomain.js     # Subdomain detection utility
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Public assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

#### Pages (6 Pages)
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page |
| About | `/about` | About the hospital |
| Services | `/services` | List of medical services |
| Doctors | `/doctors` | Doctor directory |
| Contact | `/contact` | Contact form |
| BookAppointment | `/book-appointment` | Appointment booking form |

---

## 4. Multi-Tenant Architecture

### 4.1 Domain-Based Tenant Identification

The system supports **three types of hospital identification**:

1. **Subdomain-based** (e.g., `amritsar.blinkeye.com`)
2. **Custom Domain** (e.g., `hospitalname.com`)
3. **Path-based** (e.g., `blinkeye.com/blink-eye-hospital-mohali`)

### 4.2 Tenant Identification Flow

```
User Request
    │
    ▼
IdentifyHospitalByDomain Middleware
    │
    ├── Check if main domain (blinkeye.com)
    │       └── Load main site content
    │
    ├── Check subdomain (e.g., amritsar.blinkeye.com)
    │       └── Load hospital by subdomain
    │
    ├── Check custom domain
    │       └── Load hospital by custom_domain
    │
    └── Check path-based (e.g., /blink-eye-hospital-mohali)
            └── Load hospital by slug
```

### 4.3 Middleware Implementation

[`IdentifyHospitalByDomain`](app/Http/Middleware/IdentifyHospitalByDomain.php) middleware:
- Identifies hospital from URL
- Loads related data (location, services, doctors)
- Sets hospital context for the request
- Shares SEO metadata across the application

---

## 5. Workflow & Data Flow

### 5.1 User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER VISITS WEBSITE                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              hospital-frontend (React App)                       │
│  1. Detects subdomain/path                                      │
│  2. Calls API: getTenantConfig() or getHospitalBySlug()          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ API Call
┌─────────────────────────────────────────────────────────────────┐
│              Blink_eye API (Laravel)                            │
│  WebEngineController::getTenantConfig()                         │
│  - Query hospital by subdomain/domain/slug                      │
│  - Return hospital data with relations                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ JSON Response
┌─────────────────────────────────────────────────────────────────┐
│              hospital-frontend (React App)                       │
│  - Render page with hospital-specific content                   │
│  - Show services, doctors, galleries                             │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Appointment Booking Flow

```
┌─────────────────────────────────────────────────────────────────┐
│            User clicks "Book Appointment"                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            BookAppointment Page (React)                         │
│  - Select department/service                                    │
│  - Choose doctor (optional)                                     │
│  - Pick date and time                                           │
│  - Enter patient details                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ POST /api/appointments
┌─────────────────────────────────────────────────────────────────┐
│            AppointmentController (Laravel)                    │
│  - Validate request                                             │
│  - Create appointment record                                   │
│  - Send notification (if configured)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Admin views in Dashboard                              │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Admin Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│            Admin logs into /admin                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Laravel Breeze Auth (Inertia + Vue)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            Admin Dashboard                                      │
│  - View statistics                                              │
│  - Manage hospitals, doctors, services, etc.                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Key Features

### 6.1 Hospital Management
- Multi-tenant architecture with subdomain support
- Custom domain configuration
- Hospital profile with complete details
- Gallery management
- Working hours and emergency services
- Social media links

### 6.2 Content Management
- **Dynamic Page Templates** - Generate pages from templates
- **Blog System** - Group-based content organization
- **SEO Support** - Meta tags, Open Graph, sitemaps
- **Content Sections** - Modular content blocks

### 6.3 Doctor Management
- Doctor profiles with qualifications
- Specializations and services
- Photo galleries
- Availability scheduling

### 6.4 Patient Features
- Service browsing
- Doctor directory
- Appointment booking
- Contact forms
- Lead capture

### 6.5 Search & Discovery
- Hospital search
- Location-based filtering
- Service-based filtering
- Disease-based search

---

## 7. Security Features

1. **Authentication** - Laravel Sanctum with Breeze
2. **Role-based Access** - Admin role middleware
3. **CSRF Protection** - Built-in Laravel
4. **SQL Injection Prevention** - Eloquent ORM
5. **XSS Prevention** - Blade escaping
6. **API Authentication** - Token-based

---

## 8. Performance Considerations

### 8.1 Implemented Optimizations
- Database indexes on frequently queried fields
- Eager loading of relationships
- Caching configuration
- Lazy loading for galleries

### 8.2 Recommendations
- Implement Redis for caching
- Add queue workers for heavy tasks
- Consider CDN for static assets
- Implement pagination for large lists

---

## 9. Current Development Status

### 9.1 Completed Features
- [x] Multi-tenant hospital system
- [x] Admin panel (Laravel + Inertia + Vue)
- [x] Public API (WebEngine)
- [x] React frontend for hospitals
- [x] Doctor management
- [x] Service management
- [x] Disease management
- [x] Location hierarchy
- [x] Appointment booking
- [x] Lead capture
- [x] Review system
- [x] SEO tools
- [x] Blog system
- [x] Dynamic page generation

### 9.2 Known Issues (from analysis) - ALL FIXED
- [x] Some route files may have syntax issues - FIXED
- [x] Lead submission endpoint needs verification - FIXED  
- [x] Search functionality needs testing - VERIFIED

---

## 9.3 Bugs Found and Fixed (March 24, 2026)

### Bug #1: Missing `getAllDiseases` method in WebEngineController
- **Severity:** CRITICAL
- **Issue:** Frontend calls `/api/web-engine/diseases` but the controller method didn't exist
- **Status:** FIXED - Added `getAllDiseases()` method to WebEngineController
- **File:** `Blink_eye/app/Http/Controllers/Api/WebEngineController.php`

### Bug #2: Missing `getDiseaseBySlug` method in WebEngineController
- **Severity:** CRITICAL  
- **Issue:** Route existed (`/api/web-engine/diseases/{slug}`) but controller method was missing
- **Status:** FIXED - Added `getDiseaseBySlug($slug)` method to WebEngineController
- **File:** `Blink_eye/app/Http/Controllers/Api/WebEngineController.php`

### Bug #3: LeadController returns redirect instead of JSON
- **Severity:** CRITICAL
- **Issue:** API calls expect JSON response but LeadController was returning redirect
- **Status:** FIXED - Modified store method to check for AJAX/JSON requests and return proper JSON response
- **File:** `Blink_eye/app/Http/Controllers/Admin/LeadController.php`

### Bug #4: Missing hospital diseases API route
- **Severity:** CRITICAL
- **Issue:** Frontend calls `/api/web-engine/hospital/{hospitalId}/diseases` but route was not defined
- **Status:** FIXED - Added route to api.php (controller method already existed)
- **File:** `Blink_eye/routes/api.php`

---

## 10. File Statistics

| Metric | Count |
|--------|-------|
| Laravel Models | 19 |
| Admin Controllers | 12 |
| API Controllers | 1 |
| Frontend Controllers | 6 |
| Database Migrations | 37 |
| React Pages | 6 |
| React Components | 5 |

---

## 11. Conclusion

BlinkEye is a **well-structured multi-tenant hospital management platform** with:

- **Clear separation** between admin and public-facing features
- **Scalable architecture** supporting multiple hospitals
- **Modern tech stack** (Laravel 12, React 19, Inertia.js)
- **Comprehensive features** for hospital management
- **API-first approach** for frontend flexibility

The system follows Laravel best practices with proper MVC architecture, middleware for cross-cutting concerns, and service classes for business logic.

---

*End of Audit Report*
