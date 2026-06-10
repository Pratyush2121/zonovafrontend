import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, ChevronRight, Layers } from 'lucide-react';
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

  const filtered = category === 'All' 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase() === category.toLowerCase());

  // Static Fallback Case Studies if DB is empty
  const fallbackProjects = [
    {
      id: 'mock-1',
      title: 'AeroPay Financial Billing Engine',
      description: 'Built a next-gen multi-tenant recurring billing engine. We designed the architecture, optimized database speeds, and completed validation inside 6 weeks.',
      category: 'SaaS',
      screenshots: ['/images/project_saas.svg'],
      technologyStack: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      results: 'Scale to $12M ARR inside 12 months with zero downtime.'
    },
    {
      id: 'mock-2',
      title: 'Fittr Mobile Fitness Coach',
      description: 'Developed a cross-platform mobile trainer tracker. Integrated custom scheduling modules, notification parameters and local storage.',
      category: 'Mobile App',
      screenshots: ['/images/project_mobile.svg'],
      technologyStack: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
      results: 'Over 100k+ downloads on the App Store in the first quarter.'
    },
    {
      id: 'mock-3',
      title: 'Holo Neural AI Dashboard',
      description: 'Engineered an AI vector database dashboard. Combined real-time data pipelines with operations sync systems.',
      category: 'AI Solutions',
      screenshots: ['/images/project_ai.svg'],
      technologyStack: ['React', 'Python', 'FastAPI', 'Pinecone', 'D3.js'],
      results: 'Saved client teams 30+ manual engineering hours per week.'
    },
    {
      id: 'mock-4',
      title: 'LogiTrack Operations Automation',
      description: 'Linked CRM flows, support ticketing queues, and accounting databases to build a unified client onboarding dashboard.',
      category: 'Automation',
      screenshots: ['/images/project_delivery.svg'],
      technologyStack: ['Zapier', 'Make.com', 'Node.js', 'Airtable', 'HubSpot'],
      results: 'Lowered onboarding duration from 4 hours to 8 minutes.'
    },
    {
      id: 'mock-5',
      title: 'EduQuest LMS Portal',
      description: 'Created a high-fidelity learning management portal. Features multi-role logins, course dashboards, and payments.',
      category: 'Web',
      screenshots: ['/images/project_edutech.svg'],
      technologyStack: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Express', 'Mongoose'],
      results: 'Acquired 15k+ active registered users in the launch month.'
    }
  ];

  const activeProjects = projects.length > 0 ? filtered : (category === 'All' ? fallbackProjects : fallbackProjects.filter(p => p.category?.toLowerCase() === category.toLowerCase()));

  return (
    <div className="bg-white">
      <SEO title="Portfolio & Case Studies" description="Browse case studies and client projects built by Zonova. Read client goals, challenges, tech stacks, and before/after results." />

      <section className="bg-bgSec py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner />
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Layers size={48} className="text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-secondary">No Case Studies Found</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">We are currently seeding new projects in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeProjects.map((p) => {
              const id = p._id || p.id;
              return (
                <div key={id} className="premium-card bg-white border border-slate-200 rounded-3xl overflow-hidden text-left flex flex-col justify-between">
                  <div>
                    {/* Visual Header */}
                    <div className="h-52 bg-slate-100 overflow-hidden relative">
                      <img
                        src={p.screenshots?.[0] || '/images/project_saas.svg'}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                        {p.category}
                      </span>
                    </div>

                    {/* Content Brief */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-secondary line-clamp-1">{p.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                      
                      {p.results && (
                        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-100">
                          <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Key Result</span>
                          {p.results}
                        </div>
                      )}

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.technologyStack?.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <Link
                      to={`/portfolio/${id}`}
                      className="w-full inline-flex justify-center items-center gap-1.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <span>View Full Case Study</span>
                      <ArrowRight size={14} />
                    </Link>
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
