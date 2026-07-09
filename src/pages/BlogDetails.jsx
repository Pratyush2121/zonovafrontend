import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen, ChevronRight, Twitter, Linkedin, Facebook } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';
import { resolveUrl } from '../utils/resolveUrl.js';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cleanContent, setCleanContent] = useState('');
  const [toc, setToc] = useState([]);
  const [adjacentBlogs, setAdjacentBlogs] = useState({ prev: null, next: null });

  const mockBlogs = {
    'how-to-validate-a-startup-idea': {
      title: 'How to Validate a Startup Idea with Minimal Capital',
      category: 'Venture Building',
      readTime: '6 min read',
      featuredImage: '/images/blog1.svg',
      author: 'Amit Verma',
      metaTitle: 'How to Validate a Startup Idea with Minimal Capital | Zonova',
      metaDescription: 'Step-by-step stress-testing framework to validate consumer problems and outline economic margins.',
      content: `<h2>Introduction</h2><p>Over 90% of tech startups fail. The most frequent reason is building a product that no one wants or is willing to pay for. Validation is the process of testing your startup assumptions before spending thousands on software engineering.</p><h2>1. Define the Problem Hypothesis</h2><p>Clearly state what problem you are solving, who faces it, and why existing alternatives are inadequate. Speak to at least 15 target users before writing a line of code.</p><h2>2. Build a Landing Page Magnet</h2><p>Create a simple, premium landing page detailing your proposed solution with a clear Call to Action (e.g., "Join the Beta" or "Pre-order Now"). Run targeted search engine ads to measure conversion metrics.</p><h2>3. Analyze CTR & Conversion Ratios</h2><p>If your landing page click-through conversion rate is above 8%, you have verified interest. If it is below 3%, you need to rewrite your messaging, pivot the concept, or evaluate a different niche.</p>`
    },
    'ai-automation-for-businesses': {
      title: 'AI Automation workflows for Business Operations',
      category: 'AI & Automation',
      readTime: '8 min read',
      featuredImage: '/images/blog2.svg',
      author: 'Vikram Sen',
      metaTitle: 'AI Automation workflows for Business Operations | Zonova',
      metaDescription: 'How modern venture builders sync CRM workflows, ticketing databases, and AI models.',
      content: `<h2>Overview</h2><p>Operations bottleneck scaling companies. Integrating CRM pipelines, calendar scheduling nodes, and ticketing workflows with lightweight AI saves internal support and operations hours.</p><h2>1. Automate Lead Capture to CRM</h2><p>When a lead submits a contact form, parse details with LLMs to automatically qualify their budget tier and draft initial response proposals in your CRM database.</p><h2>2. Synchronize Ticket Queues</h2><p>Route customer queries through text-classification systems to instantly direct tickets to appropriate tech support leads, reducing resolution times.</p>`
    },
    'performance-marketing-playbook': {
      title: 'Performance Marketing Playbook for MVPs',
      category: 'Growth Marketing',
      readTime: '5 min read',
      featuredImage: '/images/blog3.svg',
      author: 'Neha Mehta',
      metaTitle: 'Performance Marketing Playbook for MVPs | Zonova',
      metaDescription: 'A tactical handbook detailing landing page conversion ratios and CTR bidding structures.',
      content: `<h2>The Growth Engine</h2><p>Your product code means nothing without active users. Setting up target advertising funnels correctly ensures that you collect valuable user feedback from day one.</p><h2>1. Focus on Direct ROI Campaigns</h2><p>Avoid generalized branding campaigns. Spend budget on high-intent search terms where users are actively seeking solutions to their direct operational bottlenecks.</p><h2>2. Standardize A/B Ad Sprints</h2><p>Test different ad copies, graphics, and video testimonials every 3 days. Optimize bids towards channels that deliver the lowest cost per qualified lead.</p>`
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/slug/${slug}`);
        const data = await res.json();
        let activeBlog = null;

        if (data.success && data.blog) {
          activeBlog = data.blog;
        } else if (mockBlogs[slug]) {
          activeBlog = mockBlogs[slug];
        } else {
          setError('Article not found');
          return;
        }

        setBlog(activeBlog);

        // 1. Automatic Table of Contents Parser using native DOMParser
        if (activeBlog && activeBlog.content) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(activeBlog.content, 'text/html');
          const headings = doc.querySelectorAll('h2, h3');
          const tempToc = [];

          headings.forEach((heading, idx) => {
            const text = heading.textContent;
            const headingSlug = text
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '');
            const id = headingSlug || `heading-${idx}`;
            heading.setAttribute('id', id);
            tempToc.push({ text, id, level: heading.tagName.toLowerCase() });
          });

          setCleanContent(doc.body.innerHTML);
          setToc(tempToc);
        }

        // 2. Fetch Adjacent Posts for Navigation
        try {
          const allRes = await fetch('/api/blogs?status=published');
          const allData = await allRes.json();
          if (allData.success && allData.blogs) {
            const list = allData.blogs;
            const idx = list.findIndex(b => b.slug === slug);
            if (idx !== -1) {
              setAdjacentBlogs({
                prev: idx > 0 ? list[idx - 1] : null,
                next: idx < list.length - 1 ? list[idx + 1] : null
              });
            }
          }
        } catch (innerErr) {
          console.warn('Could not fetch adjacent blogs navigation:', innerErr);
        }

      } catch (err) {
        if (mockBlogs[slug]) {
          setBlog(mockBlogs[slug]);
        } else {
          setError('Failed to load article details');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Social Sharing Actions
  const sharePage = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || '');
    let shareUrl = '';

    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <h2 className="text-2xl font-black text-secondary">{error || 'Article Not Found'}</h2>
        <Link to="/blog" className="text-primary hover:underline font-semibold flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>Return to blog list</span>
        </Link>
      </div>
    );
  }

  // Dynamic JSON-LD Article Schema
  const pageUrl = `https://zonovatechnologies.online/blog/${slug}`;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": blog.title,
    "description": blog.metaDescription || blog.title,
    "image": blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `https://zonovatechnologies.online${blog.featuredImage}`) : "https://zonovatechnologies.online/images/logo.jpg",
    "author": {
      "@type": "Person",
      "name": blog.author || "Zonova Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zonova Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zonovatechnologies.online/images/logo.jpg"
      }
    },
    "datePublished": blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || new Date().toISOString()
  };

  return (
    <div className="bg-white">
      <SEO 
        title={blog.title} 
        description={blog.metaDescription} 
        schema={blogSchema}
        canonicalPath={`/blog/${slug}`}
      />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-bgSec py-12 border-b border-slate-100">
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            📖 Industry Insights
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            💡 Strategy Vetted
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-left space-y-4 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={10} />
            <span className="text-slate-500 truncate max-w-[200px]">{blog.category}</span>
          </nav>
          
          <div className="space-y-3">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-secondary leading-tight tracking-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-2 border-t border-slate-100 mt-4">
              <div className="flex items-center gap-1.5">
                <User size={16} />
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{blog.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main post area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Article Main Column */}
          <article className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video hover:border-primary/30 transition-all duration-300">
              <img src={resolveUrl(blog.featuredImage) || '/images/blog1.svg'} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Body Content */}
            <div 
              className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base space-y-6 pt-4"
              dangerouslySetInnerHTML={{ __html: cleanContent || blog.content }}
            />

            {/* Previous / Next Article Navigation Bar */}
            <div className="border-t border-b border-slate-150 py-8 mt-12 flex justify-between items-center gap-4 text-xs sm:text-sm">
              {adjacentBlogs.prev ? (
                <Link to={`/blog/${adjacentBlogs.prev.slug}`} className="group flex flex-col text-left max-w-[45%]">
                  <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] mb-1">← Previous Post</span>
                  <span className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{adjacentBlogs.prev.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {adjacentBlogs.next ? (
                <Link to={`/blog/${adjacentBlogs.next.slug}`} className="group flex flex-col text-right max-w-[45%] items-end">
                  <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] mb-1">Next Post →</span>
                  <span className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{adjacentBlogs.next.title}</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>

          {/* Table of Contents & Social Share Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            
            {/* 1. Dynamic Table of Contents (TOC) */}
            {toc.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
                <h3 className="font-extrabold text-sm text-secondary uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={16} className="text-primary" />
                  <span>Table of Contents</span>
                </h3>
                <nav className="space-y-2.5 text-xs font-semibold text-slate-500">
                  {toc.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block hover:text-primary transition-colors leading-relaxed line-clamp-1 border-l-2 border-transparent hover:border-primary pl-2"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* 2. Social Share buttons */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-extrabold text-sm text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Share2 size={16} className="text-primary" />
                <span>Share Article</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => sharePage('twitter')}
                  aria-label="Share on X"
                  className="flex-grow flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-black hover:text-white transition-all text-xs font-bold text-slate-700"
                >
                  <Twitter size={14} />
                  <span>X / Tweet</span>
                </button>
                <button
                  onClick={() => sharePage('linkedin')}
                  aria-label="Share on LinkedIn"
                  className="flex-grow flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-[#0A66C2] hover:text-white transition-all text-xs font-bold text-slate-700"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => sharePage('facebook')}
                  aria-label="Share on Facebook"
                  className="flex-grow flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-[#1877F2] hover:text-white transition-all text-xs font-bold text-slate-700"
                >
                  <Facebook size={14} />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
