# Subdomain-Based Hospital Websites Testing Guide

## Overview

This React app is configured to handle subdomain-based multi-tenant hospital websites. It detects the subdomain from the URL and fetches hospital-specific data from the Laravel API.

## Test URLs

### Main Site (All Hospitals)
- **URL**: `http://localhost:5174`
- **Shows**: All hospitals list with links to each hospital's site

### Hospital Sites (via Query Parameter)
Since local development doesn't support real subdomains by default, use query parameters:

| Hospital | URL |
|----------|-----|
| Amritsar | `http://localhost:5174?subdomain=amritsar` |
| Chandigarh | `http://localhost:5174?subdomain=chandigarh` |
| Mohali | `http://localhost:5174?subdomain=mohali` |

## How It Works

1. **Subdomain Detection**: The [`src/utils/subdomain.js`](src/utils/subdomain.js) utility detects subdomains from:
   - Query parameter: `?subdomain=amritsar`
   - Hash parameter: `#subdomain=amritsar`
   - Actual subdomain: `amritsar.localhost` (requires hosts file configuration)

2. **API Integration**: 
   - Main site: Calls `/api/web-engine/hospitals` to get all hospitals
   - Hospital subdomain: Calls `/api/web-engine/tenant-config?subdomain={subdomain}` to get specific hospital

3. **Frontend Display**:
   - Main domain shows all hospitals in a grid
   - Subdomain shows that specific hospital's website

## Testing with Real Subdomains (Optional)

To test with actual subdomains (e.g., `amritsar.localhost`), add entries to your hosts file:

```bash
# /etc/hosts (Linux/Mac) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 amritsar.localhost
127.0.0.1 chandigarh.localhost
127.0.0.1 mohali.localhost
```

Then access:
- `http://amritsar.localhost:5174`
- `http://chandigarh.localhost:5174`
- `http://mohali.localhost:5174`

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/web-engine/hospitals` | Get all hospitals |
| `GET /api/web-engine/tenant-config?subdomain=amritsar` | Get hospital by subdomain |
| `GET /api/web-engine/hospital/{slug}` | Get full hospital details |

## Configuration

The app is configured via environment variables in `.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_BASE_DOMAIN=localhost
VITE_DEFAULT_HOSPITAL_SLUG=blink-eye-hospital-amritsar
```

## Hospital Data

The following hospitals are seeded in the database:

1. **Amritsar** - `amritsar` subdomain
2. **Chandigarh** - `chandigarh` subdomain  
3. **Mohali** - `mohali` subdomain
