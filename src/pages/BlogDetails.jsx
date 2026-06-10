import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mockBlogs = {
    'how-to-validate-a-startup-idea': {
      title: 'How to Validate a Startup Idea with Minimal Capital',
      category: 'Venture Building',
      readTime: '6 min read',
      featuredImage: '/images/blog1.svg',
      author: 'Amit Verma',
      metaTitle: 'How to Validate a Startup Idea with Minimal Capital | Zonova',
      metaDescription: 'Step-by-step stress-testing framework to validate consumer problems and outline economic margins.',
      content: `<h2>Introduction</h2><p>Over 90% of tech startups fail. The most frequent reason is building a product that no one wants or is willing to pay for. Validation is the process of testing your startup assumptions before spending thousands on software engineering.</p><h3>1. Define the Problem Hypothesis</h3><p>Clearly state what problem you are solving, who faces it, and why existing alternatives are inadequate. Speak to at least 15 target users before writing a line of code.</p><h3>2. Build a Landing Page Magnet</h3><p>Create a simple, premium landing page detailing your proposed solution with a clear Call to Action (e.g., "Join the Beta" or "Pre-order Now"). Run targeted search engine ads to measure conversion metrics.</p><h3>3. Analyze CTR & Conversion Ratios</h3><p>If your landing page click-through conversion rate is above 8%, you have verified interest. If it is below 3%, you need to rewrite your messaging, pivot the concept, or evaluate a different niche.</p>`
    },
    'ai-automation-for-businesses': {
      title: 'AI Automation workflows for Business Operations',
      category: 'AI & Automation',
      readTime: '8 min read',
      featuredImage: '/images/blog2.svg',
      author: 'Vikram Sen',
      metaTitle: 'AI Automation workflows for Business Operations | Zonova',
      metaDescription: 'How modern venture builders sync CRM workflows, ticketing databases, and AI models.',
      content: `<h2>Overview</h2><p>Operations bottleneck scaling companies. Integrating CRM pipelines, calendar scheduling nodes, and ticketing workflows with lightweight AI saves internal support and operations hours.</p><h3>1. Automate Lead Capture to CRM</h3><p>When a lead submits a contact form, parse details with LLMs to automatically qualify their budget tier and draft initial response proposals in your CRM database.</p><h3>2. Synchronize Ticket Queues</h3><p>Route customer queries through text-classification systems to instantly direct tickets to appropriate tech support leads, reducing resolution times.</p>`
    },
    'performance-marketing-playbook': {
      title: 'Performance Marketing Playbook for MVPs',
      category: 'Growth Marketing',
      readTime: '5 min read',
      featuredImage: '/images/blog3.svg',
      author: 'Neha Mehta',
      metaTitle: 'Performance Marketing Playbook for MVPs | Zonova',
      metaDescription: 'A tactical handbook detailing landing page conversion ratios and CTR bidding structures.',
      content: `<h2>The Growth Engine</h2><p>Your product code means nothing without active users. Setting up target advertising funnels correctly ensures that you collect valuable user feedback from day one.</p><h3>1. Focus on Direct ROI Campaigns</h3><p>Avoid generalized branding campaigns. Spend budget on high-intent search terms where users are actively seeking solutions to their direct operational bottlenecks.</p><h3>2. Standardize A/B Ad Sprints</h3><p>Test different ad copies, graphics, and video testimonials every 3 days. Optimize bids towards channels that deliver the lowest cost per qualified lead.</p>`
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${slug}`);
        const data = await res.json();
        if (data.success && data.blog) {
          setBlog(data.blog);
        } else {
          if (mockBlogs[slug]) {
            setBlog(mockBlogs[slug]);
          } else {
            setError('Article not found');
          }
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

  return (
    <div className="bg-white">
      <SEO title={blog.title} description={blog.metaDescription} />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-bgSec py-12 border-b border-slate-100">
        {/* Floating stickers */}
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

        <div className="max-w-4xl mx-auto px-4 text-left space-y-4 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-all mb-2">
            <ArrowLeft size={16} />
            <span>All Articles</span>
          </Link>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen size={24} />
            </div>
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-secondary leading-tight tracking-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-2 border-t border-slate-100 mt-4">
              <div className="flex items-center gap-1.5 pt-2">
                <User size={16} />
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-2">
                <Clock size={16} />
                <span>{blog.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main post area */}
      <article className="py-16 max-w-4xl mx-auto px-4 text-left space-y-8">

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video hover:border-primary/30 transition-all duration-300">
          <img src={blog.featuredImage || '/images/blog1.svg'} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <div 
          className="prose prose-blue max-w-none text-slate-600 leading-relaxed text-base space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

      </article>
    </div>
  );
};

export default BlogDetails;
