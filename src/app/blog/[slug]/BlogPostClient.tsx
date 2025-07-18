'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  toc: TocItem[];
}

interface Props {
  post: BlogPost;
}

function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={`block py-1 transition-colors hover:text-blue-500 dark:hover:text-blue-400 ${
                activeId === item.id 
                  ? 'text-blue-500 dark:text-blue-400 font-medium' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function BlogPostClient({ post }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <ScrollToTop />
      
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header section - full width */}
          <div className="text-center mb-12">
            <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
                <time className="text-base">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>
          </div>

          {/* Content section with sidebar */}
          <div className="lg:flex lg:gap-8">
            {/* TOC for desktop - show only on large screens */}
            <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-32">
                <TableOfContents toc={post.toc} />
              </div>
            </div>
            
            {/* Article content */}
            <div className="lg:flex-1">
              <article className="bg-white dark:bg-gray-900">
                {/* TOC for mobile - show only on small screens */}
                <div className="lg:hidden mb-8">
                  <TableOfContents toc={post.toc} />
                </div>
                
                <div 
                  className="prose prose-xl max-w-none prose-gray dark:prose-invert
                    prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:mb-6 prose-headings:mt-10 first:prose-headings:mt-0
                    prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                    prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-sm
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-200
                    prose-ul:text-gray-700 dark:prose-ul:text-gray-200 prose-ul:mb-6 prose-ul:pl-6
                    prose-ol:text-gray-700 dark:prose-ol:text-gray-200 prose-ol:mb-6 prose-ol:pl-6
                    prose-li:text-gray-700 dark:prose-li:text-gray-200 prose-li:mb-2 prose-li:text-lg
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-8
                    [&_*]:text-gray-700 dark:[&_*]:text-gray-200
                    [&_h1]:text-gray-900 dark:[&_h1]:text-white
                    [&_h2]:text-gray-900 dark:[&_h2]:text-white
                    [&_h3]:text-gray-900 dark:[&_h3]:text-white
                    [&_h4]:text-gray-900 dark:[&_h4]:text-white
                    [&_h5]:text-gray-900 dark:[&_h5]:text-white
                    [&_h6]:text-gray-900 dark:[&_h6]:text-white"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}