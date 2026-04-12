# MedLink360 Frontend Project Status

This document gives a detailed overview of the current state of the **MedLink360** frontend codebase. It is intended both for humans and for the in‑app AI assistant, so it can answer questions about what is implemented, what each major area does, and what is still in progress.

---

## 1. High‑Level Overview

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **State**: Primarily React hooks and local component state
- **Auth**: Custom forms (no full auth backend wired yet), role stored in `localStorage` under `selectedRole`
- **Roles Supported (UI level)**:
  - Patient (`patient`)
  - Doctor (`doctor`)
  - Nurse (`nurse`)
  - Lab Technician (`lab-technician`)
  - Pharmacist (`pharmacist`)
  - Hospital Admin (`hospital-admin`)
- **Data**: Currently relies heavily on **mock data** for tables, dashboards, and analytics. Backend connectivity is not yet wired.
- **Layout**: `AppShell` component provides a shared sidebar + header for most authenticated pages, with role‑based navigation.

The project is in an advanced **UI / UX completion** phase, but many **detail views/modals** and **live backend connections** are still pending.

---

## 2. Routing & Major Screens (src/app)

### 2.1 Root and Landing

- `/` → `src/app/page.tsx`
  - Immediately redirects to `/welcome`.

- `/welcome` → `src/app/welcome/page.tsx`
  - Renders `WelcomeCard` (from `components/auth/welcome-card`).
  - Initial welcome / entry into the MedLink360 experience.

- `/landing` → `src/app/landing/page.tsx`
  - Landing page composed of:
    - `LandingHeader`
    - `HeroSection`
    - `WelcomeSection`
    - `HealthcareAccessCard`
    - `HowItWorksSection`
  - Marketing/overview view aimed at explaining the platform.

### 2.2 Auth & Onboarding

- `/login` → `SigninForm`
  - Handles email/password (or equivalent) login **UI only**.

- `/signup` → `SignupForm`
  - Handles registration / account creation **UI only**.

- `/role-selection` → `RoleSelection`
  - Allows the user to pick a role (patient, doctor, nurse, etc.).
  - Selected role is saved to `localStorage` as `selectedRole`.

- Numerous verification / OTP / success pages under:
  - `/verification-*`, `/email-otp-verification`, `/password-reset-*`, `/account-created`, etc.
  - These are mostly **UI flows** with no real backend integration yet.

### 2.3 Shared Dashboard Shell and Role‑Based Dashboards

- `/dashboard` → `src/app/dashboard/page.tsx`
  - **Uses `AppShell`** (`components/layout/app-shell`).
  - Reads `selectedRole` from `localStorage` and renders:
    - `PatientDashboardContent` (patient)
    - `DoctorDashboardContent` (doctor)
    - `NurseDashboardContent` (nurse)
    - `LabDashboardContent` (lab-tech)
    - `PharmacistDashboardContent` (pharmacist)
    - `AdminDashboard` (hospital-admin)
  - If no role is set, shows a welcome message asking the user to select a role.

#### Hospital Admin Dashboard (`AdminDashboard`)
- File: `src/components/hospital-admin/admin-dashboard.tsx`
- **Status**: **Implemented and Figma‑aligned**
- Features:
  - Top header with title, **Last Update**, **Export to CSV**, and **Generate Report** actions.
  - Three stats cards: **Billing Insights**, **Patient Record**, and **Surgeries Performed**, with mock metrics and breakdowns.
  - Charts row:
    - Left: “Patient In / Out” line chart **placeholder** (dashed border box, no real chart library yet).
    - Right: Donut “Report” card with mock 70% ring and legend (Urgent, Low, Moderate).
  - Patient list table:
    - Columns: Patient Name, ID Number, Admission Date, Assigned Department, Room Number, Status.
    - Uses mock `patients` array.
    - Row click navigates to `/admin/patients/[id]` (detail page **pending**).

### 2.4 General Patient & Appointment Flows

- `/appointments` → `src/app/appointments/page.tsx`
  - Uses `AppShell`.
  - Reads role from `localStorage` and renders:
    - `NurseUpcomingAppointments` (nurse)
    - `AppointmentsPage` (patient) – calendar/booking overview.
    - `MyAppointments` (other roles).
  - **Status**: Implemented and role‑aware, backed by mock data.

- `/patients` → `src/app/patients/page.tsx`
  - Uses `AppShell`.
  - Renders `components/patients/patient-records`.
  - **Status**: Implemented patient records list for general patient context (not admin‑specific).

- `/lab-results`, `/medical-book`, `/qr-access`, `/notifications`, `/settings`, etc.
  - Each has its own `page.tsx` rendering the corresponding component (see `components/dashboard`, `components/medical-book`, `components/scan-qr`, etc.).
  - **Status**: Mostly implemented for UI demonstration with mock data.

### 2.5 Hospital Admin Routes (Under /admin)

