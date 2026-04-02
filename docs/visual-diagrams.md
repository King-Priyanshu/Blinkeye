# Blik_eye Project - Comprehensive Visual Diagrams

## 1. Database Diagram (Enhanced ER Diagram)

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
        created_at datetime
        updated_at datetime
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
        created_at datetime
        updated_at datetime
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
        created_at datetime
        updated_at datetime
    }
    
    DISEASE {
        id PK
        name string
        slug string
        description text
        image string
        is_active boolean
        created_at datetime
        updated_at datetime
    }
    
    SERVICE {
        id PK
        name string
        slug string
        description text
        image string
        is_active boolean
        created_at datetime
        updated_at datetime
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
        created_at datetime
        updated_at datetime
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
        created_at datetime
        updated_at datetime
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
        created_at datetime
        updated_at datetime
    }
    
    BLOG {
        id PK
        title_template string
        content_template longtext
        slug_template string
        tenant_id int
        is_active boolean
        created_at datetime
        updated_at datetime
    }
    
    GROUP {
        id PK
        name string
        type string
        is_active boolean
        created_at datetime
        updated_at datetime
    }
    
    GROUP_ITEM {
        id PK
        group_id int
        item_id int
        item_type string
        created_at datetime
        updated_at datetime
    }
    
    REVIEW {
        id PK
        hospital_id int
        author_name string
        rating int
        content text
        source string
        created_at datetime
        updated_at datetime
    }
    
    HOSPITAL_GALLERY {
        id PK
        hospital_id int
        image_path string
        created_at datetime
        updated_at datetime
    }
    
    SERVICE_GALLERY {
        id PK
        service_id int
        image_path string
        created_at datetime
        updated_at datetime
    }
    
    DISEASE_GALLERY {
        id PK
        disease_id int
        image_path string
        created_at datetime
        updated_at datetime
    }
    
    BLOG_GALLERY {
        id PK
        blog_id int
        image_path string
        created_at datetime
        updated_at datetime
    }
    
    USER ||--o{ APPOINTMENT : has
    HOSPITAL ||--o{ USER : "hospital manager"
    HOSPITAL ||--o{ DOCTOR : employs
    HOSPITAL ||--o{ LEAD : captures
    HOSPITAL ||--o{ APPOINTMENT : schedules
    HOSPITAL ||--o{ REVIEW : "has reviews"
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

## 2. Feature Interconnections Diagram

```mermaid
flowchart LR
    subgraph Frontend [Patient-Facing Frontend]
        Welcome[Welcome Page]
        Search[Search & Navigation]
        DynamicPages[Dynamic SEO Pages]
        LeadForm[Lead Capture Form]
        Appointment[Appointment Booking]
    end
    
    subgraph AdminPanel [Admin Dashboard]
        Dashboard[Admin Dashboard]
        ContentMgmt[Content Management]
        LeadMgmt[Lead Management]
        AppointmentMgmt[Appointment Management]
        UserMgmt[User Management]
        Analytics[Analytics]
    end
    
    subgraph Services [Backend Services]
        TemplateEngine[Template Engine Service]
        SeoService[SEO Service]
        LeadService[Lead Service]
        ComplianceService[Compliance Service]
        AnalyticsService[Analytics Service]
        OptimizationService[Optimization Service]
    end
    
    subgraph Controllers [API Controllers]
        PageController[Page Controller]
        SearchController[Search Controller]
        SitemapController[Sitemap Controller]
        AppointmentController[Appointment Controller]
        AdminControllers[Admin Controllers]
    end
    
    subgraph Database [Database]
        DB[SQLite/MySQL Database]
    end
    
    Frontend -->|API Requests| Controllers
    AdminPanel -->|API Requests| AdminControllers
    Controllers --> Services
    Services --> DB
    AdminControllers --> Services
    Services --> DB
    
    PageController --> TemplateEngine
    PageController --> SeoService
    SearchController --> SeoService
    LeadForm --> LeadService
    Appointment --> LeadService
    
    classDef frontend fill:#f0f9ff,stroke:#0369a1,stroke-width:2px
    classDef admin fill:#fef3c7,stroke:#d97706,stroke-width:2px
    classDef service fill:#ecfdf5,stroke:#047857,stroke-width:2px
    classDef controller fill:#f3f4f6,stroke:#6b7280,stroke-width:2px
    classDef database fill:#fdf2f8,stroke:#be185d,stroke-width:2px
    
    class Welcome,Search,DynamicPages,LeadForm,Appointment frontend
    class Dashboard,ContentMgmt,LeadMgmt,AppointmentMgmt,UserMgmt,Actions admin
    class TemplateEngine,SeoService,LeadService,ComplianceService,AnalyticsService,OptimizationService service
    class PageController,SearchController,SitemapController,AppointmentController,AdminControllers controller
    class DB database
```

## 3. Front-end Wireframe Diagram

```mermaid
flowchart TD
    subgraph PublicPages [Public Pages]
        WelcomePage[Welcome Page]
        DynamicPage[Dynamic SEO Page]
        AppointmentPage[Appointment Booking]
        SearchResults[Search Results]
        Sitemap[Sitemap.xml]
    end
    
    subgraph AdminPages [Admin Pages]
        Dashboard[Admin Dashboard]
        
        subgraph ContentManagement [Content Management]
            Locations[Locations]
            Hospitals[Hospitals]
            Diseases[Diseases]
            Services[Services]
            Doctors[Doctors]
            Groups[Groups]
            Templates[Templates]
        end
        
        subgraph Operations [Operations]
            Leads[Leads]
            Appointments[Appointments]
            Reviews[Reviews]
        end
        
        subgraph UserManagement [User Management]
            Profile[Profile]
            Users[Users]
        end
    end
    
    subgraph Components [Reusable Components]
        DataTable[DataTable]
        StatCard[StatCard]
        Badge[Badge]
        WysiwygEditor[WysiwygEditor]
        PrimaryButton[PrimaryButton]
        SecondaryButton[SecondaryButton]
        TextInput[TextInput]
        Checkbox[Checkbox]
    end
    
    WelcomePage -->|Navigation| DynamicPage
    WelcomePage -->|Search| SearchResults
    WelcomePage -->|Book Appointment| AppointmentPage
    
    DynamicPage -->|Lead Form| LeadService
    DynamicPage -->|Related Pages| DynamicPage
    DynamicPage -->|Book Appointment| AppointmentPage
    
    AppointmentPage -->|Form Submission| AppointmentController
    
    Dashboard --> ContentManagement
    Dashboard --> Operations
    Dashboard --> UserManagement
    
    ContentManagement --> Locations
    ContentManagement --> Hospitals
    ContentManagement --> Diseases
    ContentManagement --> Services
    ContentManagement --> Doctors
    ContentManagement --> Groups
    ContentManagement --> Templates
    
    Operations --> Leads
    Operations --> Appointments
    Operations --> Reviews
    
    UserManagement --> Profile
    UserManagement --> Users
    
    ContentManagement -->|Uses| Components
    Operations -->|Uses| Components
    UserManagement -->|Uses| Components
    
    classDef publicPage fill:#f0f9ff,stroke:#0369a1,stroke-width:2px
    classDef adminPage fill:#fef3c7,stroke:#d97706,stroke-width:2px
    classDef component fill:#ecfdf5,stroke:#047857,stroke-width:2px
    
    class WelcomePage,DynamicPage,AppointmentPage,SearchResults,Sitemap publicPage
    class Dashboard,Locations,Hospitals,Diseases,Services,Doctors,Groups,Templates,Leads,Appointments,Reviews,Profile,Users adminPage
    class DataTable,StatCard,Badge,WysiwygEditor,PrimaryButton,SecondaryButton,TextInput,Checkbox component
```

## 4. Project Flow Diagram

```mermaid
flowchart TD
    User[Patient/User]
    Browser[Web Browser]
    Server[Laravel Backend]
    Database[SQLite/MySQL]
    
    subgraph Middleware [Request Handling]
        IdentifyHospital[Identify Hospital by Domain]
        CheckAuth[Check Authentication]
        CheckRole[Check Role Permissions]
    end
    
    subgraph Controllers [API Controllers]
        PageController[Page Controller]
        SearchController[Search Controller]
        AppointmentController[Appointment Controller]
        AdminControllers[Admin Controllers]
    end
    
    subgraph Services [Business Logic]
        TemplateEngine[Template Engine]
        SeoService[SEO Service]
        LeadService[Lead Service]
        ComplianceService[Compliance Service]
        AnalyticsService[Analytics Service]
    end
    
    subgraph Views [Frontend Pages]
        Welcome[Welcome.vue]
        DynamicPage[Article.vue]
        AppointmentForm[BookAppointment.vue]
        AdminDashboard[Dashboard.vue]
        AdminPages[Admin Pages]
    end
    
    User -->|Requests Page| Browser
    Browser -->|HTTP Request| Server
    
    Server -->|Apply Middleware| IdentifyHospital
    IdentifyHospital --> CheckAuth
    CheckAuth --> CheckRole
    
    CheckRole -->|Public Route| PageController
    CheckRole -->|Search Route| SearchController
    CheckRole -->|Appointment Route| AppointmentController
    CheckRole -->|Admin Route| AdminControllers
    
    PageController -->|Get Template| Services
    PageController -->|Render Content| TemplateEngine
    PageController -->|Generate SEO| SeoService
    PageController -->|Get Context Data| Database
    
    SearchController -->|Search Entities| Database
    SearchController -->|Generate Suggestions| Services
    
    AppointmentController -->|Process Booking| Database
    AppointmentController -->|Send Notifications| Services
    
    AdminControllers -->|CRUD Operations| Database
    AdminControllers -->|Business Logic| Services
    
    Services -->|Data Access| Database
    
    PageController -->|Render View| DynamicPage
    SearchController -->|Render Results| Welcome
    AppointmentController -->|Render Form| AppointmentForm
    AdminControllers -->|Render Admin| AdminPages
    
    DynamicPage -->|Return HTML| Browser
    Welcome -->|Return HTML| Browser
    AppointmentForm -->|Return HTML| Browser
    AdminPages -->|Return HTML| Browser
    
    Browser -->|Display Page| User
    
    classDef user fill:#f0f9ff,stroke:#0369a1,stroke-width:2px
    classDef browser fill:#fef3c7,stroke:#d97706,stroke-width:2px
    classDef server fill:#ecfdf5,stroke:#047857,stroke-width:2px
    classDef middleware fill:#fef3c7,stroke:#d97706,stroke-width:2px
    classDef controller fill:#f3f4f6,stroke:#6b7280,stroke-width:2px
    classDef service fill:#fdf2f8,stroke:#be185d,stroke-width:2px
    classDef database fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    classDef view fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    
    class User user
    class Browser browser
    class Server,Database server
    class IdentifyHospital,CheckAuth,CheckRole middleware
    class PageController,SearchController,AppointmentController,AdminControllers controller
    class TemplateEngine,SeoService,LeadService,ComplianceService,AnalyticsService service
    class Welcome,DynamicPage,AppointmentForm,AdminDashboard,AdminPages view
```

## Diagram Summary

### 1. Database Diagram (Enhanced ER Diagram)
- Comprehensive view of all 14 database tables with their relationships
- Includes newly added `REVIEW` table for patient reviews
- Shows polymorphic relationships through GROUP_ITEM table
- Highlights hierarchical location structure and multi-tenant architecture
- Includes all necessary fields and timestamps

### 2. Feature Interconnections Diagram
- Shows how different features/modules interact within the system
- Clearly separates frontend, admin panel, services, controllers, and database
- Highlights key service dependencies and data flow
- Visualizes API request paths from both public and admin interfaces

### 3. Front-end Wireframe Diagram
- Maps out all public and admin pages with navigation structure
- Shows reusable components used across the application
- Highlights content management, operations, and user management sections
- Provides a clear overview of the UI hierarchy

### 4. Project Flow Diagram
- High-level system flow from user interaction to backend processing
- Shows middleware chain (hospital identification, authentication, authorization)
- Details how controllers handle different route types
- Visualizes the full request-response cycle through services and database
- Highlights which frontend views are rendered for each request type

All diagrams are created using Mermaid syntax for easy viewing and editing, following the project's architecture and requirements. They provide a comprehensive visual representation of the Blik_eye system, making it easier to understand and maintain.
