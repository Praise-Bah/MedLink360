# Phase 2 Testing Guide - Authentication & Profiles

## ✅ What Was Completed in Phase 2

### Models Created
1. **Custom User Model** - Email-based authentication with role support
2. **Role Model** - Multi-role support with 7 role types
3. **Profile Models** - 6 specialized profile types:
   - PatientProfile
   - DoctorProfile
   - NurseProfile
   - PharmacistProfile
   - LabTechnicianProfile
   - FacilityAdminProfile

### API Endpoints Added
- `POST /api/v1/accounts/register/` - User registration with role selection
- `GET /api/v1/accounts/whoami/` - Get current user details
- `GET/PATCH /api/v1/accounts/profile/` - User profile management
- `GET /api/v1/accounts/roles/` - List user roles
- `POST /api/v1/accounts/switch-role/` - Switch active role
- `GET/PATCH /api/v1/accounts/profiles/{role-type}/` - Role-specific profile management

## 🧪 Testing Instructions

### Prerequisites
Make sure your development server is running:
```powershell
python manage.py runserver
```

Server should be accessible at: `http://localhost:8000`

---

## 1. Create Superuser (Admin Access)

```powershell
python manage.py createsuperuser
```

**Prompts:**
- Email: `admin@medlink360.com`
- Password: `Praise12300`
- Password (again): `Praise12300`

**Test Admin Panel:**
Open browser: http://localhost:8000/admin/
- Login with superuser credentials
- You should see: Users, Roles, and all Profile models

---

## 2. Test Registration Endpoint

### A. Register a Patient

```powershell
curl -X POST http://localhost:8000/api/v1/accounts/register/ `
  -H "Content-Type: application/json" `
  -d '{
    \"email\": \"patient1@example.com\",
    \"password\": \"SecurePass123!\",
    \"password_confirm\": \"SecurePass123!\",
    \"first_name\": \"John\",
    \"last_name\": \"Doe\",
    \"phone_number\": \"+1234567890\",
    \"role_type\": \"patient\"
  }'
```

**Expected Response:**
```json
{
  "id": 2,
  "email": "patient1@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "phone_number": "+1234567890",
  "active_role": "patient",
  "is_verified": false,
  "roles": ["patient"],
  "patient_profile": { ... },
  ...
}
```

### B. Register a Doctor (Requires Verification)

```powershell
curl -X POST http://localhost:8000/api/v1/accounts/register/ `
  -H "Content-Type: application/json" `
  -d '{
    \"email\": \"doctor1@example.com\",
    \"password\": \"SecurePass123!\",
    \"password_confirm\": \"SecurePass123!\",
    \"first_name\": \"Dr. Jane\",
    \"last_name\": \"Smith\",
    \"phone_number\": \"+1987654321\",
    \"role_type\": \"doctor\",
    \"license_number\": \"MD12345\",
    \"specialization\": \"Cardiology\",
    \"education\": \"MD from Harvard Medical School\"
  }'
```

**Expected Response:** User created with doctor profile, but `is_verified: false`

### C. Register Other Roles

Test with these role types:
- `nurse` (requires: license_number, education)
- `pharmacist` (requires: license_number, education)
- `lab_technician` (requires: license_number, education)
- `hospital_admin`
- `moh_admin`

---

## 3. Test JWT Authentication

### A. Obtain Tokens (Login)

```powershell
curl -X POST http://localhost:8000/api/v1/auth/token/ `
  -H "Content-Type: application/json" `
  -d '{
    \"email\": \"patient1@example.com\",
    \"password\": \"SecurePass123!\"
  }'
```

**Expected Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Save the access token** for subsequent requests!

### B. Test Protected Endpoint (whoami)

```powershell
$token = "YOUR_ACCESS_TOKEN_HERE"

curl http://localhost:8000/api/v1/accounts/whoami/ `
  -H "Authorization: Bearer $token"
