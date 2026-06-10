import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';
import { resolveUrl } from '../utils/resolveUrl.js';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const queryParams = new URLSearchParams({ status: 'published' });
        if (category !== 'All') queryParams.append('category', category);
        if (searchQuery) queryParams.append('search', searchQuery);

        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category, searchQuery]);

  const categories = ['All', 'Venture Building', 'Tech & Engineering', 'AI & Automation', 'Growth Marketing'];

  const fallbackBlogs = [
    {
      id: 'mock-b1',
      title: 'How to Validate a Startup Idea with Minimal Capital',
      slug: 'how-to-validate-a-startup-idea',
      category: 'Venture Building',
      readTime: '6 min read',
      featuredImage: '/images/blog1.svg',
      author: 'Amit Verma',
      metaDescription: 'Step-by-step stress-testing framework to validate consumer problems, map landing page funnels and outline unit economic margins before writing product code.'
    },
    {
      id: 'mock-b2',
      title: 'AI Automation workflows for Business Operations',
      slug: 'ai-automation-for-businesses',
      category: 'AI & Automation',
      readTime: '8 min read',
      featuredImage: '/images/blog2.svg',
      author: 'Vikram Sen',
      metaDescription: 'How modern venture builders sync CRM workflows, ticketing databases, and API integrations with AI to save 20+ operations hours weekly.'
    },
    {
      id: 'mock-b3',
      title: 'Performance Marketing Playbook for MVPs',
      slug: 'performance-marketing-playbook',
      category: 'Growth Marketing',
      readTime: '5 min read',
      featuredImage: '/images/blog3.svg',
      author: 'Neha Mehta',
      metaDescription: 'A tactical handbook detailing landing page conversion ratios, CTR bidding structures, and budget tracking metrics to scale client pipelines.'
    }
  ];

  const activeBlogs = blogs.length > 0 ? blogs : (category === 'All' && !searchQuery ? fallbackBlogs : fallbackBlogs.filter(b => b.category?.toLowerCase() === category.toLowerCase() || b.title.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <div className="bg-white">
      <SEO title="Blog & Insights" description="Vetted startup playbooks, web development tips, growth marketing strategies, and venture studio operations guides." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            📖 Playbooks
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            💡 Tech Blueprints
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <BookOpen size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Blog & Insights
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Actionable playbooks, strategic blueprints, and tech analysis written by the builders at Zonova.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 border-b border-slate-100 bg-slate-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Categories Tab */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                  category === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Blogs Listings */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner />
        ) : activeBlogs.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <BookOpen size={48} className="text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-secondary">No Articles Found</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">We couldn't find any articles matching your request.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeBlogs.map((blog) => {
              const slug = blog.slug || '';
              return (
                <article key={blog._id || blog.id} className="premium-card rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-primary/30 transition-all duration-300 text-left flex flex-col justify-between">
                  <div>
                    {/* Header Image */}
                    <div className="h-52 bg-slate-100 overflow-hidden">
                      <img
                        src={resolveUrl(blog.featuredImage) || '/images/blog1.svg'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Content brief */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                        <span>{blog.category}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{blog.readTime || '5 min read'}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary line-clamp-2 hover:text-primary transition-colors">
                        <Link to={`/blog/${slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {blog.metaDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-semibold text-slate-600">
                    <span>By {blog.author}</span>
                    <Link
                      to={`/blog/${slug}`}
                      className="text-primary flex items-center gap-1 hover:gap-1.5 transition-all"
                    >
                      <span>Read Full Post</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogList;
