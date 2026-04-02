# Blik Eye Project - Comprehensive Architecture Analysis

## Project Overview

**Blik Eye** is a healthcare/medical platform built with Laravel 12 + Inertia + Vue.js 3. It's designed to manage a network of eye hospitals, create SEO-optimized landing pages using dynamic templates, and capture patient leads at scale.

### Tech Stack
- **Backend**: Laravel 12
- **Frontend**: Vue.js 3 with Inertia.js
- **Styling**: Tailwind CSS
- **Editor**: TipTap (WYSIWYG)
- **Build Tool**: Vite

## Core Features and Modules

### 1. Doctor Management (CRUD + Images + Slugs)

#### Models
- **File**: [`app/Models/Doctor.php`](app/Models/Doctor.php)
- **Fields**:
  - `id`, `name`, `specialty`, `bio`, `hospital_id`, `is_active`, `image`, `slug`
- **Relationships**: Belongs to Hospital
- **Key Features**:
  - Auto-generates slug from name on create/update
  - Supports image uploads (public disk storage)
  - Active/inactive status management

#### Controllers
- **File**: [`app/Http/Controllers/Admin/DoctorController.php`](app/Http/Controllers/Admin/DoctorController.php)
- **Endpoints**:
  - `GET /admin/doctors` - List all doctors with pagination (20 per page)
  - `GET /admin/doctors/create` - Show create form with active hospitals dropdown
  - `POST /admin/doctors` - Store new doctor with image upload
  - `GET /admin/doctors/{id}/edit` - Show edit form
  - `PUT/PATCH /admin/doctors/{id}` - Update doctor with image handling
  - `DELETE /admin/doctors/{id}` - Delete doctor and associated image

#### Frontend Pages
- **Index**: [`resources/js/Pages/Admin/Doctors/Index.vue`](resources/js/Pages/Admin/Doctors/Index.vue)
  - Data table with columns: Doctor Name, Specialty, Hospital, Status
  - Pagination support
  - Add Doctor button
  - Action buttons for editing

- **Create**: [`resources/js/Pages/Admin/Doctors/Create.vue`](resources/js/Pages/Admin/Doctors/Create.vue)
- **Edit**: [`resources/js/Pages/Admin/Doctors/Edit.vue`](resources/js/Pages/Admin/Doctors/Edit.vue)

#### Database Migrations
- **Initial Table**: `2026_02_24_095404_create_doctors_table.php`
- **Image Column**: `2026_03_05_082500_add_image_to_doctors_table.php`
- **Slug Column**: `2026_03_05_093300_add_slug_to_doctors_table.php` (unique index)

### 2. Review Management

#### Models
- **File**: [`app/Models/Review.php`](app/Models/Review.php)
- **Fields**:
  - `id`, `hospital_id`, `author_name`, `rating`, `content`, `source`, `created_at`, `updated_at`
- **Source Options**: 'google', 'internal', 'healthgrades' (default: 'internal')
- **Rating Range**: 1-5 stars

#### Controllers
- **File**: [`app/Http/Controllers/Admin/ReviewController.php`](app/Http/Controllers/Admin/ReviewController.php)
- **Endpoints**:
  - `GET /admin/reviews` - List reviews for current hospital (15 per page)
  - `GET /admin/reviews/create` - Show create form
  - `POST /admin/reviews` - Store new review (hospital_id from authenticated user)
  - `GET /admin/reviews/{id}/edit` - Show edit form with authorization
  - `PUT/PATCH /admin/reviews/{id}` - Update review with authorization
  - `DELETE /admin/reviews/{id}` - Delete review with authorization

#### Frontend Pages
- **Index**: [`resources/js/Pages/Admin/Reviews/Index.vue`](resources/js/Pages/Admin/Reviews/Index.vue)
  - Table with columns: Author, Rating, Source, Content, Date, Actions
  - Star rating display (1-5 stars)
  - Edit and Delete buttons
  - Pagination support

- **Create**: [`resources/js/Pages/Admin/Reviews/Create.vue`](resources/js/Pages/Admin/Reviews/Create.vue)
- **Edit**: [`resources/js/Pages/Admin/Reviews/Edit.vue`](resources/js/Pages/Admin/Reviews/Edit.vue)

#### Database Migrations
- **File**: `2026_02_24_095404_create_reviews_table.php`

### 3. Search Functionality

#### Controller
- **File**: [`app/Http/Controllers/Frontend/SearchController.php`](app/Http/Controllers/Frontend/SearchController.php)

##### Search API
- **Endpoint**: `GET /api/search`
- **Parameters**: `q` (search query, min 2 characters)
- **Returns**: JSON with results and suggested pages
- **Search Entities**:
  - Diseases (name matching)
  - Services (name matching)
  - Locations (name matching)
  - Hospitals (name matching)

##### Smart Page Generation
- **Method**: `generatePageSuggestions()`
- **Logic**:
  1. Gets all active templates (Blogs) with their associated groups
  2. Checks which shortcodes are used in each template
  3. Matches search results against allowed items in template groups
  4. Generates URL combinations by replacing shortcodes with matching entities
  5. Limits to 6 suggestions to avoid explosion