```

**Expected Response:** Full user details with all profiles

### C. Refresh Token

```powershell
curl -X POST http://localhost:8000/api/v1/auth/token/refresh/ `
  -H "Content-Type: application/json" `
  -d '{\"refresh\": \"YOUR_REFRESH_TOKEN\"}'
```

---

## 4. Test Profile Management

### Get Patient Profile

```powershell
curl http://localhost:8000/api/v1/accounts/profiles/patient/ `
  -H "Authorization: Bearer $token"
```

### Update Patient Profile

```powershell
curl -X PATCH http://localhost:8000/api/v1/accounts/profiles/patient/ `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{
    \"gender\": \"M\",
    \"blood_group\": \"O+\",
    \"height\": 175.5,
    \"weight\": 70.5,
    \"allergies\": \"Penicillin\",
    \"chronic_conditions\": \"None\",
    \"emergency_contact_name\": \"Jane Doe\",
    \"emergency_contact_phone\": \"+1234567891\"
  }'
```

### Get Doctor Profile

```powershell
curl http://localhost:8000/api/v1/accounts/profiles/doctor/ `
  -H "Authorization: Bearer $token"
```

### Update Doctor Profile

```powershell
curl -X PATCH http://localhost:8000/api/v1/accounts/profiles/doctor/ `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{
    \"consultation_fee\": 150.00,
    \"consultation_duration\": 30,
    \"max_patients_per_day\": 25,
    \"bio\": \"Experienced cardiologist with 10+ years of practice\",
    \"languages\": \"English, Spanish\",
    \"is_available_for_appointments\": true
  }'
```

---

## 5. Test Multi-Role Functionality

### A. Add Second Role to User (via Admin)

1. Go to http://localhost:8000/admin/
2. Navigate to **Roles** → **Add Role**
3. Select user (e.g., patient1@example.com)
4. Role type: `doctor`
5. Add license_number and other required fields
6. Save

### B. Test Role Switching

```powershell
curl -X POST http://localhost:8000/api/v1/accounts/switch-role/ `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{\"role_type\": \"doctor\"}'
```

**Expected:** User's active_role changes to "doctor"

### C. Verify Role Switch

```powershell
curl http://localhost:8000/api/v1/accounts/whoami/ `
  -H "Authorization: Bearer $token"
```

Check that `active_role` is now `"doctor"`

---

## 6. Test API Documentation

### Swagger UI
Open browser: http://localhost:8000/api/docs/

You should see all endpoints documented including:
- `/api/v1/accounts/register/`
- `/api/v1/accounts/whoami/`
- `/api/v1/accounts/profile/`
- `/api/v1/accounts/profiles/{role}/`
- `/api/v1/accounts/switch-role/`

### Test Authentication in Swagger
1. Click "Authorize" button
2. Enter: `Bearer YOUR_ACCESS_TOKEN`
3. Try executing protected endpoints

---

## 7. Verify Database Tables (Supabase Dashboard)

Go to: https://supabase.com/dashboard/project/tspyurqzacfnkkbfncfa/editor

**Tables Created:**
- `users` - Custom user model
- `user_roles` - User role assignments
- `patient_profiles`
- `doctor_profiles`
- `nurse_profiles`
- `pharmacist_profiles`
- `lab_tech_profiles`
- `facility_admin_profiles`

**Check Data:**
- Run: `SELECT * FROM users;`
- Run: `SELECT * FROM user_roles;`
- Run: `SELECT * FROM patient_profiles;`

---

## 8. Django Admin Testing

### Login to Admin
http://localhost:8000/admin/

### Test User Management
1. **Users** → View list
   - Should show email, name, active_role, verification status
2. Click on a user → Edit
   - Update profile picture URL
   - Change active role
   - Mark as verified

### Test Role Management
1. **Roles** → View list
   - Shows user, role type, verification status
2. Add verification documents (Supabase Storage URLs)
3. Mark role as verified

### Test Profile Management
1. Navigate to any profile type (e.g., **Doctor profiles**)
2. View existing profiles
3. Edit profile details
4. Test filters and search

---

## 9. Error Testing

### A. Invalid Registration
```powershell
# Missing required fields for doctor
curl -X POST http://localhost:8000/api/v1/accounts/register/ `
  -H "Content-Type: application/json" `
  -d '{
    \"email\": \"doctor2@example.com\",
    \"password\": \"SecurePass123!\",
    \"password_confirm\": \"SecurePass123!\",
    \"role_type\": \"doctor\"
  }'
```

