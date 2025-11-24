"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home, BookOpen, Calendar, FileText, FlaskConical,
  Bell, Settings, HelpCircle, Sun, Moon
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <aside className="w-[200px] bg-background border-r border-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-foreground" />
        <span className="font-bold text-lg">Medlink360</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <div className="mb-6">
          <div className="px-6 mb-2">
            <p className="text-xs font-semibold text-muted-foreground">MAIN</p>
          </div>
          <div className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <Home className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <BookOpen className="w-5 h-5" /> My Medical Book
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <Calendar className="w-5 h-5" /> Appointments
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <FileText className="w-5 h-5" /> Prescriptions
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <FlaskConical className="w-5 h-5" /> Lab Results
            </Link>
          </div>
        </div>

        <div>
          <div className="px-6 mb-2">
            <p className="text-xs font-semibold text-muted-foreground">RECORD</p>
          </div>
          <div className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <Bell className="w-5 h-5" /> Notification
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <Settings className="w-5 h-5" /> Settings
            </Link>
            <Link href="#" className="flex items-center gap-3 px-6 py-2 text-sm hover:bg-accent">
              <HelpCircle className="w-5 h-5" /> Help
            </Link>
          </div>
        </div>
      </nav>

      {/* Theme Toggle */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button onClick={() => setIsDark(false)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${!isDark ? 'bg-background' : ''}`}>
            <Sun className="w-4 h-4" /> Light
          </button>
          <button onClick={() => setIsDark(true)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded ${isDark ? 'bg-background' : ''}`}>
            <Moon className="w-4 h-4" /> Dark
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
