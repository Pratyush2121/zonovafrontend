import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../utils/servicesData';
import SEO from '../components/SEO';
import { 
  ArrowRight, ShieldCheck, HelpCircle, Briefcase, 
  MessageSquare, Star, ArrowUpRight, Check, X, Info, Calendar, DollarSign 
} from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData[slug];

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-3xl font-extrabold text-secondary">Service Not Found</h1>
        <p className="text-slate-500 mt-2 max-w-sm">
          We cannot locate the requested service capability page. Please explore our general offering dashboard.
        </p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 btn-colorful px-6 py-3 rounded-xl text-sm font-bold shadow-md">
          <span>Explore Services</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // Build JSON-LD Structured Data Schema for Search Engines
  const serviceUrl = `https://zonovatechnologies.online/services/${slug}`;
  const combinedSchema = React.useMemo(() => {
    if (!service) return null;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Zonova Technologies",
        "url": "https://zonovatechnologies.online",
        "logo": "https://zonovatechnologies.online/images/logo.jpg"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United States" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": service.title,
        "itemListElement": service.features.map((feat, idx) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": feat.name,
            "description": feat.desc
          }
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://zonovatechnologies.online"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://zonovatechnologies.online/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": service.title,
              "item": serviceUrl
            }
          ]
        },
        serviceSchema,
        faqSchema
      ]
    };
  }, [service, serviceUrl]);

  return (
    <div className="bg-white">
      <SEO 
        title={service.title} 
        description={service.metaDescription} 
        keywords={service.keywords}
        schema={combinedSchema}
        canonicalPath={`/services/${slug}`}
      />

      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-bgSec py-20 lg:py-28 border-b border-slate-100 text-left">
        <div className="absolute top-[20%] left-[-5%] w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-accent/5 filter blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest">
                ⚙️ Dedicated Service Capability
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-secondary leading-tight tracking-tight">
                {service.h1}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                {service.intro}
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl flex flex-col justify-between max-w-sm w-full">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                  <Star size={14} className="fill-primary" />
                  <span>Start Your Venture Project</span>
                </div>
                <h3 className="font-extrabold text-xl text-secondary">Ready to build or scale?</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Book a strategic briefing with our experts to review scope, timelines, and budgets.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/book-meeting" className="w-full inline-flex justify-center items-center gap-2 py-3 btn-colorful rounded-xl text-sm font-bold transition-all shadow-md">
                  <span>Schedule Consultation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features / Delivery Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            How We Deliver Results
          </h2>
          <p className="text-slate-500 text-base">
            Providing high-quality expertise engineered around startup unit economics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.features.map((feat, idx) => (
            <div key={idx} className="premium-card p-8 bg-white border border-slate-200/80 rounded-3xl flex flex-col justify-between text-left hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-secondary">{feat.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed leading-6">
                  {feat.desc}
                </p>
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-widest">
                <span>Enterprise Standard</span>
                <Check size={14} className="stroke-[3]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AEO & GEO Optimization Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          {/* 1. Executive Summary & Direct Definition (AEO/GEO Quick Answer) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <Info size={14} />
              <span>Executive Summary & Quick Answer</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
                What is {service.title}?
              </h2>
              <div className="bg-slate-50 border-l-4 border-primary p-5 rounded-r-2xl text-slate-700 text-sm leading-relaxed">
                <strong>Direct Definition:</strong> <dfn className="font-bold text-secondary not-italic bg-white px-1.5 py-0.5 border border-slate-200 rounded mr-1">{service.title}</dfn> is defined as a strategic engineering and growth capability deployed by Zonova Technologies to {service.intro.toLowerCase()}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                By combining client-side code architectures, secure database pipelines, and direct-response marketing configurations under a unified venture studio team, we eliminate typical agency delays and launch high-converting channels in weeks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Estimated Timeline</span>
                <span className="font-extrabold text-secondary text-sm">
                  {['startup-consulting', 'branding'].includes(slug) ? '2 - 3 Weeks' : ['mvp-development', 'ui-ux-design'].includes(slug) ? '4 - 8 Weeks' : '8 - 12 Weeks'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Resource Standard</span>
                <span className="font-extrabold text-primary text-sm">Senior Vetted Developers</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">IP Ownership</span>
                <span className="font-extrabold text-secondary text-sm">100% Client-Owned</span>
              </div>
            </div>
          </div>

          {/* 2. Tech Stack & Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-secondary border-b pb-3 flex items-center gap-2">
                <ShieldCheck className="text-primary" size={20} />
                <span>Technology Stack & Tools</span>
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We design with high-performance frameworks and analytics architectures to ensure page speeds load under 1 second.
              </p>
              <div className="flex flex-wrap gap-2">
                {(['startup-consulting', 'performance-marketing', 'lead-generation', 'seo-services'].includes(slug) 
                  ? ['Google Analytics 4', 'GTM', 'Google Search Console', 'HubSpot CRM', 'SEMrush', 'Ahrefs']
                  : ['branding', 'ui-ux-design'].includes(slug)
                    ? ['Figma', 'Adobe Creative Suite', 'SVG Optimization', 'CSS Variables', 'Tailwind CSS']
                    : ['React', 'Node.js', 'Express', 'MongoDB', 'MERN Stack', 'REST APIs', 'Vercel / AWS']
                ).map((tech, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-secondary border-b pb-3 flex items-center gap-2">
                <Briefcase className="text-primary" size={20} />
                <span>Campaign Key Deliverables</span>
              </h3>
              <ul className="space-y-3.5">
                {(['startup-consulting', 'performance-marketing', 'lead-generation', 'seo-services'].includes(slug)
                  ? [
                      'Comprehensive keyword research report and roadmap files',
                      'Verified prospect databases synced to your sales team CRM',
                      'Fully configured GA4 dashboards and conversion goal tracking tags',
                      'Direct-response landing pages and optimized paragraph copy drafts'
                    ]
                  : ['branding', 'ui-ux-design'].includes(slug)
                    ? [
                        'Scalable vector logo assets (.SVG, .PNG, .EPS formats)',
                        'Comprehensive typography rules and CSS/Tailwind token configurations',
                        'High-fidelity Figma wireframes and interactive prototype paths',
                        'Consistent visual guidelines manual and layout rules'
                      ]
                    : [
                        'Production-ready client Git repository with clean commit history',
                        'Scalable database schemas and REST API documentation endpoints',
                        'Blazing-fast responsive frontend views with dynamic state controllers',
                        'Automated pipeline configuration for CI/CD launch cycles'
                      ]
                ).map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0 mt-0.5 stroke-[3]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Pricing Factors Guide */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-secondary border-b pb-3 flex items-center gap-1.5">
              <DollarSign className="text-primary" size={20} />
              <span>Investment & Pricing Factors</span>
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We operate under a transparent venture studio layout. Pricing structures are driven by the following parameters:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
              {(['startup-consulting', 'branding', 'ui-ux-design'].includes(slug)
                ? [
                    'Total brand system assets or screen designs scoped',
                    'Financial modeling complexity and cohort count requirements',
                    'Figma feedback loops and review iterations',
                    'Integration with pre-existing design systems and guides'
                  ]
                : [
                    'Total database schemas and table relationships to map',
                    'Complexity of external APIs integrated (Stripe Connect, Twilio, maps)',
                    'Programmatic landing page and database configurations',
                    'Custom compliance parameters required (HIPAA, GDPR controls)'
                  ]
              ).map((factor, idx) => (
                <div key={idx} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex gap-2 items-start">
                  <span className="font-bold text-primary shrink-0 mt-0.5">•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Decision and Comparison Table */}
          <div className="space-y-6">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
                Comparison Guide & Model Decision Table
              </h2>
              <p className="text-slate-500 text-sm">
                How our custom development model stacks up against other standard execution methods.
              </p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-secondary font-bold text-xs uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Delivery Parameters</th>
                    <th className="p-4 sm:p-5">Freelancer Hiring</th>
                    <th className="p-4 sm:p-5">Traditional Agency</th>
                    <th className="p-4 sm:p-5 bg-primary/5 text-primary border-l border-primary/20">Zonova Venture Studio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-secondary">Operational Velocity</td>
                    <td className="p-4 sm:p-5">Variable / High risk of delay</td>
                    <td className="p-4 sm:p-5">Slow due to account hierarchies</td>
                    <td className="p-4 sm:p-5 bg-primary/5 border-l border-primary/20 text-secondary font-bold">Fast Sprints (Prototyping in 4-8 weeks)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-secondary">Code Quality & Stack</td>
                    <td className="p-4 sm:p-5">Inconsistent / No QA checks</td>
                    <td className="p-4 sm:p-5">Legacy templates & bloat</td>
                    <td className="p-4 sm:p-5 bg-primary/5 border-l border-primary/20 text-secondary font-bold">Modern React/Next & clean MVC patterns</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-secondary">Marketing Integration</td>
                    <td className="p-4 sm:p-5">None (Code only)</td>
                    <td className="p-4 sm:p-5">Disconnected departments</td>
                    <td className="p-4 sm:p-5 bg-primary/5 border-l border-primary/20 text-secondary font-bold">Unified (Codes built to target CTR conversion)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-secondary">Project Risk Model</td>
                    <td className="p-4 sm:p-5">High (Individual churn risk)</td>
                    <td className="p-4 sm:p-5">Fixed retainers, no performance metrics</td>
                    <td className="p-4 sm:p-5 bg-primary/5 border-l border-primary/20 text-secondary font-bold">Low (Shared metrics, milestone validation)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Delivery Process & Timeline Sprints */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-secondary tracking-tight text-center md:text-left">
              Step-by-Step Delivery Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Scope & Align', desc: 'Identify core parameters, target keywords, user journeys, and mock structures.', icon: <Briefcase className="w-5 h-5 text-indigo-500" /> },
                { step: '02', title: 'Figma & Visuals', desc: 'Design visual manual layouts and page interactions for client verification.', icon: <HelpCircle className="w-5 h-5 text-cyan-500" /> },
                { step: '03', title: 'Code Sprints', desc: 'Deploy database models, responsive frontend views, and third-party APIs.', icon: <ShieldCheck className="w-5 h-5 text-amber-500" /> },
                { step: '04', title: 'Launch & Optimize', desc: 'Enforce Core Web Vitals checks, schema validation, and scale search index.', icon: <Calendar className="w-5 h-5 text-emerald-500" /> }
              ].map((proc, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border flex items-center justify-center">
                      {proc.icon}
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Phase {proc.step}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-secondary text-sm">{proc.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{proc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Pros & Cons Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-secondary border-b pb-2 flex items-center gap-2">
                <Check className="text-emerald-600 stroke-[3]" size={20} />
                <span>Advantages & Strategic Benefits</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span><strong>Velocity of Execution</strong>: Sprints structured to launch initial versions in weeks, not years.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span><strong>Top-tier Developers</strong>: Access to senior, vetted developers bypassing recruitment latency.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span><strong>SEO and AEO Built-in</strong>: Content tags and technical schemas pre-installed directly at launch.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-secondary border-b pb-2 flex items-center gap-2">
                <X className="text-rose-600 stroke-[3]" size={20} />
                <span>Operational Constraints</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Selective Partnerships</strong>: We restrict client onboard capacity to maintain developer quality.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>No Legacy Maintenance</strong>: Focus is structured on high-growth scaling, not support on dated stacks.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Unit Economics Requirements</strong>: Sprints require baseline market validation checks to launch.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 7. Common Pitfalls */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-secondary uppercase tracking-wider text-rose-600">Common Industry Mistakes</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p><strong>Over-scoping MVP Sprints</strong>: Building complex multi-tier features before validating core value loops exhaust seed budgets prematurely.</p>
                <p><strong>Neglecting Search Index Readiness</strong>: Postponing technical SEO tags, canonical routes, and schemas until months post-release blocks organic crawler indexing.</p>
              </div>
            </div>
            
            <div className="space-y-4 md:border-l md:pl-8 border-slate-200">
              <h3 className="text-base font-bold text-secondary uppercase tracking-wider text-primary">Why Choose Zonova Technologies</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p><strong>Dual DNA Architecture</strong>: We combine robust MERN code structures with expert search optimization and direct-response performance campaigns simultanously.</p>
                <p><strong>MCA Registry Transparency</strong>: Verified active registry (CIN: U68200MH2025PTC449258) built on long-term corporate compliance and director DIN standards.</p>
              </div>
            </div>
          </div>

          {/* 8. Industries Served (SILO Architectural Links) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-secondary border-b pb-3 uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Info size={14} className="text-primary" />
              <span>Target Industries Served</span>
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Explore how we tailor our core {service.title.toLowerCase()} specifically across different business verticals:
            </p>
            <div className="flex flex-wrap gap-3">
              {(() => {
                const isMarketing = ['seo-services', 'performance-marketing', 'lead-generation'].includes(slug);
                const isBranding = ['branding', 'ui-ux-design'].includes(slug);
                let links = [];

                if (isMarketing) {
                  links = [
                    { name: 'Healthcare Providers', path: '/industry/digital-marketing-for-healthcare' },
                    { name: 'Real Estate Networks', path: '/industry/digital-marketing-for-real-estate' },
                    { name: 'Construction Contractors', path: '/industry/digital-marketing-for-construction' },
                    { name: 'Education Academies', path: '/industry/digital-marketing-for-education' },
                    { name: 'Food & Restaurants', path: '/industry/digital-marketing-for-restaurants' },
                    { name: 'SaaS Startups', path: '/industry/seo-for-saas-startups' },
                    { name: 'E-commerce Brands', path: '/industry/ai-marketing-for-ecommerce' }
                  ];
                } else if (isBranding) {
                  links = [
                    { name: 'SaaS Startups', path: '/industry/branding-for-startups' },
                    { name: 'Educational Institutions', path: '/industry/digital-marketing-for-education' }
                  ];
                } else {
                  links = [
                    { name: 'Manufacturing Catalogs', path: '/industry/web-development-for-manufacturing' },
                    { name: 'SaaS Tech Startups', path: '/industry/seo-for-saas-startups' },
                    { name: 'E-commerce Stores', path: '/industry/ai-marketing-for-ecommerce' }
                  ];
                }

                return links.map((lnk, i) => (
                  <Link 
                    key={i} 
                    to={lnk.path}
                    className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-primary hover:text-white px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all duration-300"
                  >
                    <span>{lnk.name}</span>
                    <ArrowRight size={10} />
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* 9. Final CTA Block */}
          <div className="bg-secondary text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-80 h-80 rounded-full bg-primary/20 filter blur-3xl" />
            <div className="space-y-3 z-10 text-center md:text-left">
              <h3 className="text-2xl font-extrabold sm:text-3xl">Ready to Launch Your Sprints?</h3>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Connect with our senior architects to outline scope parameters and build a conversion validation deck.
              </p>
            </div>
            <Link 
              to="/book-meeting" 
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all z-10 shrink-0 shadow-lg shadow-primary/20 hover:scale-105"
            >
              Apply for Sprints
            </Link>
          </div>

        </div>
      </section>

      {/* Internal Links Block */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-secondary">Explore Client Success</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Read case studies detailing our recent startup and SaaS engineering releases.
                </p>
              </div>
              <Link to="/portfolio" className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1">
                <span>View Portfolio Cases</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-secondary">Latest Strategy & Blueprints</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Discover tactical updates regarding search optimization, React, and startup scaling.
                </p>
              </div>
              <Link to="/blog" className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1">
                <span>Read Blog Insights</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-secondary">Contact Our Team</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Get in touch directly to discuss custom agency services or partnerships.
                </p>
              </div>
              <Link to="/contact" className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1">
                <span>Reach Contact Desk</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about our {service.title}.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {service.faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-secondary text-base pr-4">{faq.q}</span>
                <div className={`p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-primary' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeFaq === idx ? 'max-h-60 border-t border-slate-100 p-6 bg-slate-50/50' : 'max-h-0'
                }`}
              >
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
