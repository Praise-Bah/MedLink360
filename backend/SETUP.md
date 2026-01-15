# Backend Setup Guide

## Prerequisites

- Python 3.9+ installed
- Git installed
- Supabase project created (https://supabase.com)

## Initial Setup

### 1. Create and Activate Virtual Environment

**Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
```

**Linux/Mac:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and configure:

#### Required Configuration:

1. **SECRET_KEY**: Generate a secure key:
   ```python
   python -c "import secrets; print(secrets.token_urlsafe(50))"
   ```
   Copy the output and set it as `SECRET_KEY`

2. **DATABASE_URL**: Get from Supabase Dashboard
   - Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/database
   - Copy the "Connection string" under "Connection pooling"
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

3. **SUPABASE_URL**: From Supabase Dashboard > Settings > API
   - Format: `https://[PROJECT-REF].supabase.co`

4. **SUPABASE_KEY**: From Supabase Dashboard > Settings > API
   - Use the `anon` `public` key

5. **SUPABASE_SERVICE_ROLE_KEY**: From Supabase Dashboard > Settings > API
   - Use the `service_role` `secret` key (keep secure!)

6. **CORS_ALLOWED_ORIGINS**: Frontend URLs (default: `http://localhost:3000`)

### 4. Run Database Migrations

```bash
python manage.py migrate
```

### 5. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Start Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000`

## Testing Endpoints

### Health Check
```bash
curl http://localhost:8000/api/v1/health/
```

Expected response:
```json
{
  "status": "ok",
  "service": "medlink360-api",
  "version": "v1"
}
```

### API Documentation
- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

### Admin Panel
http://localhost:8000/admin/

## JWT Authentication Endpoints

### Obtain Token (Login)
```bash
curl -X POST http://localhost:8000/api/v1/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Refresh Token
```bash
curl -X POST http://localhost:8000/api/v1/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "YOUR_REFRESH_TOKEN"}'
```

### Verify Token
```bash
curl -X POST http://localhost:8000/api/v1/auth/token/verify/ \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_ACCESS_TOKEN"}'
```

### Using Authenticated Requests
```bash
curl http://localhost:8000/api/v1/some-protected-endpoint/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Common Issues

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Ensure IP address is whitelisted in Supabase (Dashboard > Settings > Database > Connection Pooling)

### CORS Errors
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check `CSRF_TRUSTED_ORIGINS` is configured

### Module Import Errors
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

## Next Steps

Refer to `docs/Backend_and_Database_Roadmap.md` for:
- Phase 2: Authentication & Profiles implementation
- Phase 3: Facilities & Appointments
- Phase 4: Medical Book features
- And more...
