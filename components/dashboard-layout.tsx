'use client';

import type React from 'react';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Home, FolderOpen } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // ⬅️ ganti ini
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FolderOpen className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-white">Portfolio Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your projects and content</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => router.push('/')}>
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">View Portfolio</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
    </div>
  );
}
