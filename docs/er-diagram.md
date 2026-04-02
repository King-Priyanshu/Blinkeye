# Blik_eye Entity-Relationship Diagram

## Database Schema Visualization

```mermaid
erDiagram
    USER {
        id PK
        name string
        email string
        phone string
        password string
        role string
        hospital_id int
    }
    
    HOSPITAL {
        id PK
        name string
        domain string
        subdomain string
        email string
        phone string
        location_id int
        lat decimal
        lng decimal
        image string
        is_active boolean
    }
    
    LOCATION {
        id PK
        parent_id int
        type string
        name string
        slug string
        lat decimal
        lng decimal
        pincode string
        population int
        seo_priority int
        is_active boolean
        image string
    }
    
    DISEASE {
        id PK
        name string
        slug string
        description text
        image string
        is_active boolean
    }
    
    SERVICE {
        id PK
        name string
        slug string
        description text
        image string
        is_active boolean
    }
    
    DOCTOR {
        id PK
        name string
        specialty string
        bio text
        hospital_id int
        image string
        slug string
        is_active boolean
    }
    
    LEAD {
        id PK
        hospital_id int
        disease_id int
        location_id int
        name string
        phone string
        source_url text
        campaign_type string
        status string
    }
    
    APPOINTMENT {
        id PK
        user_id int
        hospital_id int
        doctor_id int
        appointment_date date
        appointment_time time
        patient_name string
        patient_phone string
        patient_email string
        notes text
        reason string
        status string
    }
    
    BLOG {
        id PK
        title_template string
        content_template longtext
        slug_template string
        tenant_id int
        is_active boolean
    }
    
    GROUP {
        id PK
        name string
        type string
        is_active boolean
    }
    
    GROUP_ITEM {
        id PK
        group_id int
        item_id int
        item_type string
    }
    
    HOSPITAL_GALLERY {
        id PK
        hospital_id int
        image_path string
    }
    
    SERVICE_GALLERY {
        id PK
        service_id int
        image_path string
    }
    
    DISEASE_GALLERY {
        id PK
        disease_id int
        image_path string
    }
    
    BLOG_GALLERY {
        id PK
        blog_id int
        image_path string
    }
    
    USER ||--o{ APPOINTMENT : has
    HOSPITAL ||--o{ USER : "hospital manager"
    HOSPITAL ||--o{ DOCTOR : employs
    HOSPITAL ||--o{ LEAD : captures
    HOSPITAL ||--o{ APPOINTMENT : schedules
    LOCATION ||--o{ HOSPITAL : "has location"
    LOCATION ||--o{ LOCATION : parent
    DISEASE ||--o{ LEAD : "related to"
    LOCATION ||--o{ LEAD : "from location"
    GROUP ||--|{ GROUP_ITEM : contains
    GROUP_ITEM }|--|| DISEASE : "morphed"
    GROUP_ITEM }|--|| SERVICE : "morphed"
    GROUP_ITEM }|--|| LOCATION : "morphed"
    GROUP ||--o{ BLOG : "used by"
    HOSPITAL ||--o{ BLOG : "tenant owner"
    HOSPITAL ||--o{ HOSPITAL_GALLERY : "has gallery"
    SERVICE ||--o{ SERVICE_GALLERY : "has gallery"
    DISEASE ||--o{ DISEASE_GALLERY : "has gallery"
    BLOG ||--o{ BLOG_GALLERY : "has gallery"
    DOCTOR ||--o{ APPOINTMENT : "schedules"
```

## Key Relationships

### 1. User-Related Relationships
- Users can be patients, hospital managers, or super admins
- A user can have multiple appointments
- A user's role determines access level

### 2. Hospital-Related Relationships
- A hospital can have multiple doctors
- A hospital can capture leads from various locations
- A hospital can schedule appointments
- A hospital can own gallery images
- A hospital can be associated with blog templates (tenant-specific)

### 3. Location Hierarchy
- Locations form a tree structure: state → district → city → village
- Each hospital is located in a specific location
- Leads are associated with a specific location

### 4. Medical Entities
- Diseases and services can be grouped together using groups
- Groups can contain any combination of diseases, services, or locations (polymorphic)
- Diseases and services have their own gallery images

### 5. Content Management
- Blogs are templates that use groups to define dynamic content
- Templates can be tenant-specific (for a particular hospital) or global
- Blog templates can have their own gallery images

### 6. Gallery Management
- Separate gallery tables for hospitals, services, diseases, and blogs
- All galleries support image uploads

### 7. Appointment System
- Appointments are scheduled by users (patients)
- An appointment belongs to a user, hospital, and optionally a doctor
- Appointments have status and can be rescheduled

### 8. Lead Management
- Leads are captured from the frontend
- A lead is associated with a hospital, disease (optional), and location (optional)
- Leads have status that tracks the sales pipeline

This diagram provides a comprehensive view of the database structure and relationships between entities in the Blik_eye project.
