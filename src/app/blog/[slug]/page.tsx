import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Header from '@/components/Header';
import BlogPostClient from './BlogPostClient';

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

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

function generateToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[2].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    toc.push({
      id,
      title,
      level: match[1].length,
    });
  }
  
  return toc;
}

function addIdsToHeadings(content: string): string {
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `${hashes} ${title} {#${id}}`;
  });
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Generate TOC before processing
    const toc = generateToc(content);
    
    // Add IDs to headings
    const contentWithIds = addIdsToHeadings(content);
    
    const processedContent = await remark()
      .use(html)
      .process(contentWithIds);
    
    // Add actual HTML ids to headings
    const finalContent = processedContent.toString().replace(
      /<h([1-6])>(.+?)\s*\{#([^}]+)\}<\/h([1-6])>/g,
      '<h$1 id="$3">$2</h$1>'
    );
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: finalContent,
      toc,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="pt-20 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Post Not Found</h1>
            <Link href="/blog" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              ← Back to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return <BlogPostClient post={post} />;
}