All `/admin/*` routes use `AppShell` and render hospital admin components from `src/components/hospital-admin`.

- `/admin/staff` → `StaffManagement`
  - Staff directory view with filters, search, table listing doctors/staff.
  - **Status**: **Overview implemented & aligned with Figma**. Detail view/modal for individual staff member is **pending**.

- `/admin/patients` → `components/hospital-admin/patient-records`
  - Admin‑specific patient records list with stats and a table.
  - **Status**: Overview implemented with mock data. Detail page `/admin/patients/[id]` is **not yet implemented**.

- `/admin/appointments` → `AppointmentsManagement`
  - Calendar‑style weekly appointment view with colored appointment cards.
  - Detail overlay pop‑up for a selected appointment.
  - **Status**:
    - Calendar overview implemented and visually aligned with Figma.
    - Appointment detail actions (reschedule, cancel, etc.) are mostly UI; no backend.
    - Dedicated detail page/modal separate from the overlay is **still pending**, per TODO.

- `/admin/departments` → `Departments`
  - Grid of department cards, stats, search/filter.
  - **Status**: Implemented with mock data; mostly UI‑complete.

- `/admin/laboratory` → `Laboratory`
  - Lab tests table with filters, actions like **View Details**, **Download Result**, **Collect Sample**.
  - **Status**:
    - Overview table implemented and styled.
    - Lab test detail view/modal is **pending**.

- `/admin/reports` → `Reports`
  - Implemented as **Hospital Analytics → Services** page per Figma.
  - Header with **Total Services**, Export, and **New Services** button.
  - Toolbar with **Search**, **Filter**, and **Sort By: Recent** controls.
  - Services table (Service Name, Department, Price, Status, actions) using mock data.
  - Pagination footer.
  - **Status**:
    - Services overview is implemented and aligned with Figma.
    - Per‑service detail view/modal is **pending**.

---

## 3. Layout & Shared Components

### 3.1 AppShell (Main Layout)

- File: `src/components/layout/app-shell.tsx`
- Responsibilities:
  - Provides **sidebar navigation**, **top header**, and content area for authenticated screens.
  - Uses `navigationItems` with `roles` to control which items each role sees.
  - Sidebar includes sections like **Main** and **Record**.
  - For `hospital-admin`, navigation includes:
    - Dashboard, Staff Management, Patient Records, Appointments, Departments, Laboratory, Reports.
  - Persists sidebar collapsed state in `localStorage` (`sidebarCollapsed`).
  - Handles mobile sidebar open/close.
  - Contains a placeholder search input in the header (currently not wired to real search).

### 3.2 Landing Components

- Folder: `src/components/landing/`
  - `hero-section.tsx` – Top hero area of the landing page.
  - `welcome-section.tsx` – Explains MedLink360 welcome messaging.
  - `healthcare-access-card.tsx` – Card explaining easy access to healthcare.
  - `how-it-works-section.tsx` – Steps / flow explanation.
  - `services-section.tsx`, `why-choose-us-section.tsx`, etc. – Additional marketing sections.
- **Status**: Implemented and hooked up to `/landing`.

### 3.3 Dashboard Components (Per Role)

- Folder: `src/components/dashboard/`
  - `patient-dashboard-content.tsx` – Patient overview cards, quick shortcuts.
  - `doctor-dashboard-content.tsx` – Doctor KPIs, upcoming appointments, patient list.
  - `nurse-dashboard-content.tsx` – Nurse tasks, assigned patients, medication rounds.
  - `lab-dashboard-content.tsx` – Lab‑specific stats and pending tests.
  - `pharmacist-dashboard-content.tsx` – Prescription workflow stats.
  - `appointments-page.tsx` – Patient appointments overview.
  - `lab-results-page.tsx` – Patient lab results.
  - `medical-book-page.tsx`, `notifications-page.tsx`, `settings-page.tsx`, `profile-page.tsx`, etc.
- **Status**: These are **UI‑complete for demo purposes** with mock data and navigation only. Real backend data and mutations are not yet integrated.

### 3.4 Hospital Admin Components

- Folder: `src/components/hospital-admin/`
  - `admin-dashboard.tsx` – Admin overview dashboard (see Section 2.3 above).
  - `staff-management.tsx` – Staff list & filters for hospital admin.
  - `patient-records.tsx` – Admin patient records list.
  - `appointments-management.tsx` – Calendar‑style appointments view.
  - `departments.tsx` – Department management UI.
  - `laboratory.tsx` – Lab tests management UI.
  - `reports.tsx` – Services analytics table page.
- **Status summary**:
  - **Overview pages** for all these areas are implemented and mostly aligned with Figma.
  - Detail views/modals for **staff**, **appointments**, **lab tests**, and **services/reports** are **still pending** per TODO list.

### 3.5 Auth Components

