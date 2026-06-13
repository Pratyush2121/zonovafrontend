import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Code, Cpu, Smartphone, Database, Brain, Paintbrush, Award, 
  Search, BarChart, UserCheck, Layers, Briefcase, Users2, Rocket, ListTodo,
  ArrowRight, ShieldCheck 
} from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const serviceList = [
    {
      slug: 'startup-consulting',
      icon: <Compass size={24} className="text-primary" />,
      title: 'Startup Consulting',
      desc: 'Formulating robust business models, conducting competitive analysis, mapping unit economics, and reviewing investor pitch pitch decks.',
      features: ['Idea Stress-testing', 'Market Positioning', 'Financial Modeling']
    },
    {
      slug: 'mvp-development',
      icon: <Code size={24} className="text-cyan-600" />,
      title: 'MVP Development',
      desc: 'Rapidly coding core validation prototypes and feature-light applications in 4-8 weeks to test client demand with minimal risk.',
      features: ['Fast Prototype Cycles', 'Core Features Focus', 'Scalable Stack Choice']
    },
    {
      slug: 'web-development',
      icon: <Layers size={24} className="text-violet-600" />,
      title: 'Web Development',
      desc: 'Designing custom responsive corporate websites, high-conversion landing pages, portals, and complex e-commerce architectures.',
      features: ['Tailwind & React Stack', 'SEO-friendly Markup', 'Fast Load Times']
    },
    {
      slug: 'mobile-apps',
      icon: <Smartphone size={24} className="text-emerald-600" />,
      title: 'Mobile App Development',
      desc: 'Building cross-platform iOS and Android applications with native performance, local databases, and integrated push updates.',
      features: ['React Native Apps', 'App Store Optimizations', 'Secure Offline Storage']
    },
    {
      slug: 'saas-development',
      icon: <Database size={24} className="text-amber-600" />,
      title: 'SaaS Development',
      desc: 'Engineering multi-tenant cloud subscription platforms, complete with user hierarchies, subscription billings, and usage dashboards.',
      features: ['Stripe Bills Integrated', 'Role RBAC System', 'Cloud Database Scales']
    },
    {
      slug: 'ai-solutions',
      icon: <Brain size={24} className="text-pink-600" />,
      title: 'AI Solutions',
      desc: 'Deploying neural networks, AI chatbots, prediction metrics, and custom generative AI interfaces that optimize operations.',
      features: ['GPT Integration', 'Custom Vector Stores', 'Predictive Analysis']
    },
    {
      slug: 'ui-ux-design',
      icon: <Paintbrush size={24} className="text-sky-600" />,
      title: 'UI/UX Design',
      desc: 'Crafting responsive layout wireframes, high-fidelity UI user-testing mockups, custom visual styles, and user flow map strategies.',
      features: ['Figma Wireframes', 'Interactive Demos', 'User Flow Maps']
    },
    {
      slug: 'branding',
      icon: <Paintbrush size={24} className="text-teal-600" />,
      title: 'Branding',
      desc: 'Creating custom corporate logos, color systems, typography tokens, pitch documents, and guidelines to establish trustworthy authority.',
      features: ['Custom Brand Manual', 'Logo Architecture', 'Asset Guidelines']
    },
    {
      slug: 'seo-services',
      icon: <Search size={24} className="text-indigo-600" />,
      title: 'SEO',
      desc: 'Optimizing technical on-page code, search engine index sitemaps, structured schema data markup, and building rank-boosting backlink plans.',
      features: ['Core Web Vitals Pass', 'Structured Schema Data', 'Domain Audit Plans']
    },
    {
      slug: 'performance-marketing',
      icon: <BarChart size={24} className="text-rose-600" />,
      title: 'Performance Marketing',
      desc: 'Structuring targeted advertising funnels across Google Ads, Meta Ads, and LinkedIn to generate positive ROI customer acquisition.',
      features: ['High-conversion Funnels', 'A/B Ad Copies Tested', 'Direct CTR Reporting']
    },
    {
      slug: 'lead-generation',
      icon: <UserCheck size={24} className="text-indigo-600" />,
      title: 'Lead Generation',
      desc: 'Automating high-volume outbound sequences, building email lists, and designing lead magnets to feed the active sales pipelines.',
      features: ['Cold Email Workflows', 'Opt-in Landing Pages', 'Vetted Prospect Lists']
    },
    {
      slug: 'business-automation',
      icon: <Cpu size={24} className="text-emerald-600" />,
      title: 'Automation Solutions',
      desc: 'Connecting CRM databases, ticketing queues, accounting tools, and billing software to save internal operations hours.',
      features: ['Zapier & Make APIs', 'System Sync Schedules', 'Manual Task Removal']
    },
    {
      slug: 'business-consulting',
      icon: <Briefcase size={24} className="text-accent" />,
      title: 'Business Consulting',
      desc: 'Evaluating operation workflows, pricing lists, customer support processes, and team organization structures to boost bottom-line margins.',
      features: ['Operation Audits', 'Pricing Tier Setup', 'Org Restructures']
    },
    {
      slug: 'dedicated-team',
      icon: <Users2 size={24} className="text-cyan-600" />,
      title: 'Dedicated Development Team',
      desc: 'Staffing projects with seasoned full-stack engineers, QA testers, and designers working full-time directly under client control.',
      features: ['Vetted Senior Engineers', 'Daily Standup Syncs', 'Flexible Resource Scale']
    },
    {
      slug: 'growth-consulting',
      icon: <Rocket size={24} className="text-violet-600" />,
      title: 'Growth Strategy',
      desc: 'Identifying new markets, organizing growth hacking sprints, planning viral referral loops, and expanding enterprise accounts.',
      features: ['Referral Loops Built', 'Growth Hacking Sprints', 'Account Strategy Planning']
    },
    {
      slug: 'product-management',
      icon: <ListTodo size={24} className="text-amber-600" />,
      title: 'Product Management',
      desc: 'Organizing developmental product roadmaps, detailing sprint user stories, running agile scrums, and managing delivery timelines.',
      features: ['Jira / Linear Roadmaps', 'User Story Mapping', 'Release Cycles Monitored']
    }
  ];

  return (
    <div className="bg-white">
      <SEO title="Our Services - Digital Marketing, SEO & Web Development" description="Explore Zonova Technologies' professional agency services, including targeted SEO, social media marketing, lead generation, custom web/SaaS development, and corporate branding for UK and US markets." />

      {/* Banner */}
      <section className="relative overflow-hidden bg-bgSec py-20 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold shadow-sm select-none">
            ⚙️ Automations
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-extrabold shadow-sm select-none">
            📈 SEO & Marketing
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Compass size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Our Venture Capabilities
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            We provide all necessary technology, marketing, and strategy layers to take a startup from idea to scaling enterprise.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceList.map((srv, idx) => (
            <div key={idx} className="premium-card p-6 bg-white border border-slate-200/80 rounded-2xl text-left flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  {srv.icon}
                </div>
                <h3 className="font-extrabold text-xl text-secondary">{srv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed leading-5">
                  {srv.desc}
                </p>
                <div className="border-t border-slate-100 pt-4 space-y-2">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <ShieldCheck size={14} className="text-primary" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6">
                <Link
                  to={`/services/${srv.slug}`}
                  className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span>Explore Details</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-secondary text-white py-16 text-left border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Need a customized service package?</h2>
            <p className="text-slate-400 text-sm">We can assemble a dedicated multi-disciplinary team for your venture.</p>
          </div>
          <Link
            to="/book-meeting"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-7 rounded-xl text-sm transition-all"
          >
            Schedule Briefing Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