##### All Pages API
- **Endpoint**: `GET /api/pages`
- **Parameters**: `hospital_id`, `location_id` (optional)
- **Returns**: All possible dynamic page URLs from templates
- **Features**:
  - Filters blogs by hospital context
  - Filters locations by location context (includes nearby areas)
  - Generates complete list of SEO page URLs

### 4. Template Engine

#### Service
- **File**: [`app/Services/TemplateEngineService.php`](app/Services/TemplateEngineService.php)

##### Rendering Engine
- **Method**: `render($template, $context)`
- **Context Variables**:
  - `location`: City, District, State names
  - `hospital`: Hospital name, nearest branch, phone, distance
  - `disease`: Disease name
  - `service`: Service name

##### Shortcode Support
```php
// Location variables
{{city_name}}           // Current location name
{{district_name}}       // Parent district name
{{state_name}}          // Grandparent state name

// Hospital variables
{{nearest_branch}}      // Nearest hospital name
{{hospital_name}}       // Hospital name
{{local_phone}}         // Hospital phone number
{{distance_from_user}}  // Distance from user (km)

// Disease variables
{{disease_name}}        // Disease name

// Service variables
{{service_name}}        // Service name
```

### 5. Hospital/Domain Identification

#### Middleware
- **File**: [`app/Http/Middleware/IdentifyHospitalByDomain.php`](app/Http/Middleware/IdentifyHospitalByDomain.php)

##### Identification Logic
- **Applied to all frontend routes globally**
- **Host Detection**: Extracts host from request
- **Main Site Check**: Skips identification for localhost, 127.0.0.1, and config('app.domain')
- **Hospital Matching**:
  1. First tries exact domain match
  2. Then tries subdomain match
  3. If found, loads hospital's location and sets context

##### Context Sharing
- Sets `current_hospital` attribute on request
- Shares via Laravel container instance
- Shares via Inertia for frontend access

### 6. SEO and Optimization Services

#### SEO Service
- **File**: [`app/Services/SeoService.php`](app/Services/SeoService.php)

##### Schema Generation
1. **MedicalOrganization Schema**: For hospital organizational information
2. **LocalBusiness Schema**: For hospital branch details (MedicalClinic type)
3. **FAQ Schema**: For FAQ sections

##### Template Compilation
- **Method**: `compileTemplate($template, $data)`
- **Supported Shortcodes**:
  ```php
  {{date.year}}           // Current year
  
  {{location.name}}       // Location name
  {{location.type}}       // Location type (city, district, state)
  {{location.slug}}       // Location slug
  
  {{hospital.name}}       // Hospital name
  {{hospital.phone}}      // Hospital phone
  {{hospital.address}}    // Hospital address
  
  {{disease.name}}        // Disease name
  {{disease.slug}}        // Disease slug
  
  {{service.name}}        // Service name
  {{service.slug}}        // Service slug
  ```

#### Sitemap Controller
- **File**: [`app/Http/Controllers/Frontend/SitemapController.php`](app/Http/Controllers/Frontend/SitemapController.php)
- **Endpoint**: `GET /sitemap.xml`
- **Features**:
  - Generates XML sitemap for search engines
  - Includes static homepage (priority 1.0, daily)
  - Includes all dynamic SEO pages (priority 0.8, weekly)
  - Handles template shortcode replacement
  - Formats dates in W3C format

### 7. Database Structure

#### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `doctors` | Doctor profiles | id, hospital_id, name, specialty, bio, image, slug, is_active |
| `reviews` | Patient reviews | id, hospital_id, author_name, rating, content, source |
| `hospitals` | Hospital branches | id, domain, subdomain, name, email, phone, location_id, lat, lng, image, is_active |
| `locations` | Hierarchical locations | id, parent_id, type, name, slug, lat, lng, pincode, seo_priority, is_active, image |
| `diseases` | Eye diseases | id, name, slug, description, is_active, image |
| `services` | Medical services | id, name, slug, description, is_active, image |
| `blogs` | Dynamic templates | id, title_template, content_template, slug_template, tenant_id, is_active |
| `groups` | Taxonomy groups | id, name, type, is_active |
| `group_items` | Group-item relationships | id, group_id, item_type, item_id |
| `leads` | Patient leads | id, name, phone, status, campaign_type, source_url, hospital_id, disease_id, location_id |
| `appointments` | Appointment bookings | id, user_id, hospital_id, doctor_id, appointment_date, appointment_time, patient_name, patient_phone, patient_email, notes, status |

#### Gallery Tables
- `hospital_galleries`: Hospital images
- `disease_galleries`: Disease images
- `service_galleries`: Service images
- `blog_galleries`: Template/blog images

### 8. Data Flow and Interactions

#### Frontend Routing Structure
- **Global Middleware**: IdentifyHospitalByDomain (applied to all routes)

