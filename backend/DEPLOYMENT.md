# 🚀 MedLink360 Backend Deployment Guide

## Prerequisites

- Python 3.11+
- PostgreSQL (Supabase)
- Git
- Domain name (for production)
- SSL certificate (for production)

---

## 🔧 Production Setup

### 1. Server Requirements

**Minimum:**
- 2 CPU cores
- 4GB RAM
- 20GB storage
- Ubuntu 20.04+ / Debian 11+

**Recommended:**
- 4 CPU cores
- 8GB RAM
- 50GB storage

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
nano .env
```

**Critical settings:**
```bash
DEBUG=False
SECRET_KEY=<generate-strong-key>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=<supabase-connection-string>
CORS_ALLOWED_ORIGINS=https://yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com
```

**Generate SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 3. Install Dependencies

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### 4. Database Migration

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 5. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

---

## 🌐 Deployment Options

### Option 1: Railway (Easiest) ⭐

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Initialize and deploy:
```bash
railway login
railway init
railway link
railway up
```

3. Add environment variables in Railway dashboard

4. Set up domain in Railway

### Option 2: Heroku

1. Create `Procfile`:
```
web: gunicorn medlink360.wsgi --log-file -
```

2. Deploy:
```bash
heroku create medlink360-api
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Option 3: DigitalOcean App Platform

1. Connect GitHub repo
2. Configure build settings:
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `gunicorn medlink360.wsgi`
3. Add environment variables
4. Deploy

### Option 4: VPS (Ubuntu Server)

#### Install System Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and dependencies
sudo apt install python3 python3-pip python3-venv nginx supervisor -y

# Install PostgreSQL client
sudo apt install postgresql-client -y
```

#### Setup Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/yourrepo/medlink360.git
cd medlink360/backend

# Create virtual environment
sudo python3 -m venv venv
sudo venv/bin/pip install -r requirements.txt
sudo venv/bin/pip install gunicorn

# Configure environment
sudo cp .env.example .env
sudo nano .env  # Edit configuration

# Run migrations
sudo venv/bin/python manage.py migrate
sudo venv/bin/python manage.py collectstatic --noinput
```

#### Configure Gunicorn

Create `/etc/supervisor/conf.d/medlink360.conf`:

```ini
[program:medlink360]
command=/var/www/medlink360/backend/venv/bin/gunicorn medlink360.wsgi:application --bind 0.0.0.0:8000 --workers 4 --timeout 120
directory=/var/www/medlink360/backend
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/medlink360/gunicorn.log
```

```bash
# Create log directory
sudo mkdir -p /var/log/medlink360
sudo chown www-data:www-data /var/log/medlink360

# Start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start medlink360
```

#### Configure Nginx

Create `/etc/nginx/sites-available/medlink360`:

```nginx
upstream medlink360_app {
    server 127.0.0.1:8000 fail_timeout=0;
}

server {
    listen 80;
    server_name api.yourdomain.com;
    
    client_max_body_size 20M;
    
    location /static/ {
        alias /var/www/medlink360/backend/staticfiles/;
    }
    
    location /media/ {
        alias /var/www/medlink360/backend/media/;
    }
    
    location / {
        proxy_pass http://medlink360_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/medlink360 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

---

## 🔐 Security Checklist

### Before Deployment

- [ ] `DEBUG = False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] `ALLOWED_HOSTS` configured
- [ ] Database password is strong
- [ ] CORS origins restricted
- [ ] CSRF trusted origins set
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] Logs directory created

### Post-Deployment

- [ ] Create superuser account
- [ ] Test all API endpoints
- [ ] Verify HTTPS works
- [ ] Test CORS from frontend
- [ ] Check error logging
- [ ] Monitor server resources
- [ ] Set up backups
- [ ] Configure monitoring

---

## 📊 Monitoring

### Health Check Endpoints

```bash
# Basic health check
curl https://api.yourdomain.com/api/v1/health/

# Detailed health check (admin only)
curl https://api.yourdomain.com/api/v1/health/detailed/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Log Monitoring

```bash
# Application logs
tail -f /var/www/medlink360/backend/logs/medlink360.log

# Gunicorn logs
tail -f /var/log/medlink360/gunicorn.log

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs
tail -f /var/log/nginx/error.log
```

### Database Backup

```bash
# Backup Supabase (via dashboard)
# Or use pg_dump
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

---

## 🔄 Updates & Maintenance

### Update Application

```bash
cd /var/www/medlink360/backend
sudo git pull origin main
sudo venv/bin/pip install -r requirements.txt
sudo venv/bin/python manage.py migrate
sudo venv/bin/python manage.py collectstatic --noinput
sudo supervisorctl restart medlink360
```

### Database Maintenance

```bash
# Run migrations
python manage.py migrate

# Clear expired sessions
python manage.py clearsessions

# Clear expired tokens (if using token blacklist)
python manage.py flushexpiredtokens
```

---

## 🚨 Troubleshooting

### Issue: 502 Bad Gateway

**Check:**
1. Gunicorn is running: `sudo supervisorctl status medlink360`
2. Port 8000 is listening: `sudo netstat -tlnp | grep 8000`
3. Check logs: `tail -f /var/log/medlink360/gunicorn.log`

**Fix:**
```bash
sudo supervisorctl restart medlink360
```

### Issue: Database Connection Errors

**Check:**
1. DATABASE_URL is correct
2. Supabase project is active
3. IP allowlist in Supabase (if configured)

### Issue: Static Files Not Loading

**Check:**
1. `collectstatic` was run
2. Nginx configuration for `/static/`
3. File permissions

**Fix:**
```bash
python manage.py collectstatic --noinput
sudo chown -R www-data:www-data staticfiles/
```

### Issue: CORS Errors

**Check:**
1. `CORS_ALLOWED_ORIGINS` includes frontend URL
2. Frontend URL uses correct protocol (http/https)
3. No trailing slashes in URLs

---

## 📈 Performance Optimization

### Database Optimization

```python
# settings.py
CONN_MAX_AGE = 600  # Keep connections open
```

### Caching (Optional)

```bash
# Install Redis
sudo apt install redis-server

# Configure Django
pip install django-redis
```

```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
```

### CDN for Static Files (Optional)

Use Cloudflare or AWS CloudFront for static files.

---

## 📞 Support

- **Documentation**: Check API docs at `/api/docs/`
- **Logs**: Monitor application logs
- **Health Check**: Use `/api/v1/health/detailed/`

---

**Deployment Status:** Ready for Production ✅  
**Last Updated:** 2026-01-07
