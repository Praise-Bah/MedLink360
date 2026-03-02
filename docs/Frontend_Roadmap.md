# MedLink360 Frontend Roadmap

Status: Planning & Implementation In Progress
Owner: Frontend Team
Version: v1.0
Last Updated: 2026-01-20

---

## Phase 1: Foundations (Setup + Tokens)
- [x] Confirm Figma access and screen inventory
- [x] Extract design tokens (colors, typography, spacing, radii)
- [x] Normalize font usage (Inter) and base CSS variables
- [x] Define shared UI primitives (Button, Input, Card, Modal, Badge)
- [x] Configure API client + env variables for backend

## Phase 2: Authentication & Onboarding
- [x] Welcome / Landing connection
- [x] Register screen (Figma Desktop - Register / Node 1:614)
- [x] Login screen (Figma Node 1:614)
- [x] Forgot password modal (Figma Node 1:731)
- [x] Password reset email sent confirmation (Figma Node 1:689)
- [x] Email OTP verification (Figma Node 1:705)
- [x] Password reset success (Figma Node 1:767)
- [x] Role selection screen
- [x] Email verification sent confirmation (Desktop - 34)
- [x] Account created success state + CTA (Desktop - 36)
- [x] Profile completion wizard - Step 1: Personal data + agreement + ITIN (Desktop - 22)
- [x] Profile completion wizard - Step 2: Contacts + home address (Desktop - 23)
- [x] Role-based profile fields - Provider (Doctor/Nurse/Lab/Pharmacist) professional info (Desktop - 24)
- [x] Role-based profile fields - Patient department + hospital history (Desktop - 29)
- [x] Role-based verification uploads - Patient previous health copy + ID (Desktop - 30 / Node 1:1068)
- [x] Role-based verification uploads - Nurse ID + license + certifications (Desktop - 25 / Node 1:1006)
- [x] Role-based verification uploads - Doctor ID + license + degree + certifications (Desktop - 27 / Node 1:1205)
- [x] Role-based verification uploads - Lab technician ID + license + lab proof/logo + certifications (Desktop - 26 / Node 1:1117)
- [x] Role-based verification uploads - Pharmacist ID + pharmacist license + pharmacy license + pharmacy image + certifications (Desktop - 28 / Node 1:1280)
- [x] Basic form validation states
- [x] Social login buttons (Facebook, Google, Apple) with proper icons
- [x] Progress indicators for multi-step verification flows
- [x] Complete navigation flow between all authentication pages

## Phase 3: Core Layout + Navigation
- [x] Global app shell (header/sidebar) - AppShell component with responsive layout
- [x] Notifications dropdown + unread badge - Implemented in AppShell header
- [x] Role-aware navigation menu - Filters menu items based on user role
- [x] Basic dashboard layout with stats and activity feed
- [x] Role-specific dashboard content - Dynamic loading based on user role
- [x] Patient dashboard with health metrics, appointments, allergies, profile card
- [x] Doctor dashboard with patient overview, appointment requests, schedule
- [x] Nurse dashboard with patient care overview, tasks, assigned patients
- [x] Lab Technician dashboard with test queue, pending results, inventory alerts
- [x] Pharmacist dashboard with drug dispensing, prescriptions, inventory alerts

## Phase 4: Patient Module
- [ ] Patient dashboard
- [ ] Medical book (timeline + visit details)
- [ ] QR access management
- [ ] Appointments (search + booking)
- [ ] Profile + verification flows

## Phase 5: Provider Modules (Doctor / Nurse / Lab)
- [ ] Provider dashboards
- [ ] QR scanner flow
- [ ] Patient management + medical book editing
- [ ] Lab order queue + results entry
- [ ] Notifications

## Phase 6: Pharmacist Module
- [ ] Pharmacist dashboard
- [ ] Patient prescription fulfillment
- [ ] Dispensing confirmation UI
- [ ] Pharmacy profile & verification

## Phase 7: Admin Modules
- [ ] Hospital admin dashboard
- [ ] Staff verification queue
- [ ] Ministry of Health dashboard
- [ ] Broadcasting system UI

## Phase 8: Integration + Realtime
- [ ] Wire all pages to backend APIs
- [ ] Integrate Supabase realtime notifications
- [ ] Error handling + empty states
- [ ] Loading + skeleton states

## Phase 9: QA + Deployment
- [ ] Responsive audit (mobile/tablet/desktop)
- [ ] Accessibility checks
- [ ] Frontend tests (unit + integration)
- [ ] Performance optimization
- [ ] Deployment readiness

---

## Implementation Notes
- All frontend work lives in `frontend/`
- Follow `Project Overview.md` for feature requirements
- Maintain `PROJECT_STRUCTURE.md` after new files
- Update `context/frontend_context.json` after major steps
