import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Filter, ChevronRight, Layers, Laptop, Smartphone, Brain, 
  Globe, ShoppingCart, Award, Gamepad2, Store, BookOpen, ExternalLink, Sparkles 
} from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'SaaS', 'Mobile App', 'Web', 'AI Solutions', 'Automation'];

  // Project Icon helper
  const getProjectIcon = (cat, title) => {
    const t = title.toLowerCase();
    if (t.includes('education') || t.includes('learning') || t.includes('college') || t.includes('lms')) return <BookOpen className="text-indigo-500 w-6 h-6" />;
    if (t.includes('chemist') || t.includes('pharmacy') || t.includes('dpms') || t.includes('clinic') || t.includes('hospital') || t.includes('medical') || t.includes('life sciences')) return <Award className="text-cyan-500 w-6 h-6" />;
    if (t.includes('parlour') || t.includes('makeup') || t.includes('marsy')) return <Sparkles className="text-pink-500 w-6 h-6" />;
    if (t.includes('shop') || t.includes('e-commerce') || t.includes('retail') || t.includes('adda')) return <ShoppingCart className="text-amber-500 w-6 h-6" />;
    if (t.includes('kirana') || t.includes('store')) return <Store className="text-emerald-500 w-6 h-6" />;
    if (t.includes('game') || t.includes('matcher')) return <Gamepad2 className="text-rose-500 w-6 h-6" />;
    if (cat?.toLowerCase() === 'mobile app') return <Smartphone className="text-emerald-500 w-6 h-6" />;
    if (cat?.toLowerCase() === 'saas') return <Laptop className="text-violet-500 w-6 h-6" />;
    return <Globe className="text-primary w-6 h-6" />;
  };

  // Static Fallback Case Studies if DB is empty
  const fallbackProjects = [
    // 4 SaaS Projects
    {
      id: 'saas-1',
      title: 'Learning Management System (LMS)',
      description: 'A comprehensive educational platform currently affiliated with 2 active schools. Features role-based access for students, teachers, and administrators, interactive gradebooks, lesson planning, and digital submission boards.',
      category: 'SaaS',
      technologyStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      results: 'Active affiliation with 2 schools, serving over 1,500+ active students.'
    },
    {
      id: 'saas-2',
      title: 'Chemist Portal',
      description: 'An advanced cloud platform built for pharmacy stores to manage prescription tracking, real-time inventory levels, dynamic supply order pipelines, and automated customer billing.',
      category: 'SaaS',
      technologyStack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB'],
      results: 'Optimized stock inventory, reducing management overhead by 30%.'
    },
    {
      id: 'saas-3',
      title: 'DPMS Patient Care Platform',
      description: 'Clinic and hospital software designed to streamline complete patient pathways. Manages end-to-end IPD (In-Patient Department) admissions and OPD (Out-Patient Department) booking, billing, and electronic health logs.',
      category: 'SaaS',
      technologyStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
      results: 'Reduced client check-in registration times by over 40%.'
    },
    {
      id: 'saas-4',
      title: 'College Management System',
      description: 'Enterprise college automation system. Coordinates administrative student records, semester registrations, automated fee schedule invoicing, and report card publishing.',
      category: 'SaaS',
      technologyStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      results: 'Fully modular custom deployment, handling admissions and fee collections.'
    },
    // 11 Success Stories
    {
      id: 'web-marsy',
      title: 'Marsy Makeup Parlour',
      description: 'Elegant makeup parlour showcase and service discovery platform featuring high-fidelity styling portfolios, detailed price catalogs, and seamless online booking integration.',
      category: 'Web',
      url: 'https://marsy.in',
      technologyStack: ['React', 'Node.js', 'Express', 'Tailwind'],
      results: 'Boosted online bookings and digital brand engagement.'
    },
    {
      id: 'web-coregrow',
      title: 'Coregrow Global',
      description: 'High-performance marketing portal and business showcase website built with modern UI structures.',
      category: 'Web',
      url: 'https://v0-coregrowglobal-website-build.vercel.app',
      technologyStack: ['Next.js', 'React', 'Tailwind'],
      results: 'Improved load speeds and SEO ranking.'
    },
    {
      id: 'web-desikrishak',
      title: 'Desi Krishak',
      description: 'An OLX-like peer-to-peer digital marketplace app empowering rural area farmers to directly buy, sell, and trade crops, seeds, livestock, and agricultural machinery.',
      category: 'Web',
      url: 'https://desikrishak.shop',
      technologyStack: ['React', 'Vite', 'Tailwind'],
      results: 'Active peer-to-peer rural agricultural marketplace.'
    },
    {
      id: 'web-charity',
      title: 'Charity Connect',
      description: 'Charitable donation matching app and community outreach hub mapping donors to local requirements.',
      category: 'Web',
      url: 'https://charityconnect-rho.vercel.app',
      technologyStack: ['React', 'Vite', 'CSS'],
      results: 'Launched portal facilitating donation distributions.'
    },
    {
      id: 'saas-leo',
      title: 'Leo Auction',
      description: 'Real-time automated bidding and product auction platform running secure live-stream pipelines.',
      category: 'SaaS',
      url: 'https://auction-leo.onrender.com',
      technologyStack: ['React', 'Express', 'MongoDB'],
      results: 'Integrated payment checks and secure real-time logging.'
    },
    {
      id: 'web-laxifs',
      title: 'Laxifs Life Sciences',
      description: 'Professional medical inventory, prescription handling, and pharmaceutical supply coordinate portal.',
      category: 'Web',
      url: 'https://laxifs-life-sciences-fcpj.vercel.app/',
      technologyStack: ['React', 'Vite', 'Tailwind'],
      results: 'Fully secure catalog mapping corporate pharma supply.'
    },
    {
      id: 'mobile-nest',
      title: 'Nest Connect',
      description: 'Community networking and professional connectivity app designed for Android and iOS devices.',
      category: 'Mobile App',
      url: 'https://play.google.com/store/search?q=Nest+Connect&c=apps',
      technologyStack: ['Flutter', 'Firebase', 'Play Store'],
      results: 'Google Play Store deployment, onboarding active users.'
    },
    {
      id: 'mobile-focus',
      title: 'Focus Test Series App',
      description: 'High-volume mock test series prep application for academic success and competitive exam prep.',
      category: 'Mobile App',
      url: 'https://play.google.com/store',
      technologyStack: ['React Native', 'Redux', 'Play Store'],
      results: 'Provides seamless test interface for 500+ mock tests.'
    },
    {
      id: 'web-shivam',
      title: 'Shivam Kirana Store',
      description: 'Local grocery inventory, order coordinator, and regional delivery routing system.',
      category: 'Web',
      url: 'https://shivamkirana.com',
      technologyStack: ['React', 'Express', 'Node.js'],
      results: 'Automated digital billing and local order receipts.'
    },
    {
      id: 'web-cardmatcher',
      title: 'Card Matcher Game',
      description: 'Engaging memory and attention matcher card game optimized for mobile web browsers.',
      category: 'Web',
      url: 'https://card-matcher.vercel.app',
      technologyStack: ['JS HTML5', 'CSS3', 'Vite'],
      results: 'Zero latency client-side execution, interactive animations.'
    },
    {
      id: 'web-shopadda',
      title: 'ShopAdda',
      description: 'Multi-vendor shopping catalog, order dispatch logistics, and vendor settlement portal.',
      category: 'Web',
      url: 'https://shopadda.vercel.app',
      technologyStack: ['React', 'Tailwind', 'MongoDB'],
      results: 'Handles multi-merchant checkouts and tracking dashboards.'
    }
  ];

  const filtered = category === 'All' 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase() === category.toLowerCase());

  const activeProjects = projects.length > 0 ? filtered : (category === 'All' ? fallbackProjects : fallbackProjects.filter(p => p.category?.toLowerCase() === category.toLowerCase()));

  return (
    <div className="bg-white">
      <SEO title="Portfolio & Case Studies" description="Browse case studies and client projects built by Zonova. Read client goals, challenges, tech stacks, and before/after results." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            📂 Case Studies
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            ⚡ Live Projects
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Layers size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Case Studies
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Discover how we design products, automate workflows, and execute marketing sprints for scaling companies.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter size={14} className="text-slate-400 shrink-0 mr-1 hidden sm:inline" />
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
      </section>

      {/* Project Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner />
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Layers size={48} className="text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-secondary">No Case Studies Found</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">We are currently seeding new projects in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeProjects.map((p) => {
              const id = p._id || p.id;
              return (
                <div key={id} className="premium-card bg-white border border-slate-200/80 rounded-3xl p-5 text-left flex flex-col justify-between hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className="space-y-4">
                    {/* Icon Header */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                        {getProjectIcon(p.category, p.title)}
                      </div>
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>

                    {/* Content Brief */}
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-secondary leading-snug line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                      
                      {p.results && (
                        <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl text-[10px] font-semibold border border-emerald-100">
                          <span className="block text-[8px] text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Key Result</span>
                          {p.results}
                        </div>
                      )}

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.technologyStack?.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-[9px] font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center gap-1.5 py-2 btn-colorful rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Visit Project</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        to={`/portfolio/${id}`}
                        className="w-full inline-flex justify-center items-center gap-1.5 py-2 btn-colorful rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
