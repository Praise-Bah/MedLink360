# Quick Start - Backend Setup

## ✅ What's Already Done

- ✓ Django project structured in `backend/`
- ✓ Requirements file with all dependencies
- ✓ Settings configured for DRF, JWT, CORS, Supabase
- ✓ API v1 scaffold with health + JWT endpoints
- ✓ OpenAPI schema and Swagger UI wired

## 🚀 Next Steps (Run These Commands)

### 1. Create Virtual Environment
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
```

### 2. Install Dependencies
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Generate a secure SECRET_KEY:
```powershell
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

Create `backend/.env` by copying `.env.example`:
```powershell
copy .env.example .env
```

Edit `.env` and update:
- **SECRET_KEY**: Use the generated key above
- **DATABASE_URL**: Get from Supabase Dashboard → Settings → Database → Connection string (use pooling mode)
- **SUPABASE_URL**: `https://[your-project-ref].supabase.co`
- **SUPABASE_KEY**: Get from Supabase Dashboard → Settings → API → anon public key
- **SUPABASE_SERVICE_ROLE_KEY**: Get from Supabase Dashboard → Settings → API → service_role secret key

### 4. Run Migrations
```powershell
python manage.py migrate
```

### 5. Create Superuser (Optional)
```powershell
python manage.py createsuperuser
```

### 6. Start Development Server
```powershell
python manage.py runserver
```

## 🧪 Test the Endpoints

### Health Check
Open in browser or use curl:
```
http://localhost:8000/api/v1/health/
```

Expected:
```json
{"status": "ok", "service": "medlink360-api", "version": "v1"}
```

### API Documentation
- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

### Admin Panel
http://localhost:8000/admin/

### Test JWT Authentication

1. First create a user via admin or Django shell
2. Get tokens:
```powershell
curl -X POST http://localhost:8000/api/v1/auth/token/ `
  -H "Content-Type: application/json" `
  -d '{\"username\": \"your_username\", \"password\": \"your_password\"}'
```

## 📋 Checklist

- [ ] Virtual environment created and activated
- [ ] Dependencies installed
- [ ] `.env` configured with Supabase credentials
- [ ] Migrations run successfully
- [ ] Server starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] Swagger UI loads at /api/docs/
- [ ] Can login to admin panel (if superuser created)

## ❓ Troubleshooting

**Database connection error?**
- Check DATABASE_URL format matches Supabase connection string
- Ensure Supabase project is active
- Verify IP whitelist in Supabase (Dashboard → Settings → Database)

**Module not found errors?**
- Ensure virtual environment is activated (prompt should show `(venv)`)
- Run `pip install -r requirements.txt` again

**CORS errors from frontend?**
- Check CORS_ALLOWED_ORIGINS in .env includes frontend URL
- Default is `http://localhost:3000`

## 📖 Next Phase

Once testing is complete, refer to:
- `docs/Backend_and_Database_Roadmap.md` for Phase 2
- Phase 2 will implement:
  - Custom User model with roles
  - Registration endpoint
  - Profile models (Patient, Doctor, Nurse, etc.)
  - Verification workflows
