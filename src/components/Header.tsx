'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    // 現在のページがホームページでない場合は、ホームページに移動してからスクロール
    const currentPath = window.location.pathname;
    const basePath = process.env.NODE_ENV === 'production' ? '/portfolio2025' : '';
    
    if (currentPath !== basePath + '/' && currentPath !== basePath) {
      window.location.href = `${basePath}/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div>
            {/* Show Back to Blog link only on blog post pages, ctake099 on all other pages */}
            {pathname.startsWith('/blog/') && pathname !== '/blog' ? (
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            ) : (
              <Link 
                href="/" 
                className="font-medium text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                ctake099
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                Projects
              </button>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                Blog
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                Contact
              </button>
            </nav>

            <button
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="テーマを切り替え"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                Projects
              </button>
              <Link
                href="/blog"
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}