**Expected:** 400 error with message about missing license_number and education

### B. Password Mismatch
```powershell
curl -X POST http://localhost:8000/api/v1/accounts/register/ `
  -H "Content-Type: application/json" `
  -d '{
    \"email\": \"test@example.com\",
    \"password\": \"SecurePass123!\",
    \"password_confirm\": \"DifferentPass123!\",
    \"role_type\": \"patient\"
  }'
```

**Expected:** 400 error - "Password fields didn't match."

### C. Duplicate Email
Try registering with an email that already exists.

**Expected:** 400 error - email already exists

### D. Invalid Role Switch
```powershell
curl -X POST http://localhost:8000/api/v1/accounts/switch-role/ `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{\"role_type\": \"nurse\"}'
```

If user doesn't have nurse role:
**Expected:** 400 error - "You do not have the 'nurse' role"

---

## ✅ Success Checklist

- [ ] Superuser created successfully
- [ ] Can access Django admin panel
- [ ] Patient registration works
- [ ] Doctor registration works (with required fields)
- [ ] JWT token obtained successfully
- [ ] whoami endpoint returns user data
- [ ] Can update patient profile
- [ ] Can update doctor profile
- [ ] All models visible in Django admin
- [ ] Can view users in Supabase database
- [ ] Swagger UI loads all endpoints
- [ ] Can test endpoints through Swagger
- [ ] Error handling works correctly
- [ ] Role switching works for multi-role users

---

## 🐛 Common Issues

### Issue: "Authentication credentials were not provided"
**Solution:** Include `Authorization: Bearer YOUR_TOKEN` header

### Issue: "Token is invalid or expired"
**Solution:** Use refresh endpoint to get new access token

### Issue: Profile not found
**Solution:** Ensure profile was created during registration. Check in admin panel.

### Issue: Can't switch role
**Solution:** Verify user has that role in admin → Roles table

---

## 📊 Next Steps After Testing

Once all tests pass:
1. Document any bugs found
2. Test with frontend integration
3. Proceed to **Phase 3**: Facilities & Appointments
4. Implement verification workflows
5. Add permission-based access controls

---

## 📝 API Endpoint Summary

| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/api/v1/accounts/register/` | POST | No | Register new user with role |
| `/api/v1/accounts/whoami/` | GET | Yes | Get current user details |
| `/api/v1/accounts/profile/` | GET/PATCH | Yes | Manage user profile |
| `/api/v1/accounts/roles/` | GET | Yes | List user roles |
| `/api/v1/accounts/switch-role/` | POST | Yes | Switch active role |
| `/api/v1/accounts/profiles/patient/` | GET/PATCH | Yes | Patient profile |
| `/api/v1/accounts/profiles/doctor/` | GET/PATCH | Yes | Doctor profile |
| `/api/v1/accounts/profiles/nurse/` | GET/PATCH | Yes | Nurse profile |
| `/api/v1/accounts/profiles/pharmacist/` | GET/PATCH | Yes | Pharmacist profile |
| `/api/v1/accounts/profiles/lab-tech/` | GET/PATCH | Yes | Lab tech profile |
| `/api/v1/accounts/profiles/facility-admin/` | GET/PATCH | Yes | Facility admin profile |

Happy Testing! 🚀