##### Public Routes
```php
/                          # Homepage - context-aware dynamic content
/sitemap.xml              # SEO: XML sitemap
/api/search               # Search: Autocomplete API
/api/pages                # Search: All pages API
/book-appointment         # Appointment: Create form
/{slug}                   # Catch-all: Dynamic SEO pages (template rendering)
```

##### Admin Routes (Prefix: /admin)
```php
/dashboard                # Dashboard: Statistics and lead overview
/locations                # CRUD: Location management
/hospitals                # CRUD: Hospital management
/hospitals/{id}/gallery   # Gallery: Hospital images
/diseases                 # CRUD: Disease management
/diseases/{id}/gallery    # Gallery: Disease images
/services                 # CRUD: Service management
/services/{id}/gallery    # Gallery: Service images
/groups                   # CRUD: Taxonomy group management
/templates                # CRUD: Template management
/templates/{id}/gallery   # Gallery: Template images
/doctors                  # CRUD: Doctor management
/reviews                  # CRUD: Review management
/leads                    # Leads: Listing and status updates
/appointments             # Appointments: Listing and management
```

#### Key Business Logic Services

1. **TemplateEngineService**: Renders dynamic templates with context data
2. **SeoService**: Generates SEO metadata and structured data
3. **LeadService**: Lead capture and nearest hospital detection
4. **AnalyticsService**: Tracks user behavior
5. **ComplianceService**: Ensures regulatory compliance
6. **OptimizationService**: Performance optimization

### 9. Frontend Components and Pages

#### Admin Panel Layout
- **Layout**: [`resources/js/Layouts/AdminLayout.vue`](resources/js/Layouts/AdminLayout.vue)
- **Shared Components**: DataTable, Badge, Forms

#### Public Pages
- **Welcome**: [`resources/js/Pages/Welcome.vue`](resources/js/Pages/Welcome.vue)
  - Homepage with featured blogs
  - Location, disease, and service quick links
  - Hospital branches listing
  - Search functionality

#### Template Builder
- **File**: [`resources/js/Pages/Admin/Templates/Builder.vue`](resources/js/Pages/Admin/Templates/Builder.vue)
- **Features**: WYSIWYG editor (TipTap)
- **Template Preview**
- **Gallery management**
- **Shortcode support**

### 10. Role-Based Access Control

#### User Roles
- **Super Admin**: Full system access (all hospitals)
- **Hospital Manager**: Restricted access to their hospital's data

#### Middleware
- **CheckAdminRole**: Validates admin access to admin routes
- **IdentifyHospitalByDomain**: Handles context detection for hospital managers

### 11. Key Features Status

#### Completed Features
- ✅ Dynamic template system with WYSIWYG editor
- ✅ SEO page generation with shortcode support
- ✅ Complete content management (locations, hospitals, diseases, services, groups)
- ✅ Doctor management (CRUD, images, slugs)
- ✅ Review management (CRUD, ratings)
- ✅ Lead management (capture, filtering, status updates)
- ✅ User authentication and role-based permissions
- ✅ Search functionality (autocomplete, smart suggestions)
- ✅ SEO features (XML sitemap, JSON-LD, meta tags)
- ✅ Hospital/domain identification
- ✅ Gallery management for all models

#### Incomplete Features
- ⚠️ Doctor profile pages on frontend
- ⚠️ Review display on public pages
- ⚠️ Appointment booking workflow
- ⚠️ AI content generation (button exists, not implemented)
- ⚠️ Advanced analytics dashboard
- ⚠️ Payment integration
- ⚠️ Cloud storage for images

### 12. Architecture Strengths

1. **Template System**: Dynamic content generation at scale
2. **SEO Optimization**: Comprehensive SEO features built-in
3. **Multi-Tenant Support**: Hospital-specific content and subdomains
4. **Role-Based Access**: Granular permissions for admins and managers
5. **Hierarchical Locations**: Flexible location management system
6. **Clean Architecture**: Separation of concerns with services and controllers
7. **Context-Aware Rendering**: Content adapts to hospital and location context
8. **Scalable Search**: Smart URL generation from templates

### 13. Areas for Improvement

1. **Complete Doctor System**: Add frontend doctor profile pages and search integration
2. **Reviews Display**: Show reviews on hospital and doctor pages
3. **Appointment Workflow**: Implement complete booking and management system
4. **AI Content Generation**: Integrate actual AI service
5. **Cloud Storage**: Add AWS S3 or similar for image uploads
6. **Analytics Dashboard**: More detailed metrics and reporting
7. **Caching**: Improve performance with Redis caching
8. **Payment Integration**: Support online payments for appointments
9. **Doctors Search**: Add doctors to search functionality and page suggestions
10. **Advanced Filtering**: Enhanced search and filtering capabilities

## Conclusion

Blik Eye is a well-structured healthcare marketing platform with a strong focus on SEO and multi-tenant management. The core architecture is clean and extensible, with clear separation between backend services, frontend components, and business logic. The dynamic template system is the standout feature, allowing for scalable SEO page generation.

The recent additions of doctor and review management further enhance the platform's capabilities, making it a comprehensive solution for managing eye hospital networks.
