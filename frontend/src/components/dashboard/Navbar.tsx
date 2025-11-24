"use client";

import { Menu, Box, Search, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6 gap-4">
      <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
      <Button variant="ghost" size="icon"><Box className="w-5 h-5" /></Button>

      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Type any crypto currency" className="pl-10 bg-muted border-0" />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><User className="w-5 h-5" /></div>
        <Button variant="ghost" size="icon"><Settings className="w-5 h-5" /></Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </Button>
        <Button variant="ghost" size="icon"><span className="text-lg">🇺🇸</span></Button>
      </div>
    </header>
  );
};

export default Navbar;
