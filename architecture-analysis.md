# Project Architecture Analysis

## Overview

This is a **Laravel + Inertia + Vue.js** application for managing a network of eye hospitals. The project focuses on creating SEO-optimized landing pages using dynamic templates, managing hospital locations, services, diseases, and capturing patient leads.

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: Vue.js 3 with Inertia.js
- **Styling**: Tailwind CSS
- **Editor**: TipTap (WYSIWYG)
- **Build Tool**: Vite

## Project Structure

### Key Directories

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/       # Admin panel controllers
│   │   ├── Auth/        # Authentication controllers
│   │   └── Frontend/    # Frontend page controllers
│   ├── Middleware/      # Custom middleware (IdentifyHospitalByDomain, CheckAdminRole)
│   └── Requests/        # Form request validation
├── Models/              # Eloquent models
├── Services/            # Business logic services
└── Traits/              # Reusable traits

database/
├── migrations/          # Database migration files
├── seeders/             # Database seeders
└── factories/           # Model factories

resources/
└── js/
    ├── Pages/           # Vue.js pages (Inertia components)
    │   ├── Admin/       # Admin panel pages
    │   ├── Frontend/    # Public frontend pages
    │   └── Auth/        # Authentication pages
    ├── Components/      # Reusable Vue components
    └── Layouts/         # Page layouts (AdminLayout, AuthenticatedLayout)
