# Deployment Guide for blink.drkashishgupta.com

## Files Changed (upload these to Hostinger)

### 1. PHP Fix (causes the 500 API error)
Upload these files to your Laravel directory on Hostinger:

```
app/Providers/AppServiceProvider.php
```
This file adds the missing `api` rate limiter that causes all API endpoints to return 500.

### 2. Routes Fix (SPA slug routing)
```
routes/web.php
```
This file contains the catch-all route that serves the React SPA when a hospital slug URL is visited, plus asset serving routes.

### 3. .htaccess Fix (SPA asset routing)
```
public/.htaccess
```
This file rewrites asset requests (`/assets/...`) to the `hospital-app/assets/` directory.

### 4. React SPA Build (with map)
Upload the entire directory:
```
public/hospital-app/
├── index.html
├── favicon.svg
├── icons.svg
└── assets/
    ├── index-BENIxZ3m.js
    └── index-BK_c-ICL.css
```

## After Upload - Run These Commands on Hostinger

SSH into your Hostinger account or use their terminal, then run:

```bash
cd /path/to/your/laravel/root

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Regenerate caches
php artisan config:cache
php artisan route:cache

# Ensure storage symlink exists
php artisan storage:link
```

## Verification

After deployment, test these URLs:

1. **API**: https://blink.drkashishgupta.com/api/web-engine/test
   - Should return: `{"success":true,"message":"API is running"}`

2. **Hospitals API**: https://blink.drkashishgupta.com/api/web-engine/hospitals
   - Should return JSON with all 3 hospitals

3. **Hospital Pages**:
   - https://blink.drkashishgupta.com/blink-eye-hospital-amritsar
   - https://blink.drkashishgupta.com/blink-eye-hospital-mohali
   - https://blink.drkashishgupta.com/blink-eye-hospital-chandigarh
   - Each should show the hospital page with a map at the bottom

4. **SPA Assets**: 
   - https://blink.drkashishgupta.com/assets/index-BENIxZ3m.js
   - Should return JavaScript (not 404)

## What Was Fixed

1. **500 API Error**: Added missing `api` rate limiter in `AppServiceProvider.php`
2. **Map Not Showing**: Implemented OpenStreetMap embed in `Home.jsx` using hospital lat/lng
3. **SPA Routing**: Fixed catch-all route to detect hospital slugs and serve SPA
4. **Asset Loading**: Added .htaccess rewrite rules so assets load from any URL path
5. **CSP Headers**: Removed restrictive Content-Security-Policy that blocked API connections
