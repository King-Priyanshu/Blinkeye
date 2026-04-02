# DNS Configuration Guide for Multi-Tenant Hospital System

## Overview

This guide explains how to configure DNS records to enable wildcard subdomains for your hospital multi-tenant system.

## Domain Structure

- **Main Domain**: `blinkeye.com` - Main website and admin panel
- **Hospital Subdomains**: `{hospitalname}.blinkeye.com` - Individual hospital websites

## DNS Record Types

### Option 1: A Record (Recommended for Single Server)

```
Type: A Record
Host: *
Points to: <YOUR_SERVER_IP>
Priority: N/A
TTL: 3600 (or auto)
```

### Option 2: CNAME Record (Recommended for Cloudflare/Load Balancers)

```
Type: CNAME Record
Host: *
Points to: @ (or your load balancer hostname)
TTL: 3600 (or auto)
```

## Step-by-Step Configuration

### 1. Cloudflare Setup

1. Log in to Cloudflare dashboard
2. Select your domain (`blinkeye.com`)
3. Go to DNS settings
4. Add the following records:

| Type | Name | Content | Proxy Status |
|------|------|---------|---------------|
| A | @ | 192.0.2.1 (your server IP) | Proxied |
| A | * | 192.0.2.1 (your server IP) | Proxied |

### 2. GoDaddy Setup

1. Log in to GoDaddy DNS Management
2. Add A Record:
   - Type: A
   - Host: *
   - Points to: YOUR_SERVER_IP
3. Add CNAME (alternative):
   - Type: CNAME
   - Host: *
   - Points to: @

### 3. AWS Route 53 Setup

Create a hosted zone and add:

```json
{
  "Type": "A",
  "Name": "*.blinkeye.com",
  "AliasTarget": {
    "HostedZoneId": "Z2FDTNDATAQYW2",
    "DNSName": "elb-endpoint.amazonaws.com",
    "EvaluateTargetHealth": false
  }
}
```

## Testing Your DNS

### Linux/Mac

```bash
# Test subdomain resolution
nslookup apollo.blinkeye.com
dig apollo.blinkeye.com
```

### Windows

```cmd
nslookup apollo.blinkeye.com
```

## Server Configuration

### Nginx Configuration

Add to your server block:

```nginx
server {
    server_name blinkeye.com www.blinkeye.com;
    # Main site config
}

server {
    server_name ~^(?<subdomain>.+)\.blinkeye\.com$;
    # Hospital subdomain config
    
    # Access subdomain in PHP
    set $hospital_subdomain $subdomain;
    
    # Pass to PHP-FPM
    location ~ \.php$ {
        fastcgi_param HTTP_HOST $host;
        fastcgi_param SUBDOMAIN $subdomain;
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName blinkeye.com
    ServerAlias www.blinkeye.com
    # Main site config
</VirtualHost>

<VirtualHost *:80>
    ServerName blinkeye.com
    ServerAlias *.blinkeye.com
    
    # Set environment variable for subdomain
    SetEnvIf Host "^([^.]+)\.blinkeye\.com$" SUBDOMAIN=$1
</VirtualHost>
```

## SSL Certificate

### Using Let's Encrypt (Certbot)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate wildcard certificate
sudo certbot -d blinkeye.com -d *.blinkeye.com --manual --preferred-challenges dns

# Auto-renewal
sudo certbot renew --dry-run
```

### Cloudflare SSL

1. Go to SSL/TLS tab in Cloudflare
2. Select "Full (strict)" mode
3. Enable "Always Use HTTPS"

## Environment Configuration

Add to your `.env` file:

```env
# Main domain
APP_DOMAIN=blinkeye.com

# Base URL
APP_URL=https://blinkeye.com

# Allow subdomains
APP_SUBDOMAIN_ENABLED=true
```

## Troubleshooting

### Common Issues

1. **Subdomain not resolving**
   - Check DNS propagation (up to 48 hours)
   - Verify A/CNAME record is correct
   - Check firewall rules

2. **SSL certificate errors**
   - Ensure wildcard certificate is set
   - Check Cloudflare SSL mode

3. **Server not receiving subdomain**
   - Verify Nginx/Apache config
   - Check application middleware

### Debug Commands

```bash
# Check DNS propagation
dig +trace apollo.blinkeye.com

# Check server headers
curl -I https://apollo.blinkeye.com

# Check nginx config
nginx -t

# Check Apache config
apache2ctl -S
```

## Production Checklist

- [ ] Wildcard DNS record configured
- [ ] SSL certificate installed for main domain and wildcards
- [ ] Server web config updated
- [ ] Application .env updated
- [ ] Middleware handles subdomain detection
- [ ] Tested with multiple subdomains
- [ ] SEO meta tags working per subdomain

## Support

For issues, check:
1. Laravel logs: `storage/logs/laravel.log`
2. Web server error logs
3. DNS propagation status
