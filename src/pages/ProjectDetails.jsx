import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Flame, Cpu, Star, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallbacks mock case study details matching ID
  const mockCaseStudies = {
    'mock-1': {
      title: 'AeroPay Financial Billing Engine',
      description: 'Built a next-gen multi-tenant recurring billing engine. We designed the architecture, optimized database speeds, and completed validation inside 6 weeks.',
      category: 'SaaS',
      clientGoals: 'Optimize credit card recurring failure rates, set up dynamic tier invoicing, and implement multi-currency conversion scales.',
      challenges: 'Legacy database architectures produced slow transactional responses under load, causing webhook time-outs in external payment gateways.',
      solution: 'Re-engineered the backend in Node.js and Express using Redis caching queues and optimized MongoDB indexing. Built custom payment routing algorithms.',
      results: 'Scale to $12M ARR inside 12 months with zero downtime, lowering failed payments by 34%.',
      screenshots: ['/images/project_saas.svg', '/images/project_mobile.svg'],
      technologyStack: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      testimonialAuthor: 'Siddharth Mehta',
      testimonialRole: 'Founder',
      testimonialText: 'Zonova co-built our B2B engine on record schedule. Their technical architecture is top-tier corporate standard.',
      testimonialCompany: 'CloudDocket'
    },
    'mock-2': {
      title: 'Fittr Mobile Fitness Coach',
      description: 'Developed a cross-platform mobile trainer tracker. Integrated custom scheduling modules, notification parameters and local storage.',
      category: 'Mobile App',
      clientGoals: 'Build iOS and Android applications with sub-second workout syncing, calendar booking logic, and real-time offline availability.',
      challenges: 'React Native bridge serialization latency caused UI stuttering when loading massive, asset-heavy calendar workout files.',
      solution: 'Implemented localized SQLite storage to compile workout schedules directly on the device, sending background updates asynchronously.',
      results: 'Over 100k+ downloads on the App Store in the first quarter, maintaining a 4.8 star rating.',
      screenshots: ['/images/project_mobile.svg', '/images/project_saas.svg'],
      technologyStack: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
      testimonialAuthor: 'Priya Sharma',
      testimonialRole: 'Co-Founder',
      testimonialText: 'They resolved our app performance lag instantly. The resulting iOS and Android products operate flawlessly.',
      testimonialCompany: 'EduQuest'
    },
    'mock-3': {
      title: 'Holo Neural AI Dashboard',
      description: 'Engineered an AI vector database dashboard. Combined real-time data pipelines with operations sync systems.',
      category: 'AI Solutions',
      clientGoals: 'Design an intuitive dashboard visualizer to review vectorized content indexes and integrate GPT LLM prompt loops.',
      challenges: 'Token processing lag times created sluggish chat interfaces, frustrating high-volume corporate clients.',
      solution: 'Structured streaming response APIs in FastAPI, updating React states character-by-character via SSE webhooks.',
      results: 'Saved client teams 30+ manual engineering hours per week and boosted support answer ratings.',
      screenshots: ['/images/project_ai.svg', '/images/project_saas.svg'],
      technologyStack: ['React', 'Python', 'FastAPI', 'Pinecone', 'D3.js'],
      testimonialAuthor: 'Rohan Das',
      testimonialRole: 'Director',
      testimonialText: 'The stream response visualizer is outstanding. It is exactly the premium corporate UI we wanted to show.',
      testimonialCompany: 'LogiTrack India'
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (data.success && data.project) {
          setProject(data.project);
        } else {
          // Check if mock study exists
          if (mockCaseStudies[id]) {
            setProject(mockCaseStudies[id]);
          } else {
            setError('Case study not found');
          }
        }
      } catch (err) {
        if (mockCaseStudies[id]) {
          setProject(mockCaseStudies[id]);
        } else {
          setError('Failed to fetch case study details');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <h2 className="text-2xl font-black text-secondary">{error || 'Project Not Found'}</h2>
        <Link to="/portfolio" className="text-primary hover:underline font-semibold flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>Return to case studies</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO title={project.title} description={project.description} />

      {/* Header Back bar */}
      <section className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-all">
            <ArrowLeft size={16} />
            <span>Case Studies</span>
          </Link>
        </div>
      </section>

      {/* Main Study Details */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <span className="inline-block bg-primary/10 text-primary border border-primary/20 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                {project.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Screenshots Slider/Grid */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-secondary">Visual Walkthrough</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((screen, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={screen} alt={`Screenshot ${idx + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals, Challenges, Solutions */}
            <div className="grid grid-cols-1 gap-8 pt-4">
              {project.clientGoals && (
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                    <Target size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-secondary">Client Goals</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{project.clientGoals}</p>
                  </div>
                </div>
              )}

              {project.challenges && (
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                    <Flame size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-secondary">Core Challenges</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{project.challenges}</p>
                  </div>
                </div>
              )}

              {project.solution && (
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-cyan-50 text-accent rounded-xl shrink-0">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-secondary">Engineered Solution</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{project.solution}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar Stats & Tech */}
          <div className="lg:col-span-1 space-y-8">
            {/* Results Callout */}
            {project.results && (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 space-y-4">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">The Result</span>
                <p className="text-2xl font-black text-slate-800 leading-tight">
                  {project.results}
                </p>
              </div>
            )}

            {/* Tech Stack List */}
            <div className="p-8 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-sm text-secondary uppercase tracking-widest">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologyStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 font-semibold text-xs rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            {project.testimonialText && (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic leading-relaxed text-sm">
                  "{project.testimonialText}"
                </p>
                <div className="border-t border-slate-200/60 pt-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {project.testimonialAuthor?.[0]}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-secondary text-sm">{project.testimonialAuthor}</h5>
                    <p className="text-xs text-slate-400">
                      {project.testimonialRole} {project.testimonialCompany && `, ${project.testimonialCompany}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
