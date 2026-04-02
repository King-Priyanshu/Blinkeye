# Blik_eye Project - Key Findings

## Project Overview
Blik_eye is a **modern eye care hospital management platform** built with Laravel 12 and Vue 3. It serves both patients and hospital administrators through a clean, responsive interface.

## Core Domain
**Healthcare / Eye Care Services**
- Focused on providing information about eye diseases and services
- Connects patients with eye care professionals
- Streamlines hospital operations

## Architecture
### Backend
- **Laravel 12** with MVC + Service Layer architecture
- **PHP 8.2** for server-side logic
- **Inertia.js** for seamless Vue integration
- **SQLite** database (configurable)

### Frontend
- **Vue 3** with Composition API
- **Tailwind CSS 3** for styling
- **Inertia.js** for SSR and routing
- **Tiptap** for rich text editing

## Key Features

### Patient-Facing Features
1. **Dynamic SEO Pages**
   - Context-aware content based on location, disease, or service
   - URL patterns like `/delhi/cataract-treatment`
   - Related pages and table of contents
   - Schema markup for search engines

2. **Search & Navigation**
   - Search across locations, diseases, and services
   - Dynamic XML sitemap generation
   - Location-based filtering

3. **Lead Generation**
   - Lead capture forms on every page
   - Auto-detect nearest hospital
   - Campaign tracking for marketing

4. **Appointment Booking**
   - Multi-step booking process
   - Hospital and doctor selection
   - Date and time slot management
   - Patient information collection

### Admin Features
1. **Dashboard**
   - Overview stats: total leads, new leads, conversion rate, active locations
   - Role-based visibility (super admin vs hospital manager)

2. **Content Management**
   - Dynamic template editor with WYSIWYG
   - Image gallery management
   - Entity management (hospitals, doctors, services, diseases, locations)

3. **Lead Management**
   - Lead list with filtering and pagination
   - Status updates (new → contacted → converted → lost)
   - Campaign tracking

4. **Appointment Management**
   - Appointment list with filtering
   - Status updates
   - Rescheduling functionality
   - Patient information view

## Database Structure
Key entities and relationships:

```
User → has many Appointments
Hospital → has many Users (managers), Doctors, Leads, Appointments
Location → hierarchical (state → district → city → village)
Disease → related to Leads, can be grouped
Service → related to Leads, can be grouped
Doctor → belongs to Hospital, schedules Appointments
Lead → captured from frontend, has status
Appointment → scheduled by User, belongs to Hospital/Doctor
Blog (Template) → dynamic content with groups
Group → tags entities (polymorphic)
Gallery → images for hospitals, services, diseases, templates
```

## Technology Stack
- **Backend**: Laravel 12, PHP 8.2, SQLite
- **Frontend**: Vue 3, Inertia.js, Tailwind CSS, Vite
- **Authentication**: Laravel Sanctum
- **Icons**: Heroicons
- **Rich Text**: Tiptap editor

## Notable Characteristics
1. **Multi-Tenant Architecture**: Hospitals can have their own subdomains
2. **Location-Based Services**: Nearest hospital detection
3. **Dynamic Content Generation**: Template engine for SEO pages
4. **Role-Based Access Control**: Super Admin, Hospital Manager, Patient roles
5. **Responsive Design**: Mobile-first approach
6. **SEO Optimized**: Schema markup, dynamic sitemaps

## Future Enhancement Opportunities
1. Patient portal with medical records
2. Doctor dashboard with schedule management
3. Notification system (email/SMS)
4. Analytics and reporting
5. Telemedicine integration
6. Payment gateway
7. Patient reviews and ratings
8. Multi-language support

This platform is well-structured and designed to be scalable for small to medium-sized eye care chains, providing both patient-facing information and efficient hospital management tools.
