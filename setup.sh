#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Detect OS for cross-platform compatibility
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    MSYS*)      MACHINE=Git;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo -e "${YELLOW}🚀 Starting MedLink360 setup on ${MACHINE}...${NC}"

# Function to activate virtual environment based on OS
activate_venv() {
    if [[ "$MACHINE" == "MinGw" || "$MACHINE" == "Git" || "$MACHINE" == "Cygwin" ]]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
}

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python is not installed. Please install Python 3.9+ and try again.${NC}"
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python"
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ and try again.${NC}"
    exit 1
fi

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo -e "${GREEN}📁 Creating backend directory...${NC}"
    mkdir -p backend
    cd backend
    
    # Set up Python virtual environment
    echo -e "${GREEN}🐍 Setting up Python virtual environment...${NC}"
    $PYTHON_CMD -m venv venv
    
    # Activate virtual environment
    activate_venv
    
    # Install Python dependencies
    echo -e "${GREEN}📦 Installing Python dependencies...${NC}"
    pip install --upgrade pip
    pip install django djangorestframework django-cors-headers python-dotenv supabase psycopg2-binary
    
    # Create Django project
    echo -e "${GREEN}🏗️  Creating Django project...${NC}"
    django-admin startproject medlink360 .
    
    # Create requirements.txt
    pip freeze > requirements.txt
    
    # Create .env file from example if it doesn't exist
    if [ ! -f ".env" ] && [ -f "../.env.example" ]; then
        cp ../.env.example .env
        echo -e "${YELLOW}ℹ️  Please update the .env file with your configuration${NC}"
    fi
    
    # Run initial migrations
    echo -e "${GREEN}🗄️  Running initial database migrations...${NC}"
    $PYTHON_CMD manage.py migrate
    
    # Create superuser prompt
    echo -e "${YELLOW}👤 Would you like to create a superuser? (y/n)${NC}"
    read -r create_superuser
    if [[ $create_superuser == "y" || $create_superuser == "Y" ]]; then
        $PYTHON_CMD manage.py createsuperuser
    fi
    
    cd ..
else
    echo -e "${YELLOW}📁 Backend directory already exists, skipping backend setup...${NC}"
fi

# Create frontend directory if it doesn't exist
if [ ! -d "frontend" ]; then
    echo -e "${GREEN}📁 Creating frontend directory...${NC}"
    npx create-next-app@latest frontend --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
    cd frontend
    
    # Install additional dependencies
    echo -e "${GREEN}📦 Installing frontend dependencies...${NC}"
    npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared @heroicons/react react-hook-form zod @hookform/resolvers
    
    # Create .env.local from example if it doesn't exist
    if [ ! -f ".env.local" ] && [ -f "../.env.example" ]; then
        cp ../.env.example .env.local
        echo -e "${YELLOW}ℹ️  Please update the .env.local file with your configuration${NC}"
    fi
    
    cd ..
else
    echo -e "${YELLOW}📁 Frontend directory already exists, skipping frontend setup...${NC}"
fi

echo -e "${GREEN}✨ Setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Update the environment variables in both backend/.env and frontend/.env.local"
echo "2. Configure your Supabase project settings"
echo "3. Start the backend: cd backend && $PYTHON_CMD manage.py runserver"
echo "4. In a new terminal, start the frontend: cd frontend && npm run dev"
echo -e "\n${GREEN}Happy coding! 🚀${NC}"
