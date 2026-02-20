# MedLink360 Project Structure

## Directory Structure

```
MedLink360/
├── backend/                     # Django backend
│   ├── accounts/               # User authentication app
│   │   ├── models.py          # User and Profile models
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py          # Authentication views
│   │   ├── urls.py           # Authentication URLs
│   │   └── tests/
│   │
│   ├── core/                   # Core functionality
│   │   ├── models/           # Base models
│   │   ├── utils/            # Utility functions
│   │   └── permissions.py    # Custom permissions
│   │
│   ├── api/                   # API endpoints
│   │   ├── v1/               # API version 1
│   │   │   ├── urls.py       # API URL routing
│   │   │   ├── views/        # API views
│   │   │   └── serializers/  # API serializers
│   │   └── __init__.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
│
├── frontend/                   # Next.js frontend
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── app/                        # App router
│   │   │   ├── (auth)/                # Authentication routes
│   │   │   │   ├── login/page.tsx     # Login page
│   │   │   │   ├── signup/page.tsx    # Signup page
│   │   │   │   └── forgot-password/page.tsx
│   │   │   ├── entry/                  # Entry (Desktop-32)
│   │   │   │   └── page.tsx            # Sign in/sign up choice
│   │   │   ├── role-selection/         # Role selection
│   │   │   │   └── page.tsx            # Role selection page
│   │   │   ├── profile-step-one/       # Profile completion step 1
│   │   │   │   └── page.tsx            # Personal data + agreement + ITIN
│   │   │   ├── profile-step-two/       # Profile completion step 2
│   │   │   │   └── page.tsx            # Contacts + home address
│   │   │   ├── profile-role-provider/  # Role-based profile fields (provider)
│   │   │   │   └── page.tsx            # Professional title + hospital
│   │   │   ├── profile-role-patient/   # Role-based profile fields (patient)
│   │   │   │   └── page.tsx            # Department + hospital history
│   │   │   ├── verification-patient/   # Verification uploads (patient)
│   │   │   │   └── page.tsx            # Patient previous health copy
│   │   │   ├── verification-nurse/     # Verification uploads (nurse)
│   │   │   │   └── page.tsx            # Nurse license + certifications
│   │   │   ├── verification-doctor/    # Verification uploads (doctor)
│   │   │   │   └── page.tsx            # Doctor license + degree
│   │   │   ├── verification-lab/       # Verification uploads (lab tech)
│   │   │   │   └── page.tsx            # Lab license + lab proof
│   │   │   ├── verification-pharmacist/ # Verification uploads (pharmacist)
│   │   │   │   └── page.tsx            # Pharmacy licenses + logo
│   │   │   ├── welcome/                # Welcome (Desktop-33)
│   │   │   │   └── page.tsx            # Welcome landing card
│   │   │   ├── dashboard/page.tsx     # Main dashboard
│   │   │   ├── patients/             # Patient management
│   │   │   │   ├── page.tsx          # Patients list
│   │   │   │   └── [id]/page.tsx     # Patient details
│   │   │   └── layout.tsx            # Main layout
│   │   │
│   │   ├── components/               # Reusable components
│   │   │   ├── common/              # Common UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── auth/                 # Auth components
│   │   │   │   ├── entry-card.tsx     # Entry card (Desktop-32)
│   │   │   │   ├── profile-step-one-form.tsx # Profile completion step 1 form
│   │   │   │   ├── profile-step-two-form.tsx # Profile completion step 2 form
│   │   │   │   ├── profile-role-provider-form.tsx # Provider role profile form
│   │   │   │   ├── profile-role-patient-form.tsx # Patient role profile form
│   │   │   │   ├── verification-upload-form.tsx # Shared verification upload layout
│   │   │   │   ├── verification-patient-form.tsx # Patient verification uploads
│   │   │   │   ├── verification-nurse-form.tsx # Nurse verification uploads
│   │   │   │   ├── verification-doctor-form.tsx # Doctor verification uploads
│   │   │   │   ├── verification-lab-form.tsx # Lab technician verification uploads
│   │   │   │   ├── verification-pharmacist-form.tsx # Pharmacist verification uploads
│   │   │   │   ├── role-selection.tsx # Role selection UI
│   │   │   │   └── welcome-card.tsx   # Welcome card (Desktop-33)
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/                  # UI component library
│   │   │
│   │   ├── context/                 # React context providers
│   │   │   ├── AuthContext.tsx      # Authentication state
│   │   │   └── ThemeContext.tsx     # Theme management
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useApi.ts
│   │   │
│   │   ├── lib/                     # Utility functions
│   │   │   ├── api.ts              # API client
│   │   │   └── utils.ts            # Helper functions
│   │   │
│   │   ├── styles/                  # Global styles
│   │   │   ├── globals.css
│   │   │   └── theme.ts
│   │   │
│   │   └── types/                   # TypeScript types
│   │       ├── index.ts
│   │       └── models.ts
│   │
│   ├── package.json
│   ├── next.config.js
│   └── tsconfig.json
│
├── context/                    # Context tracking for AI assistance
│   ├── frontend_context.json   # Tracks frontend development progress
│   └── backend_context.json    # Tracks backend development progress
│
├── docs/                       # Project documentation
│   ├── api/                   # API documentation
│   ├── setup/                 # Setup guides
│   └── Frontend_Roadmap.md    # Frontend implementation roadmap
│
├── .github/                    # GitHub workflows
│   ├── workflows/
│   │   ├── ci.yml            # CI pipeline
│   │   └── cd.yml            # CD pipeline
│   └── dependabot.yml         # Dependency updates
│
├── .gitignore
├── README.md
└── setup.sh                    # Setup script

## Context Folder Explanation

The `context/` directory is a special directory used to maintain development context for AI assistance. It helps track the project's state and progress, making it easier for AI tools (like Windsurf AI) to understand the current development status.

### frontend_context.json
This file tracks the frontend development progress, including:
- Current focus area
- Component status (planned, in-progress, completed)
- API integration status
- Recent changes and next steps
- Known issues and TODOs

### backend_context.json
This file tracks the backend development progress, including:
- Database schema status
- API endpoints implementation status
- Authentication setup
- Integration points with external services
- Recent changes and next steps

### How to Use the Context Files
1. **For Developers**:
   - Check the context files before starting work on a new feature
   - Update the files when making significant changes
   - Add TODOs and known issues you encounter

2. **For AI Assistants**:
   - Read the context files to understand the current project state
   - Update the context when making changes
   - Use the context to provide more accurate and relevant assistance

3. **For Team Leads**:
   - Review context files to track team progress
   - Update project priorities and status
   - Identify blockers and areas needing attention

These context files help maintain project continuity, especially when multiple developers or AI assistants are working on different parts of the project. They serve as a living documentation of the project's current state and development progress.
```

## Frontend Structure Details

### `/src/app`
- `page.tsx` - Main page components
- `layout.tsx` - Layout components
- `api/` - API route handlers

### `/src/components`
- `common/` - Shared UI components (buttons, inputs, etc.)
- `dashboard/` - Dashboard specific components
- `layout/` - Layout components (header, footer, sidebar)
- `ui/` - UI component library

## Backend Structure Details

### `/accounts`
- User authentication and profile management
- JWT token handling

### `/api`
- REST API endpoints
- Request/response schemas
- API documentation

### `/core`
- Business logic
- Database models
- Utility functions

## Environment Variables

### Backend (`.env`)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/medlink360
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
## Setup Instructions

1. Clone the repository
2. Run `./setup.sh` to install dependencies
3. Copy `.env.example` to `.env` and update with your credentials
4. Run the development servers:
   - Backend: `cd backend && python manage.py runserver`
   - Frontend: `cd frontend && npm run dev`

## Development Workflow

1. Create a new branch for your feature
2. Update the relevant context file before starting work
3. Make your changes
4. Update the context file with your progress
5. Create a pull request
6. After review, merge to main branch
