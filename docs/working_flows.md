# Project Implementation Working Flows (Wireframes)

Based on the actual implementation of Blik_eye, here are the detailed "working wireframes" (flow diagrams) that illustrate how the different personas and the core project system operate.

## 1. Patient Working Flow (Front-End Journey)

This diagram represents the step-by-step working of a Patient on the platform.

```mermaid
sequenceDiagram
    participant Patient
    participant UI as Frontend
    participant API as Backend
    participant System as Database

    Patient->>UI: Lands on Homepage or SEO Page
    UI->>API: Fetch Context Data
    API->>System: Query Template and Data
    System-->>UI: Return Rendered Page

    alt Patient Searches Custom Query
        Patient->>UI: Type in Search Bar
        UI->>API: SearchController Query
        API->>System: Fuzzy Match against Doctors Services
        System-->>UI: Return Search Suggestions
        Patient->>UI: Clicks a Search Result
    end

    alt Patient Submits a Lead
        Patient->>UI: Fills Callback Form
        UI->>API: Submit POST lead
        API->>System: LeadService Validate Save Assign
        System-->>UI: Return Confirmation
    end

    alt Patient Books an Appointment
        Patient->>UI: Clicks Book Appointment
        UI->>Patient: Prompts Multi-step Booking Form
        Patient->>UI: Selects Hospital Doctor Date Slot Details
        UI->>API: POST appointment
        API->>System: Validate Slot and Create Appointment
        System-->>UI: Confirmed Booking Details
        UI->>Patient: Shows Success Screen and Notification
    end
```

---

## 2. Admin Working Flow (Dashboard Operations)

This diagram outlines how Hospital Managers and Super Admins manage the day-to-day operations.

```mermaid
flowchart TD
    Admin((Hospital Admin))
    
    subgraph AdminDashboard [Inertia Admin Panel]
        Auth[Login and RBAC Verification]
        Overview[Dashboard Home KPIs]
        LeadBoard[Lead Management Interface]
        ApptBoard[Appointment Management]
        ContentBoard[CMS Doctors and Services]
    end
    
    subgraph BackendActions [Controllers and Services]
        FetchDashboard[DashboardController Index]
        UpdateLead[LeadController UpdateStatus]
        HandleAppt[AppointmentController Reschedule]
        CRUDSystem[Resource Controllers Store Update]
    end
    
    Database[(Main Database)]
    
    Admin -->|Logs In| Auth
    Auth -->|Check Role Middlewares| Overview
    Overview -->|Fetch KPI Data| FetchDashboard
    
    Admin -->|Clicks Leads| LeadBoard
    LeadBoard -->|Change Status New to Contacted| UpdateLead
    
    Admin -->|Clicks Appointments| ApptBoard
    ApptBoard -->|Approve Reschedule Appointment| HandleAppt
    
    Admin -->|Manages Hospital Data| ContentBoard
    ContentBoard -->|Upload Images, Add Doctors| CRUDSystem
    
    FetchDashboard <--> Database
    UpdateLead <--> Database
    HandleAppt <--> Database
    CRUDSystem <--> Database

    classDef panel stroke:#333,fill:#f9f9f9
    class AdminDashboard panel
```

---

## 3. Overall Project Implementation Flow (System Architecture)

This diagram shows the "under the hood" working of the project, detailing how Laravel intercepts and routes different domains.

```mermaid
flowchart LR
    External[External Requests]
    
    subgraph MiddlewareStack [Laravel Middleware Stack]
        Intercept[Request Interceptor]
        Subdomain[IdentifyHospitalByDomain]
        AuthGuard[Sanctum/Session Auth]
    end
    
    subgraph RoutingLayer [Routing layer]
        PublicRoutes[Frontend SEO PageController]
        AdminRoutes[Admin Routes Protected Prefix]
        APIRoutes[XHR JSON Endpoints]
    end
    
    subgraph DomainLogic [Domain Logic Services]
        Template[TemplateEngineService Generated Pages]
        Lead[LeadService Matches Hospital]
        SEO[SeoService Generate Schema]
    end
    
    Database[(SQLite/MySQL)]
    
    External --> Intercept
    Intercept --> Subdomain
    Subdomain --> AuthGuard
    
    AuthGuard -->|Guest Browsing| PublicRoutes
    AuthGuard -->|Admin Session| AdminRoutes
    AuthGuard -->|Inertia Data| APIRoutes
    
    PublicRoutes --> Template
    PublicRoutes --> SEO
    
    APIRoutes --> Lead
    AdminRoutes --> DB[Direct Eloquent Calls & Services]
    
    Template <--> Database
    Lead <--> Database
    SEO <--> Database
    DB <--> Database
    
    classDef sys fill:#e1f5fe,stroke:#01579b
    class MiddlewareStack,RoutingLayer,DomainLogic sys
```

---

### Summary of the Implementation Workings:

1. **Patient Working:** Revolves around consumption of dynamically rendered templates (SEO Pages), using search features, and converting via Lead Capture forms or the Multi-step Appointment Booking form.
2. **Admin Working:** Focused purely on operational CRUD. Admins authenticate, are scoped to their specific `hospital_id` via middleware, and clear queues by updating statuses for Leads and Appointments.
3. **Project Execution:** Operates on a multi-tenant middleware pattern. Every request checks the domain/subdomain, scaffolds the context, applies the right CMS templates, handles the database queries using Eloquent ORM, and formats the return payload via Inertia to Vue 3.
