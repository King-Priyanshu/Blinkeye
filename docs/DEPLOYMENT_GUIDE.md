# Deployment Guide for Multi-Tenant Hospital System

## Overview

This guide covers deploying the BlinkEye multi-tenant hospital system with subdomain-based access for each hospital.

## Architecture

```
                    ┌─────────────────┐
                    │   DNS (Cloudflare)   │
                    │   *.blinkeye.com     │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │  Main Site   │  │ Hospital 1  │  │ Hospital 2  │
    │ blinkeye.com │  │ apollo.     │  │ fortis.     │
    │              │  │ blinkeye.com│  │ blinkeye.com│
    └─────────────┘  └─────────────┘  └─────────────┘
            │
            ▼
    ┌─────────────────────────────────────┐
    │     Laravel Backend (API + Admin)    │
    │         Port 8000                   │
    └─────────────────────────────────────┘
            │
            ▼
    ┌─────────────────────────────────────┐
    │         Database (MySQL/Postgres)   │
    └─────────────────────────────────────┘
```

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL
- Nginx/Apache
- SSL Certificate

## Step 1: Environment Configuration

### Backend (.env)

```env
APP_NAME="BlinkEye"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://blinkeye.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blinkeye
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Multi-tenancy
APP_DOMAIN=blinkeye.com
APP_SUBDOMAIN_ENABLED=true

# Security
SESSION_SECURE_COOKIE=true
```

### Frontend (.env)

```env
VITE_API_URL=https://blinkeye.com/api
VITE_BASE_DOMAIN=blinkeye.com
VITE_DEFAULT_HOSPITAL_SLUG=blink-eye-amritsar
```

## Step 2: Backend Deployment

### 2.1 Install Dependencies

```bash
cd /var/www/blinkeye

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Clear and rebuild cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 2.2 Nginx Configuration

```nginx
server {
    listen 80;
    server_name blinkeye.com www.blinkeye.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name blinkeye.com www.blinkeye.com;

    root /var/www/blinkeye/public;
    index index.php;

    ssl_certificate /etc/letsencrypt/live/blinkeye.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blinkeye.com/privkey.pem;

    # Main Laravel app
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Allow access to storage
    location /storage {
        alias /var/www/blinkeye/storage/app/public;
    }
}

# Wildcard subdomain configuration
server {
    listen 443 ssl http2;
    server_name ~^(?<subdomain>.+)\.blinkeye\.com$;

    root /var/www/blinkeye/public;
    index index.php;

    ssl_certificate /etc/letsencrypt/live/blinkeye.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blinkeye.com/privkey.pem;

    # Set subdomain as environment variable
    set $hospital_subdomain $subdomain;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param HOSPITAL_SUBDOMAIN $hospital_subdomain;
        include fastcgi_params;
    }
}
```

### 2.3 SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate wildcard certificate
sudo certbot -d blinkeye.com -d *.blinkeye.com --manual --preferred-challenges dns

# Auto-renewal (add to crontab)
sudo crontab -e
# Add: 0 12 * * * certbot renew --quiet --deploy-hook "nginx -s reload"
```

## Step 3: Frontend Deployment

### Option A: Deploy to Vercel/Netlify

1. **Vercel Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd hospital-frontend
vercel --prod
```

2. **Environment Variables in Vercel:**
   - `VITE_API_URL`: https://blinkeye.com/api
   - `VITE_BASE_DOMAIN`: blinkeye.com

3. **Configure Rewrites (vercel.json):**

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://blinkeye.com/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option B: Deploy with Laravel (SPA Mode)

1. **Build React App:**

```bash
cd hospital-frontend
npm install
npm run build
```

2. **Copy to Laravel Public:**

```bash
# Build
npm run build

# Copy to Laravel
cp -r dist/* ../Blink_eye/public/

# In Laravel routes/web.php - serve React for all routes
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
```

## Step 4: Database Setup

### 4.1 Create Hospitals

Access the admin panel at `https://blinkeye.com/admin` and create hospitals:

1. Login as admin
2. Navigate to Hospitals
3. Add new hospital:
   - Name: Apollo Hospital
   - Subdomain: apollo
   - Custom Domain: (optional)
   - Primary Color: #1a73e8
   - Secondary Color: #34a853
   - SEO fields: Fill in meta_title, meta_description, etc.

### 4.2 Seed Sample Data

```bash
php artisan db:seed --class=HospitalSeeder
php artisan db:seed --class=ServiceSeeder
php artisan db:seed --class=DiseaseSeeder
```

## Step 5: DNS Configuration

### 5.1 Cloudflare Setup

1. Add A Record:
   - Type: A
   - Name: @
   - Content: YOUR_SERVER_IP
   - Proxy: Proxied

2. Add Wildcard CNAME:
   - Type: CNAME
   - Name: *
   - Content: @ (or your server hostname)
   - Proxy: Proxied

### 5.2 Testing DNS

```bash
# Test subdomain resolution
nslookup apollo.blinkeye.com
dig apollo.blinkeye.com

# Test HTTP
curl -I https://apollo.blinkeye.com
```

## Step 6: Verification Checklist

- [ ] Main domain loads correctly
- [ ] Hospital subdomain loads correctly
- [ ] Each hospital shows its own branding
- [ ] SEO meta tags are correct for each subdomain
- [ ] SSL certificate works for all subdomains
- [ ] Admin panel accessible at /admin
- [ ] Forms submit leads to correct hospital

## Troubleshooting

### Common Issues

1. **Subdomain not resolving:**
   - Check DNS propagation (up to 48 hours)
   - Verify A/CNAME records
   - Check firewall rules

2. **SSL certificate errors:**
   - Ensure wildcard certificate is installed
   - Check Cloudflare SSL mode is "Full (strict)"

3. **Hospital not found:**
   - Verify hospital is active in database
   - Check subdomain matches exactly
   - Check Laravel logs

4. **Styles not loading:**
   - Run `npm run build` for production
   - Clear Laravel cache
   - Check file permissions

### Useful Commands

```bash
# Clear all caches
php artisan optimize:clear

# Check routes
php artisan route:list

# View logs
tail -f storage/logs/laravel.log

# Check Nginx logs
tail -f /var/log/nginx/error.log
```

## Security Considerations

1. **HTTPS Only:** Force HTTPS for all connections
2. **CORS:** Configure CORS for frontend API calls
3. **Rate Limiting:** Enable rate limiting on API routes
4. **CSRF Protection:** Keep CSRF tokens enabled
5. **Input Validation:** All inputs validated server-side

## Monitoring

- Set up Laravel Telescope for debugging
- Use Laravel Forge or Ploi for automated deployments
- Configure logging to external services (Loggly, Papertrail)
- Set up uptime monitoring for each subdomain
