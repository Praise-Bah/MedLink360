# MedLink360 - Healthcare Management Platform

A comprehensive healthcare management system connecting patients with healthcare providers.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Git
- npm or yarn
- Supabase account (for database)
- Codeium extension for your IDE

## 🧩 MCP Server Setup

MCP (Model Context Protocol) servers provide AI-assisted development by offering documentation and code examples. Follow these steps to set them up:

### 1. Codeium Integration
Windsurf comes with built-in Codeium functionality, so there's no need to install any additional extensions. The MCP servers are already configured to work seamlessly with Windsurf.

### 2. Configure MCP Servers
Create or update your MCP configuration file at `~/.codeium/windsurf/mcp_config.json` with the following content:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp"
      ]
    },
    "BMAD-METHOD Docs": {
      "serverUrl": "https://gitmcp.io/bmad-code-org/BMAD-METHOD"
    },
    "SupabaseAuthWithSSR Docs": {
      "serverUrl": "https://gitmcp.io/ElectricCodeGuy/SupabaseAuthWithSSR"
    },
    "django-supabase-auth Docs": {
      "serverUrl": "https://gitmcp.io/b3b/django-supabase-auth"
    },
    "django-storage-supabase Docs": {
      "serverUrl": "https://gitmcp.io/J0/django-storage-supabase"
    },
    "Django-Supabase Docs": {
      "serverUrl": "https://gitmcp.io/PARTHIB-DEB/Django-Supabase"
    },
    "next-supabase-starter Docs": {
      "serverUrl": "https://gitmcp.io/Mohamed-4rarh/next-supabase-starter"
    },
    "debugpy Docs": {
      "serverUrl": "https://gitmcp.io/microsoft/debugpy"
    }
  }
}
```

### 3. Refresh MCP Servers
After setting up the configuration:

1. Restart your IDE
2. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P)
3. Search for "Codeium: Refresh MCP Servers" and select it
4. Wait for the servers to initialize (check the status bar)

### 4. Verify MCP Servers
To verify the MCP servers are working:
1. Open any file in your project
2. Look for the Codeium icon in your status bar
3. Click on it to see the list of available MCP servers
4. Ensure all servers show as connected

### Available MCP Servers
1. **Context7** - General library documentation
2. **BMAD-METHOD Docs** - BMAD methodology implementation
3. **SupabaseAuthWithSSR Docs** - Next.js + Supabase auth
4. **django-supabase-auth Docs** - Django auth with Supabase
5. **django-storage-supabase Docs** - File storage with Supabase
6. **Django-Supabase Docs** - General Django + Supabase integration
7. **next-supabase-starter Docs** - Next.js + Supabase starter
8. **debugpy Docs** - Python debugging tools for VS Code

### Troubleshooting
- If servers don't connect, check your internet connection
- Ensure you're using the latest version of the Codeium extension
- Restart your IDE if servers fail to initialize
- Check the Codeium output window for any error messages

## 🛠 Setup Instructions

### For All Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blackysynch/MedLink360.git
   cd MedLink360
   ```

2. **Run the setup script**
   ```bash
   # Make the script executable (Linux/Mac)
   chmod +x setup.sh
   
   # Run the setup script
   ./setup.sh
   ```
   On Windows, you can run the script using Git Bash or WSL.

### 🖥 Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and update with your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
   Update the following in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:3000`

### ⚙️ Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Set up Python virtual environment**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Copy `.env.example` to `.env` and update with your configuration:
   ```bash
   cp .env.example .env
   ```
   Update the following in `.env`:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=your-database-url
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

5. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (admin)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server**
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000/api`
   Admin panel: `http://localhost:8000/admin`

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Frontend Architecture](docs/FRONTEND.md)
- [Backend Architecture](docs/BACKEND.md)

## 🤝 Contributing

### Creating a branch
1. Fork the repository
2. Clone the repository to your local machine
3. Create a new branch (`git checkout -b feature/AmazingFeature`)
4. Make your changes
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)

### Taking someone's branch
1. Fork the repository
2. Clone the repository to your local machine
3. Add the upstream repository as a remote (`git remote add upstream https://github.com/Blackysynch/MedLink360.git`)
4. Fetch the branches from the upstream repository (`git fetch upstream`)
5. Checkout the branch you want to work on (`git checkout upstream/feature/AmazingFeature`)
6. Create a new branch from the upstream branch (`git checkout -b feature/AmazingFeature`)
7. Make your changes
8. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
9. Push to the branch (`git push origin feature/AmazingFeature`)
10. Open a Pull Request

### Merging someone's branch
1. Fork the repository
2. Clone the repository to your local machine
3. Add the upstream repository as a remote (`git remote add upstream https://github.com/Blackysynch/MedLink360.git`)
4. Fetch the branches from the upstream repository (`git fetch upstream`)
5. Checkout the branch you want to merge into (`git checkout main`)
6. Merge the branch you want to merge (`git merge upstream/feature/AmazingFeature`)
7. Push the changes to your repository (`git push origin main`)


## Suggested Model Workflow in Windsurf

Frontend (from Figma) → Claude 3.5 Sonnet

Backend (Django + Supabase, APIs, role-based logic) → GPT-4.1
Debugging (logs, errors, runtime issues) → GPT-4o Mini or Claude Sonnet 4

Free Models (GPT-3.5, Claude Haiku) → only for repetitive tasks, docs, or small fixes


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Your Name](https://github.com/yourusername)
- [Team Member](https://github.com/teammember)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Django](https://www.djangoproject.com/)
- [Supabase](https://supabase.com/)
