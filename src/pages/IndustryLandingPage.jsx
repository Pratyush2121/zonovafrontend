import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { industryData } from '../utils/industryData';
import SEO from '../components/SEO';
import { 
  ArrowRight, ShieldCheck, Check, Star, 
  HelpCircle, Code, Layers, FileText, Database 
} from 'lucide-react';

const IndustryLandingPage = () => {
  const { industrySlug } = useParams();
  const data = industryData[industrySlug];
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50">
        <h1 className="text-3xl font-extrabold text-secondary">Vertical Not Found</h1>
        <p className="text-slate-500 mt-2 max-w-sm">
          We cannot locate the requested industry campaign. Explore our global venture engineering capabilities.
        </p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 btn-colorful px-6 py-3 rounded-xl text-sm font-bold shadow-md">
          <span>Explore All Services</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // Schema graph definition
  const pageUrl = `https://zonovatechnologies.online/industry/${industrySlug}`;
  const combinedSchema = React.useMemo(() => {
    const industrySchema = {
      "@type": "WebPage",
      "name": data.title,
      "description": data.description,
      "url": pageUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Zonova Technologies",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zonovatechnologies.online/images/logo.jpg"
        }
      }
    };

    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(faq => ({
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
              "name": `Industry - ${data.name}`,
              "item": pageUrl
            }
          ]
        },
        industrySchema,
        faqSchema
      ]
    };
  }, [data, pageUrl]);

  return (
    <div className="bg-white">
      <SEO 
        title={data.title} 
        description={data.description} 
        keywords={data.keywords}
        schema={combinedSchema}
        canonicalPath={`/industry/${industrySlug}`}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bgSec py-20 lg:py-28 border-b border-slate-100 text-left">
        <div className="absolute top-[20%] left-[-5%] w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-accent/5 filter blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="space-y-6 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest">
                📈 Industry Verticals
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-secondary leading-tight tracking-tight">
                {data.h1}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {data.intro}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {data.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center gap-1">
                    <Code size={12} className="text-primary" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                  <Star size={14} className="fill-primary" />
                  <span>Partnership Model</span>
                </div>
                <h3 className="font-extrabold text-xl text-secondary">Accelerate Your Vertical</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  We configure specialized marketing, programmatic SEO frameworks, and direct-response lead lists specifically for the {data.name} sector.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/book-meeting" className="w-full inline-flex justify-center items-center gap-2 py-3.5 btn-colorful rounded-xl text-sm font-bold transition-all shadow-md hover:scale-[1.02]">
                  <span>Get Industry Proposal</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            How We Grow {data.name} Brands
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Targeted strategies built on custom software, programmatic lists, and technical search authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex gap-4 items-start hover:border-primary/30 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Check size={16} className="stroke-[3]" />
              </div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study & Deliverables SILO Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Direct Case Study card */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  🏆 Featured Case Study
                </span>
                <h3 className="text-2xl font-extrabold text-secondary tracking-tight">
                  {data.caseStudy.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong>Challenge</strong>: {data.caseStudy.challenge}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Acquisition Metric</div>
                <div className="text-3xl font-black text-primary">{data.caseStudy.result}</div>
                <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-primary text-xs font-bold mt-4 hover:underline">
                  <span>Explore Portfolio Case Studies</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Key Deliverables catalog list */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-secondary tracking-tight border-b pb-3 flex items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  <span>Key Campaign Deliverables</span>
                </h3>
                <ul className="space-y-4">
                  {data.deliverables.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600">
                      <FileText size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every deliverable is integrated directly with standard conversion scripts, custom Google Analytics tracking, and secure rate-limiting nodes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 border-b border-slate-100">
        <div className="text-center mb-12 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            Vertical FAQs: {data.name}
          </h2>
          <p className="text-slate-500 text-sm">
            Answers regarding our customized {data.name} marketing campaigns and engineering standards.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {data.faqs.map((faq, idx) => (
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

      {/* SILO Internal Link Footer */}
      <section className="py-16 bg-white text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-extrabold text-sm text-secondary uppercase tracking-widest mb-6">Related Marketing Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/services/seo-services" className="p-4 border border-slate-200 rounded-xl hover:border-primary/40 transition-colors flex justify-between items-center group">
              <span className="font-bold text-sm text-secondary group-hover:text-primary">Search Engine Optimization</span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-primary" />
            </Link>
            <Link to="/services/web-development" className="p-4 border border-slate-200 rounded-xl hover:border-primary/40 transition-colors flex justify-between items-center group">
              <span className="font-bold text-sm text-secondary group-hover:text-primary">Custom React Development</span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-primary" />
            </Link>
            <Link to="/services/performance-marketing" className="p-4 border border-slate-200 rounded-xl hover:border-primary/40 transition-colors flex justify-between items-center group">
              <span className="font-bold text-sm text-secondary group-hover:text-primary">Performance Marketing</span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-primary" />
            </Link>
            <Link to="/services/business-automation" className="p-4 border border-slate-200 rounded-xl hover:border-primary/40 transition-colors flex justify-between items-center group">
              <span className="font-bold text-sm text-secondary group-hover:text-primary">Operations Automation</span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryLandingPage;
