"use client";

import Link from "next/link";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  FlaskConical,
  Bell,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  Box,
  Search,
  ChevronRight,
  Heart,
  Stethoscope,
  Syringe,
  Activity,
  ChevronLeft,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);

  // ============================================================================ 
  // SIDEBAR COMPONENT
  // ============================================================================
  const Sidebar = () => {
    return (
      <aside className="w-[200px] bg-background border-r border-border h-screen flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-foreground" />
          <span className="font-bold text-lg">Medlink360</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {/* MAIN Section */}
          <div className="mb-6">
            <div className="px-6 mb-2">
              <p className="text-xs font-semibold text-muted-foreground">MAIN</p>
            </div>
            <div className="space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <BookOpen className="w-5 h-5" />
                <span>My Medical Book</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <FileText className="w-5 h-5" />
                <span>Prescriptions</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <FlaskConical className="w-5 h-5" />
                <span>Lab Results</span>
              </Link>
            </div>
          </div>

          {/* RECORD Section */}
          <div>
            <div className="px-6 mb-2">
              <p className="text-xs font-semibold text-muted-foreground">RECORD</p>
            </div>
            <div className="space-y-1">
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <Bell className="w-5 h-5" />
                <span>Notification</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
                <HelpCircle className="w-5 h-5" />
                <span>Help</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsDark(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${!isDark ? 'bg-background' : ''}`}
            >
              <Sun className="w-4 h-4" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => setIsDark(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${isDark ? 'bg-background' : ''}`}
            >
              <Moon className="w-4 h-4" />
              <span className="text-sm">Dark</span>
            </button>
          </div>
        </div>
      </aside>
    );
  };

  // ============================================================================ 
  // NAVBAR COMPONENT
  // ============================================================================
  const Navbar = () => {
    return (
      <header className="h-16 border-b border-border bg-background flex items-center px-6 gap-4">
        {/* Menu and Cube Icons */}
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Box className="w-5 h-5" />
        </Button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Type any crypto currency" 
            className="pl-10 bg-muted border-0"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <span className="text-lg">🇺🇸</span>
          </Button>
        </div>
      </header>
    );
  };

  // ============================================================================ 
  // MAIN DASHBOARD CONTENT
  // ============================================================================
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Paste all your original dashboard content exactly as is */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
