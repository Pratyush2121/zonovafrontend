import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { locationData } from '../utils/locationData';
import SEO from '../components/SEO';
import { 
  ArrowRight, ShieldCheck, MapPin, Phone, Mail, 
  HelpCircle, Compass, Star, Check 
} from 'lucide-react';

const LocationLandingPage = () => {
  const { location } = useParams();
  const locKey = location?.toLowerCase();
  const data = locationData[locKey];

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50">
        <h1 className="text-3xl font-extrabold text-secondary">Location Portal Not Found</h1>
        <p className="text-slate-500 mt-2 max-w-sm">
          We cannot locate the requested local growth desk. Explore our global venture engineering capabilities.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 btn-colorful px-6 py-3 rounded-xl text-sm font-bold shadow-md">
          <span>Return Home</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // Build JSON-LD LocalBusiness, FAQPage & Breadcrumb schema graph
  const combinedSchema = React.useMemo(() => {
    if (!data) return null;
    const pageUrl = `https://zonovatechnologies.online/digital-marketing-agency-${locKey}`;
    const localBusinessSchema = {
      "@type": "ProfessionalService",
      "name": `Zonova Technologies - ${data.name} Office`,
      "description": data.description,
      "image": "https://zonovatechnologies.online/favicon.svg",
      "url": pageUrl,
      "telephone": "+919335088060",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.address,
        "addressLocality": data.name,
        "addressRegion": data.country === "India" ? "MH" : "Global",
        "addressCountry": data.country === "India" ? "IN" : data.country === "New Zealand" ? "NZ" : "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": data.latitude,
        "longitude": data.longitude
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
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
              "name": `Digital Marketing Agency - ${data.name}`,
              "item": pageUrl
            }
          ]
        },
        localBusinessSchema,
        faqSchema
      ]
    };
  }, [data, locKey]);

  return (
    <div className="bg-white">
      <SEO 
        title={data.title} 
        description={data.description} 
        keywords={data.keywords}
        schema={combinedSchema}
        canonicalPath={`/digital-marketing-agency-${locKey}`}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-bgSec py-20 lg:py-28 border-b border-slate-100 text-left">
        <div className="absolute top-[20%] left-[-5%] w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-accent/5 filter blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="space-y-6 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest">
                📍 Local Market Operations
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-secondary leading-tight tracking-tight">
                {data.h1}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {data.intro}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-2">
                <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                  <MapPin size={14} className="text-primary" />
                  <span>Serving {data.name}, {data.country}</span>
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                  <Phone size={14} className="text-primary" />
                  <span>+91 9335088060</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                  <Star size={14} className="fill-primary" />
                  <span>Local Consulting Desk</span>
                </div>
                <h3 className="font-extrabold text-xl text-secondary">Start Your Growth Sprint</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  We match our software architecture with targeted local search engines and custom analytics dashboards to drive active conversions.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/book-meeting" className="w-full inline-flex justify-center items-center gap-2 py-3.5 btn-colorful rounded-xl text-sm font-bold transition-all shadow-md hover:scale-[1.02]">
                  <span>Schedule Strategy Meeting</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Localized Content Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
              Scaling B2B Pipelines and Web Tech in {data.name}
            </h2>
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{data.bodyText}</p>
              <p>
                Our venture studio setup integrates key SEO blueprints, Google Search Console indexing parameters, and custom Node/React modules right at the foundational phase. We ensure that every digital channel we configure is 100% compliant with accessibility tags and Core Web Vitals targets.
              </p>
              <p className="font-bold text-primary">{data.ctaText}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-secondary text-sm border-b pb-2">Office Reference Data</h3>
            <div className="space-y-3 text-xs text-slate-500">
              <div className="flex gap-2 items-start">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{data.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Compass size={16} className="text-primary shrink-0" />
                <span>Geo Coordinates: {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:zonovatechnologies@gmail.com" className="hover:underline">zonovatechnologies@gmail.com</a>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <span>Status: MCA Active Registration</span>
              <Check size={12} className="text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Localized FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 border-t border-slate-100">
        <div className="text-center mb-12 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            Frequently Asked Questions in {data.name}
          </h2>
          <p className="text-slate-500 text-sm">
            Common questions regarding our localized digital marketing and venture design services.
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

      {/* Global Brand Footer Callout */}
      <section className="bg-secondary text-white py-16 text-left border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Build Your Ventures With Confidence</h2>
            <p className="text-slate-400 text-sm">Join founders around the world co-investing in next-generation platforms.</p>
          </div>
          <Link
            to="/startup-partnership"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-7 rounded-xl text-sm transition-all"
          >
            Apply for Co-building
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LocationLandingPage;
