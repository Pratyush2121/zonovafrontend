import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../utils/servicesData';
import SEO from '../components/SEO';
import { 
  ArrowRight, ShieldCheck, HelpCircle, Briefcase, 
  MessageSquare, Star, ArrowUpRight, Check 
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
  const serviceUrl = `https://www.zonovatechnology.online/services/${slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Zonova Technologies",
      "url": "https://www.zonovatechnology.online",
      "logo": "https://www.zonovatechnology.online/images/logo.jpg"
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

  // Combine schemas into a BreadcrumbList + Service + FAQPage graph
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zonovatechnology.online"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.zonovatechnology.online/services"
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