```

## Database Schema

### Core Models and Relationships

#### 1. **Hospital**
- Represents a hospital branch
- Fields: id, name, domain, subdomain, email, phone, is_active, lat, lng, location_id, image
- Relationships:
  - `location()`: Belongs to Location
  - `galleries()`: Has many HospitalGallery

#### 2. **Location**
- Hierarchical location structure (state → district → city → village)
- Fields: id, parent_id, type, name, slug, lat, lng, pincode, population, seo_priority, is_active, image
- Relationships:
  - `parent()`: Belongs to Location (self-referential)
  - `children()`: Has many Location
  - `groups()`: MorphToMany with Group

#### 3. **Disease**
- Eye diseases treated by hospitals
- Fields: id, name, slug, description, is_active, image
- Relationships:
  - `groups()`: MorphToMany with Group
  - `galleries()`: Has many DiseaseGallery

#### 4. **Service**
- Medical services offered by hospitals
- Fields: id, name, slug, description, is_active, image
- Relationships:
  - `groups()`: MorphToMany with Group
  - `galleries()`: Has many ServiceGallery

#### 5. **Blog (Template)**
- Dynamic template for generating SEO pages
- Fields: id, title_template, content_template, slug_template, tenant_id, is_active
- Relationships:
  - `groups()`: BelongsToMany with Group
  - `galleries()`: Has many BlogGallery

#### 6. **Group & GroupItem**
- Taxonomy groups for organizing content
- Fields:
  - Group: id, name, type, is_active
  - GroupItem: id, group_id, item_type, item_id
- Relationships:
  - `items()`: Has many GroupItem
  - `blogs()`: BelongsToMany with Blog

#### 7. **Lead**
- Captured patient leads from SEO pages
- Fields: id, name, phone, status, campaign_type, source_url, hospital_id, disease_id, location_id
- Relationships:
  - `hospital()`: Belongs to Hospital
  - `disease()`: Belongs to Disease
  - `location()`: Belongs to Location

#### 8. **User**
- System users (super admin, hospital manager)
- Fields: id, name, email, password, role, hospital_id
- Roles: 'super_admin', 'hospital_manager'
- Relationships:
  - `hospital()`: Belongs to Hospital

#### 9. **Gallery Models**
- HospitalGallery: id, hospital_id, image_path, caption
- DiseaseGallery: id, disease_id, image_path, caption
- ServiceGallery: id, service_id, image_path, caption
- BlogGallery: id, blog_id, image_path, caption

## Key Features

### Frontend Features

1. **Dynamic SEO Pages**
   - Generated from Blog templates
   - URL patterns with shortcodes: `{{location.slug}}`, `{{service.slug}}`, `{{disease.slug}}`
   - Context-aware content rendering
   - Table of contents generation
   - SEO metadata (JSON-LD, meta tags, keywords)

2. **Homepage**
   - Featured blog pages with filters
   - Location, disease, and service quick links
   - Hospital branches listing
   - Search functionality

3. **Search System**
   - Autocomplete search
   - Smart URL generation from templates

4. **SEO Features**
   - XML sitemap generation
   - Structured data (JSON-LD) for medical pages
   - Meta description and keyword optimization

### Admin Panel Features

1. **Dashboard**
   - Lead statistics (total, new, converted)
   - Conversion rate calculation
   - Hospital-specific views for managers

2. **Content Management**
   - **Templates**: Create/Edit dynamic blog templates with WYSIWYG editor
   - **Taxonomy Groups**: Manage location, disease, and service groups
   - **Locations**: Hierarchical location management
   - **Hospitals**: Hospital branch management with galleries
   - **Diseases**: Eye disease information management
   - **Services**: Medical service information management

3. **Lead Management**
   - Lead listing with pagination
   - Status filtering and updates
   - Campaign type tracking

4. **User Roles**
   - **Super Admin**: Full system access
   - **Hospital Manager**: Restricted access to their hospital's data

## Services & Business Logic

### TemplateEngineService
- Renders dynamic templates with context data
- Supports shortcodes: `{{location.name}}`, `{{hospital.name}}`, `{{disease.name}}`, `{{service.name}}`
- Handles location hierarchy (city → district → state)

### SeoService
- Generates SEO metadata
- Creates structured data (JSON-LD) for Google
- Compiles templates with context data

### LeadService
- Lead capture and management
- Nearest hospital detection

### AnalyticsService
- Tracks user behavior and analytics

### ComplianceService
- Ensures compliance with regulations

### OptimizationService
- Performance optimization

## Middleware

### IdentifyHospitalByDomain
- Applied to all frontend routes
- Detects hospital from subdomain
- Sets `current_hospital` attribute on request

### CheckAdminRole
- Validates admin access for admin panel routes
- Handles role-based permissions

## Routes

### Frontend Routes
```php
/                          # Homepage with dynamic content
/sitemap.xml              # XML sitemap
/api/search               # Search API
/api/pages                # All pages API
/{slug}                   # Dynamic SEO pages (catch-all)
```

### Admin Routes (Prefix: /admin)
```php
/dashboard                # Admin dashboard
/locations                # CRUD for locations
/hospitals                # CRUD for hospitals
/hospitals/{id}/gallery   # Hospital gallery management
/diseases                 # CRUD for diseases
/diseases/{id}/gallery    # Disease gallery management
/services                 # CRUD for services
/services/{id}/gallery    # Service gallery management
/groups                   # CRUD for taxonomy groups
/templates                # CRUD for blog templates
/templates/{id}/gallery   # Template gallery management
/leads                    # Lead management
```

## Database Migration Status

### Completed Migrations
- `2026_02_24_095401_create_diseases_table.php` - Diseases table
- `2026_02_24_095401_create_locations_table.php` - Locations table
- `2026_02_24_095401_create_services_table.php` - Services table
- `2026_02_24_095402_create_groups_table.php` - Groups table
- `2026_02_24_095402_create_hospitals_table.php` - Hospitals table
- `2026_02_24_095403_create_blogs_table.php` - Blogs (templates) table
- `2026_02_24_095403_create_group_items_table.php` - Group items pivot table
- `2026_02_24_095404_create_blog_groups_table.php` - Blog groups pivot table
- `2026_03_04_110442_create_hospital_galleries_table.php` - Hospital galleries
- `2026_03_05_060000_create_service_galleries_table.php` - Service galleries
- `2026_03_05_060001_create_disease_galleries_table.php` - Disease galleries
- `2026_03_05_060002_create_blog_galleries_table.php` - Blog galleries

## Existing Features Completion Status

### Completed Features

✅ **Dynamic Template System**
- Template creation with WYSIWYG editor
- Shortcode support ({{location.name}}, {{hospital.name}}, etc.)
- Template preview and validation
- Gallery management for templates

✅ **SEO Page Generation**
- Catch-all route for dynamic pages
- URL matching with regex patterns
- Context-aware content rendering
- SEO metadata generation

✅ **Content Management**
- Locations: CRUD with hierarchy
- Hospitals: CRUD with galleries
- Diseases: CRUD with galleries
- Services: CRUD with galleries
- Groups: CRUD with item management

✅ **Lead Management**
- Lead capture from frontend
- Lead listing and filtering
- Status updates
- Role-based access

✅ **User System**
- Authentication (login/register)
- Role-based permissions
- Profile management

✅ **SEO Features**
- XML sitemap
- JSON-LD structured data
- Meta tags and keywords
- Search functionality

### Incomplete/Partial Features

⚠️ **Gallery Management**
- Galleries implemented for all models
- But images are stored as paths (no cloud storage integration)

⚠️ **AI Content Generation**
- Button exists but functionality not implemented
- "Future capability: Generate content via AI" message

⚠️ **Location Detection**
- Uses IP geolocation implicitly but not explicitly implemented
- Nearest hospital detection based on coordinates

⚠️ **Payment/Bookings**
- No payment or appointment booking system
- Leads are captured but no follow-up workflow

⚠️ **Reviews/Testimonials**
- Review model exists but no UI for submission or display

⚠️ **Doctors**
- Doctor model exists but no management interface

## Main Purpose of the Project

This is a **healthcare marketing platform** designed to:

1. **Generate SEO-optimized landing pages** at scale using dynamic templates
2. **Capture patient leads** from these landing pages
3. **Manage multiple hospital branches** and their content
4. **Organize medical content** by locations, diseases, and services
5. **Provide analytics** on lead generation and conversion rates

The system uses a **multi-tenant architecture** where hospitals can have their own subdomains with localized content.

## Architecture Strengths

1. **Template System**: Dynamic content generation at scale
2. **SEO Optimization**: Comprehensive SEO features built-in
3. **Multi-Tenant Support**: Hospital-specific content and subdomains
4. **Role-Based Access**: Granular permissions for admins and managers
5. **Hierarchical Locations**: Flexible location management system
6. **Clean Architecture**: Separation of concerns with services and controllers

## Areas for Improvement

1. **Complete Gallery System**: Add image optimization and cloud storage
2. **AI Content Generation**: Implement actual AI integration
3. **Booking System**: Add appointment scheduling and management
4. **Payment Integration**: Support for online payments
5. **Reviews System**: Implement patient review functionality
6. **Doctors Directory**: Complete doctor management system
7. **Analytics Dashboard**: More detailed analytics and reporting
8. **Caching**: Improve performance with caching strategies
