'use client';

import React from 'react';
import { ThemeToggle } from '@/components/molecules';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col h-screen">
      <header className="relative max-w-7xl w-full p-6 flex justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Blueprint <br className='lg:hidden' /> Diagnostic Screener
        </h1>
        <div className="absolute top-[21px] right-4">
          <ThemeToggle />
        </div>
      </header>
      <main className='flex-1 overflow-y-auto'>
        {children}
      </main>
      <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Blueprint Health, Inc. All rights reserved.
        </div>
      </footer>
    </section>
  );
}
