# MedLink360 Authentication & Onboarding Flow

## Complete User Journey Map

### 1. Entry Points
- **Landing Page** → `/signup` or `/login`

### 2. Sign Up Flow (New Users)

```
/signup (with role parameter)
  ↓ [Submit form]
/verification-email
  ↓ [Email verified]
/account-created
  ↓ [Continue Setup]
/profile-step-one
  ↓ [Next]
/profile-step-two
  ↓ [Next]
/profile-role-[patient|provider]
  ↓ [Submit]
/verification-[patient|doctor|nurse|lab|pharmacist]
  ↓ [Submit documents]
/dashboard
```

### 3. Sign In Flow (Existing Users)

```
/login
  ↓ [Login success]
/dashboard (role-specific)
```

### 4. Password Reset Flow

```
/login
  ↓ [Click "Forgot Password"]
/forgot-password
  ↓ [Submit email]
/password-reset-sent
  ↓ [Check email, click link]
/email-otp-verification
  ↓ [Enter OTP]
/password-reset-success
  ↓ [Go Back to Login]
/login
```

---

## Detailed Page Routes & Navigation

### Authentication Pages

| Page | Route | Component | Next Action | Destination |
|------|-------|-----------|-------------|-------------|
| Sign Up | `/signup?role={role}` | `SignupForm` | Submit form | `/verification-email` |
| Sign In | `/login` | `SigninForm` | Login success | `/dashboard` |
| Forgot Password | `/forgot-password` | `ForgotPasswordForm` | Submit email | `/password-reset-sent` |
| Password Reset Sent | `/password-reset-sent` | `PasswordResetSentCard` | Click button | Email link |
| Email OTP Verification | `/email-otp-verification` | `EmailOtpVerificationForm` | Verify OTP | `/dashboard` |
| Password Reset Success | `/password-reset-success` | `PasswordResetSuccessCard` | Go to Login | `/login` |

### Onboarding Pages

| Page | Route | Component | Next Action | Destination |
|------|-------|-----------|-------------|-------------|
| Email Verification | `/verification-email` | `VerificationEmailCard` | Auto/Manual | `/account-created` |
| Account Created | `/account-created` | `AccountCreatedCard` | Continue Setup | `/profile-step-one` |
| Profile Step 1 | `/profile-step-one` | `ProfileStepOneForm` | Next | `/profile-step-two` |
| Profile Step 2 | `/profile-step-two` | `ProfileStepTwoForm` | Next | Role-based routing |
| Patient Profile | `/profile-role-patient` | `ProfileRolePatientForm` | Submit | `/verification-patient` |
| Provider Profile | `/profile-role-provider` | `ProfileRoleProviderForm` | Submit | Role-based verification |

### Verification Pages (Role-Based)

| Role | Route | Component | Documents Required | Next |
|------|-------|-----------|-------------------|------|
| Patient | `/verification-patient` | `VerificationPatientForm` | ID + Health Records | `/dashboard` |
| Doctor | `/verification-doctor` | `VerificationDoctorForm` | ID + License + Degree + Certs | `/dashboard` |
| Nurse | `/verification-nurse` | `VerificationNurseForm` | ID + License + Certs | `/dashboard` |
| Lab Technician | `/verification-lab` | `VerificationLabForm` | ID + License + Lab Logo + Affiliation + Certs | `/dashboard` |
| Pharmacist | `/verification-pharmacist` | `VerificationPharmacistForm` | ID + Pharmacist License + Pharmacy License + Image + Certs | `/dashboard` |

---

## LocalStorage Keys Used

| Key | Purpose | Set By | Used By |
|-----|---------|--------|---------|
| `signupEmail` | Store user email during signup | `SignupForm` | `VerificationEmailCard` |
| `selectedRole` | Store user role selection | `SignupForm` | Multiple pages for role-based routing |
| `resetEmail` | Store email for password reset | `ForgotPasswordForm` | `PasswordResetSentCard` |

---

## Navigation Logic

### Role-Based Routing (After Profile Step 2)

```typescript
const role = localStorage.getItem("selectedRole")

if (role === "patient") {
  router.push("/profile-role-patient")
} else {
  router.push("/profile-role-provider")
}
```

### Verification Routing (After Role Profile)

```typescript
const role = localStorage.getItem("selectedRole")

switch(role) {
  case "patient":
    router.push("/verification-patient")
    break
  case "doctor":
    router.push("/verification-doctor")
    break
  case "nurse":
    router.push("/verification-nurse")
    break
  case "lab-technician":
    router.push("/verification-lab")
    break
  case "pharmacist":
    router.push("/verification-pharmacist")
    break
}
```

---

## Back Button Navigation

| Current Page | Back Button Destination |
|--------------|------------------------|
| Profile Step 1 | `/account-created` |
| Profile Step 2 | `/profile-step-one` |
| Patient Profile | `/profile-step-two` |
| Provider Profile | `/profile-step-two` |
| All Verification Pages | Role profile page |

---

## Progress Indicators

All verification pages show a 4-step progress bar:
- Step 1: ✅ Blue (Profile Step 1 completed)
- Step 2: ✅ Blue (Profile Step 2 completed)
- Step 3: ✅ Blue (Role Profile completed)
- Step 4: ⚪ Gray (Verification in progress)

---

## Social Login Integration Points

Both `/login` and `/signup` pages include:
- Facebook OAuth button
- Google OAuth button
- Apple OAuth button

These are currently UI-only and need backend integration.

---

## Form Validation

All forms include:
- Real-time field validation
- Error message display
- Required field indicators
- Email format validation
- Password strength requirements (signup)
- Password confirmation matching (signup)

---

## File Upload Requirements

### Patient Verification
- ID Photo (front & back)
- Previous Health Records

### Doctor Verification
- ID Photo (front & back)
- Medical License/Permit (front & back)
- Medical Degree Certificates
- Professional Certifications

### Nurse Verification
- ID Photo
- Nursing License/Permit
- Professional Certifications

### Lab Technician Verification
- ID Photo (front & back)
- Laboratory Technician License (front & back)
- Laboratory Image/Logo
- Laboratory Affiliation Proof
- Professional Certifications

### Pharmacist Verification
- ID Photo (front & back)
- Pharmacist License (front & back)
- Pharmacy License (front & back)
- Pharmacy Image (displayed to patients)
- Professional Certifications

---

## Next Steps for Integration

1. **Backend API Integration**
   - Connect all forms to Supabase authentication
   - Implement file upload to Supabase Storage
   - Add real email verification
   - Implement OTP generation and validation

2. **Session Management**
   - Replace localStorage with secure session storage
   - Implement JWT token handling
   - Add authentication guards to protected routes

3. **Error Handling**
   - Add network error handling
   - Implement retry logic
   - Show user-friendly error messages

4. **Loading States**
   - Add loading spinners during API calls
   - Implement skeleton screens
   - Add progress indicators for file uploads

5. **Dashboard Implementation**
   - Build role-specific dashboards
   - Replace placeholder dashboard page
   - Implement post-login routing logic