- Folder: `src/components/auth/`
  - `signin-form.tsx` – Login form UI.
  - `signup-form.tsx` – Registration UI.
  - `role-selection.tsx` – Role selection.
  - `welcome-card.tsx` – Card shown on `/welcome`.
  - Additional components for verification, OTP, reset flows.
- **Status**: All flows are currently **front‑end only**; real authentication/authorization backend is not connected.

---

## 4. In‑App PM Assistant Feature

- Feature folder: `src/features/pm-assistant/`
  - `PMAssistantWidget.tsx`
    - Floating, **draggable** circular button anchored by default near bottom-right.
    - Saves position in `localStorage` under `pm-assistant-position` and **clamps** to viewport on mount so it remains visible even when screen size changes.
    - Manages open/close state, message history, loading states.
  - `ChatPanel.tsx`
    - Chat UI: header, messages list, input, **Send** button, and a checkbox **“Mark as feedback for developer”**.
    - **Responsive**:
      - On small screens: almost full-width panel centered near the bottom with `max-h-[75vh]` and scroll.
      - On larger screens: compact card near bottom-right.
  - `MessageBubble.tsx`
    - Renders user vs assistant messages with different styling.
  - `assistant-api-client.ts`
    - Sends `POST` requests to `/api/pm-assistant` with messages, page URL, and chat type (`question` / `feedback`).
  - `types.ts`, `config.ts`
    - Shared types and constants (assistant name, max messages, local storage key).

- Global mount:
  - `src/app/layout.tsx` imports `PMAssistantWidget` and renders it inside `<body>` so it appears on **all pages**.

- API route: `src/app/api/pm-assistant/route.ts`
  - Handles `POST` requests with:
    - `messages`: array of `{ role, content }`.
    - `pageUrl`: current page URL.
    - `type`: `"question" | "feedback"`.
  - Calls **OpenRouter** (`openai/gpt-4o-mini`) with:
    - A friendly system prompt tailored for the **product owner**.
    - Conversation history.
  - For `type === "feedback"`, sends a **Gmail SMTP** email containing:
    - Timestamp.
    - Page URL.
    - Product owner’s message.
    - Assistant reply (if any).
  - Uses env vars:
    - `OPENROUTER_API_KEY`
    - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `PM_FEEDBACK_EMAIL`
  - **Logging** beyond email (e.g., DB) is intentionally not implemented per project decision; Gmail acts as the log.

- **Daily summary** endpoint and cron
  - Not yet implemented. The plan is to later read feedback emails (via Gmail API/IMAP) and summarise them with OpenRouter in a scheduled job.

---

## 5. Implementation Status by Area

### Completed / Mostly Complete (UI level)

- Landing and marketing pages (`/landing` and sections under `components/landing`).
- Auth & onboarding UIs (`/login`, `/signup`, `/role-selection`, `/welcome`, verification/reset flows) – **front‑end only**.
- `AppShell` layout with role‑based navigation and responsive sidebar.
- Role‑based dashboard content for patient/doctor/nurse/lab/pharmacist (mock data).
- Hospital Admin Dashboard (`AdminDashboard`) aligned with Figma.
- Hospital Admin:
  - Staff Management overview table.
  - Patient Records overview.
  - Appointments calendar overview (Hospital admin appointments‑management).
  - Departments overview.
  - Laboratory overview table.
  - Reports → Services analytics page.
- PM Assistant widget feature (floating, draggable, responsive, integrated with OpenRouter and Gmail).

### In Progress / Pending

- **Detail views / modals for hospital admin**:
  - Staff detail (from Staff Management table actions).
  - Appointment detail (richer than current overlay; includes full Figma‑style design and actions).
  - Lab test detail view (from Laboratory table actions).
  - Service/report detail view (from Services page actions).

- **Backend integration**:
  - Real auth (login/signup using Supabase or another provider).
  - Real appointment, patient, lab, and staff data from backend APIs.
  - Mutations (create/edit/delete) for admin actions (currently only UI level).

- **PM Assistant logging & daily summary**:
  - Interaction logging beyond Gmail (database or Gmail API based summarisation).
  - `/api/pm-assistant/daily-summary` endpoint and Vercel Cron job.

---

## 6. How the Assistant Should Use This Document

When answering the product owner’s questions, the assistant should:

- Use this document as **authoritative context** for:
  - Which features exist.
  - Which areas are still being built.
  - What is mock vs real.
- Be honest:
  - Clearly say when an area is **pending** or **UI‑only**.
  - Avoid claiming live data or full backend where only mock data exists.
- Provide navigation help:
  - Mention which sidebar items or URLs correspond to requested functionality.
- Use the **Implementation Status** section to answer questions like:
  - “Is the staff detail page ready?” → Pending.
  - “Is this appointment data real?” → Currently mock.
  - “What’s the purpose of the /admin/reports page?” → Services analytics table per Figma.

This file should be updated regularly as new features are implemented or wired to the backend so that the in‑app assistant stays in sync with the real project state.
