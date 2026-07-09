import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, CheckCircle2, ChevronRight, MessageSquare, Star, ArrowUpRight, TrendingUp, Sparkles, Send, Lightbulb, Cpu, Rocket, Code, BarChart, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';
import { resolveUrl } from '../utils/resolveUrl.js';

const Home = () => {
  const { settings } = useSelector((state) => state.settings);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [emailSub, setEmailSub] = useState('');
  const [subMessage, setSubMessage] = useState({ type: '', text: '' });

  // FAQ Accordion index
  const [faqIndex, setFaqIndex] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [blogRes, faqRes] = await Promise.all([
          fetch('/api/blogs?status=published&limit=3'),
          fetch('/api/faqs?limit=5')
        ]);

        const blogData = await blogRes.json();
        const faqData = await faqRes.json();

        if (blogData.success) setBlogs(blogData.blogs);
        if (faqData.success) setFaqs(faqData.faqs);
      } catch (err) {
        console.error('Error fetching home page data:', err);
      }
    };

    fetchHomeData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailSub) return;
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSub })
      });
      const data = await res.json();
      if (data.success) {
        setSubMessage({ type: 'success', text: 'Subscribed successfully!' });
        setEmailSub('');
      } else {
        setSubMessage({ type: 'error', text: data.message || 'Subscription failed.' });
      }
    } catch (err) {
      setSubMessage({ type: 'error', text: 'Server error. Please try again.' });
    }
  };

  const partners = [
    { name: 'Clutch', logo: '/images/clutch.svg' },
    { name: 'GoodFirms', logo: '/images/goodfirms.svg' },
    { name: 'AppFutura', logo: '/images/appfutura.svg' },
    { name: 'Freelancer', logo: '/images/freelancer.svg' },
    { name: 'Top Developer', logo: '/images/topdeveloper.svg' }
  ];

  const services = [
    {
      title: 'Software Development',
      desc: 'Web Apps, Mobile Apps & Custom SaaS Platforms.',
      subheadings: [
        'Web App Development',
        'Mobile App Development',
        'SaaS Development'
      ],
      link: '/services/web-development',
      icon: <Code className="w-7 h-7 text-primary" />
    },
    { title: 'Performance Marketing', desc: 'Acquiring active customers, running lead ads, and scaling campaigns.', link: '/services/performance-marketing', icon: <BarChart className="w-7 h-7 text-rose-600" /> },
    { title: 'Business Automation', desc: 'Streamlining operations, integrating systems, and scaling workflows.', link: '/services/business-automation', icon: <Cpu className="w-7 h-7 text-emerald-600" /> },
    { title: 'Venture Consulting', desc: 'Validating business concepts, product strategy, and growth strategy.', link: '/services/startup-consulting', icon: <Compass className="w-7 h-7 text-amber-600" /> }
  ];

  const steps = [
    { step: '01', title: 'Validate Idea', desc: 'We stress-test ideas against target audiences and market data.', icon: <Lightbulb className="w-6 h-6 text-indigo-500" /> },
    { step: '02', title: 'Build Prototype & MVP', desc: 'Quickly develop interactive high-quality prototypes and MVPs.', icon: <Cpu className="w-6 h-6 text-cyan-500" /> },
    { step: '03', title: 'Launch & Acquire', desc: 'Set up marketing funnels and automation to generate active revenue.', icon: <Rocket className="w-6 h-6 text-amber-500" /> },
    { step: '04', title: 'Scale & Optimize', desc: 'Continuously iterate performance, product, and cost models.', icon: <TrendingUp className="w-6 h-6 text-emerald-500" /> }
  ];

  const coreValues = [
    { title: 'Venture Studio Model', desc: 'We co-invest resources, matching code and strategy with risk.' },
    { title: 'Speed to Market', desc: 'No enterprise bloat. We launch validated products in weeks, not years.' },
    { title: 'Dual Marketing-Tech DNA', desc: 'Code means nothing without customers. We build both simultaneously.' }
  ];



  const homeSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://zonovatechnologies.online/#website",
        "url": "https://zonovatechnologies.online",
        "name": "Zonova Technologies",
        "description": "Zonova Technologies is a leading digital marketing agency & web development company.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://zonovatechnologies.online/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://zonovatechnologies.online/#organization",
        "name": "Zonova Technologies Private Limited",
        "url": "https://zonovatechnologies.online",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zonovatechnologies.online/images/logo.jpg"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919335088060",
          "contactType": "customer service",
          "email": "zonovatechnologies@gmail.com",
          "areaServed": ["IN", "US", "GB"]
        },
        "sameAs": [
          "https://linkedin.com",
          "https://twitter.com",
          "https://facebook.com"
        ]
      }
    ]
  }), []);

  return (
    <div className="bg-white">
      <SEO 
        title="Premium Digital Marketing & Web Development Agency" 
        description="Zonova Technologies is a leading digital marketing agency & website development company. We deliver premier SEO services, social media marketing, lead generation, branding, and custom SaaS engineering in London, UK, and US." 
        schema={homeSchema}
        canonicalPath=""
      />

      {/* Hidden semantic search indexing section associating Pratyush Mishra with the platform */}
      <div style={{ display: 'none' }} aria-hidden="true" className="sr-only">
        <h2>Pratyush Mishra &bull; Zonova Technologies</h2>
        <p>
          This website, design system, and digital marketing layout were engineered, developed, and optimized under the technical direction of Pratyush Mishra. For comprehensive technical search strategies, business automation solutions, and enterprise engineering campaigns, learn more via the official developer profile directories of Pratyush Mishra at Zonova Technologies.
        </p>
        <a href="https://zonovatechnologies.online" rel="designer">Pratyush Mishra search validation anchor</a>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-16 md:pt-16 lg:pt-28 lg:pb-32 bg-gradient-to-b from-bgSec/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Hero Text */}
            <div className="space-y-8 text-left animate-fade-in">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
                <Sparkles size={14} className="animate-pulse" />
                <span>Your End-to-End Startup Growth Partner</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary leading-tight tracking-tight">
                Empowers your Businesses with{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Innovation
                </span>{' '}
                and Smart Solutions
              </h1>
              <p className="text-xl font-extrabold text-primary tracking-wider uppercase">
                Software Development Agency & Your Growth partner
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
                Helping founders and businesses turn ambitious ideas into successful companies through technology, performance marketing, operations automation, and business design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/book-meeting"
                  className="inline-flex items-center justify-center gap-3 btn-colorful pl-6 pr-4 py-3.5 rounded-full text-base font-bold transition-all hover:scale-[1.02] group"
                >
                  <span>Let's! Talk about You</span>
                  <div className="bg-white/20 text-white p-2 rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={18} className="stroke-[3]" />
                  </div>
                </Link>
                <Link
                  to="/startup-partnership"
                  className="inline-flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-[1.02] text-center"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            {/* Hero Interactive Stickers Column */}
            <div className="relative flex justify-center items-center lg:mt-0 mt-12 w-full max-w-[540px] mx-auto aspect-[5/4] sm:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/10 rounded-3xl filter blur-3xl transform rotate-3 scale-95 -z-10" />

              {/* Central vector team/tech line art SVG */}
              <div className="w-full h-full flex items-center justify-center p-8 select-none">
                <svg viewBox="0 0 500 400" className="w-full h-auto text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#15803D" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0.03" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#15803D" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#15803D" />
                      <stop offset="50%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>
                  <rect x="10" y="10" width="480" height="380" rx="24" fill="url(#grad1)" />
                  <path d="M50 50 h400 v300 h-400 z" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <line x1="150" y1="50" x2="150" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <line x1="250" y1="50" x2="250" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <line x1="350" y1="50" x2="350" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <line x1="50" y1="150" x2="450" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <line x1="50" y1="250" x2="450" y2="250" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 8" />
                  <path d="M 80,300 C 150,220 200,340 320,180 C 380,100 420,120 440,80" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 80,300 C 150,220 200,340 320,180 C 380,100 420,120 440,80" stroke="#15803D" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.08" />
                  <circle cx="80" cy="300" r="8" fill="#15803D" />
                  <circle cx="80" cy="300" r="16" stroke="#15803D" strokeWidth="2" strokeOpacity="0.3" />
                  <circle cx="320" cy="180" r="8" fill="#D97706" />
                  <circle cx="320" cy="180" r="16" stroke="#D97706" strokeWidth="2" strokeOpacity="0.3" />
                  <circle cx="440" cy="80" r="8" fill="#0F172A" />
                  <circle cx="440" cy="80" r="16" stroke="#0F172A" strokeWidth="2" strokeOpacity="0.3" />

                  {/* Founder abstract outline */}
                  <circle cx="160" cy="200" r="25" stroke="#475569" strokeWidth="2" fill="white" />
                  <path d="M 125,260 C 125,235 145,225 160,225 C 175,225 195,235 195,260" stroke="#475569" strokeWidth="2" fill="white" />

                  {/* Builder abstract outline */}
                  <circle cx="250" cy="160" r="30" stroke="#15803D" strokeWidth="2.5" fill="white" />
                  <path d="M 205,235 C 205,200 230,190 250,190 C 270,190 295,200 295,235" stroke="#15803D" strokeWidth="2.5" fill="white" />
                  <path d="M 235,160 L 265,160 M 250,145 L 250,175" stroke="#15803D" strokeWidth="1.5" />

                  {/* Marketer abstract outline */}
                  <circle cx="340" cy="210" r="22" stroke="#D97706" strokeWidth="2" fill="white" />
                  <path d="M 310,265 C 310,242 328,232 340,232 C 352,232 370,242 370,265" stroke="#D97706" strokeWidth="2" fill="white" />

                  {/* Widget 1: Analytics */}
                  <g transform="translate(360, 260)">
                    <rect x="0" y="0" width="80" height="60" rx="8" stroke="#E2E8F0" strokeWidth="1" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.03))" />
                    <rect x="12" y="32" width="10" height="18" rx="1.5" fill="#15803D" />
                    <rect x="28" y="18" width="10" height="32" rx="1.5" fill="#D97706" />
                    <rect x="44" y="10" width="10" height="40" rx="1.5" fill="#0F172A" />
                    <rect x="60" y="25" width="10" height="25" rx="1.5" fill="#16A34A" />
                  </g>

                  {/* Widget 2: Code Window */}
                  <g transform="translate(50, 75)">
                    <rect x="0" y="0" width="110" height="70" rx="8" stroke="#E2E8F0" strokeWidth="1" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.03))" />
                    <circle cx="12" cy="12" r="3" fill="#B45309" />
                    <circle cx="22" cy="12" r="3" fill="#D97706" />
                    <circle cx="32" cy="12" r="3" fill="#15803D" />
                    <path d="M 12,30 L 50,30 M 12,42 L 85,42 M 12,54 L 65,54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Widget 3: Rocket */}
                  <g transform="translate(225, 60)">
                    <path d="M25 0 C25 0 35 15 35 25 C35 35 30 40 25 40 C20 40 15 35 15 25 C15 15 25 0 25 0 Z" fill="url(#grad2)" stroke="#15803D" strokeWidth="1.5" />
                    <path d="M20 40 L15 50 L25 45 L35 50 L30 40" stroke="#D97706" strokeWidth="1.5" fill="#FEF3C7" />
                  </g>
                </svg>
              </div>

              {/* Absolutely floating stickers */}
              <div className="absolute top-[5%] left-[2%] sm:left-[5%] animate-float-slow z-10 select-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50/70 text-rose-700 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
                  💖 Venture Consulting
                </span>
              </div>

              <div className="absolute top-[18%] right-[-2%] sm:right-[2%] animate-float-medium z-10 select-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50/70 text-emerald-700 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
                  💚 MVP Development
                </span>
              </div>

              <div className="absolute bottom-[22%] left-[-4%] sm:left-[-2%] animate-float-fast z-10 select-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-50/70 text-amber-700 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
                  💛 SaaS Products
                </span>
              </div>

              <div className="absolute bottom-[8%] right-[4%] sm:right-[8%] animate-float-slow z-10 select-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-orange-50/70 text-orange-700 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
                  🧡 AI & Automation
                </span>
              </div>

              <div className="absolute top-[48%] right-[8%] sm:right-[15%] animate-float-medium z-10 select-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-green-50/70 text-green-700 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
                  💚 Growth Marketing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Infinite Scrolling Ticker (Dual Slider Banner) */}
      <section className="w-full py-6 bg-slate-50/50 overflow-hidden space-y-4 select-none">
        {/* Service Marquee */}
        <div className="relative w-full overflow-hidden flex flex-row">
          <div className="animate-marquee flex gap-4 pr-4">
            {[
              "Venture Consulting 💼", "MVP Development 🚀", "SaaS Architecture ☁️", "Mobile Apps 📱",
              "UI/UX Design 🎨", "Branding & Identity 🏷️", "SEO Optimization 🔍", "Performance Marketing 📈",
              "Lead Generation ✉️", "Business Automation ⚙️", "Dedicated Teams 👥", "Product Management 🗓️",
              "Startup Consulting 🧭", "Web Engineering 🌐", "AI & Chatbots 🧠", "Growth Strategy 🚀",
              "Venture Consulting 💼", "MVP Development 🚀", "SaaS Architecture ☁️", "Mobile Apps 📱",
              "UI/UX Design 🎨", "Branding & Identity 🏷️", "SEO Optimization 🔍", "Performance Marketing 📈",
              "Lead Generation ✉️", "Business Automation ⚙️", "Dedicated Teams 👥", "Product Management 🗓️",
              "Startup Consulting 🧭", "Web Engineering 🌐", "AI & Chatbots 🧠", "Growth Strategy 🚀"
            ].map((service, index) => (
              <div
                key={`service-${index}`}
                className="bg-white text-slate-800 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-default"
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Technology Marquee */}
        <div className="relative w-full overflow-hidden flex flex-row">
          <div className="animate-marquee-fast flex gap-4 pr-4">
            {[
              "ReactJS ⚛️", "Node.js 🟢", "Python 🐍", "MongoDB 🍃",
              "Express 🚀", "iOS Apps 🍎", "Android Apps 🤖", "AI Models 🧠",
              "Stripe Payments 💳", "Make.com ⚙️", "Tailwind CSS 🎨", "Vite ⚡",
              "TypeScript 📘", "Next.js 🌐", "Redux Toolkit 🔄", "Cloud Services ☁️",
              "ReactJS ⚛️", "Node.js 🟢", "Python 🐍", "MongoDB 🍃",
              "Express 🚀", "iOS Apps 🍎", "Android Apps 🤖", "AI Models 🧠",
              "Stripe Payments 💳", "Make.com ⚙️", "Tailwind CSS 🎨", "Vite ⚡",
              "TypeScript 📘", "Next.js 🌐", "Redux Toolkit 🔄", "Cloud Services ☁️"
            ].map((tech, index) => (
              <div
                key={`tech-${index}`}
                className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Services Overview */}
      <section className="py-20 bg-bgSec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Our Core Engine
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              We provide startup support across four strategic pillars to build companies that scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="premium-card p-8 rounded-2xl bg-white flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 group-hover:scale-105 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="text-xl font-bold text-secondary">{s.title}</h3>
                    {s.subheadings ? (
                      <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                        {s.subheadings.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-xs font-bold text-slate-700">{sub}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    )}
                  </div>
                </div>
                <div className="pt-6">
                  <Link to={s.link} className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 btn-colorful rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02]">
                    <span>Explore Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 shadow-sm transition-all"
            >
              See all 16 modular service capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Zonova */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
                Why Founders Choose Zonova
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Traditional dev shops build scopes. We build enterprises. Here is what makes Zonova the ultimate venture building partner.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreValues.map((v, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50/60 shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
                  <h3 className="font-bold text-lg text-secondary">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Startup Growth Process */}
      <section className="py-20 bg-bgSec relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Our Growth Process
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              A systematic framework to launch products in fast cycles and limit capital risk.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-12">
            {/* Desktop horizontal connection line */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-primary/25 via-accent/25 to-emerald-500/25 -translate-y-12 z-0 animate-pulse" />

            {steps.map((st, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left border border-slate-100/80 overflow-hidden z-10 flex flex-col justify-between min-h-[240px]"
              >
                {/* Background Watermark Number */}
                <div className="absolute right-4 bottom-2 text-8xl font-black text-slate-100/60 select-none pointer-events-none group-hover:text-primary/5 transition-colors duration-500">
                  {st.step}
                </div>

                <div className="relative space-y-6">
                  {/* Step Icon Badge */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {st.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      Phase {st.step}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed pr-2">
                      {st.desc}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom accent line that slides in on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Industries We Serve */}
      <section className="py-20 bg-bgSec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Industries We Accelerate
            </h2>
            <p className="text-slate-600 mt-4">
              We specialize in vertical sectors that demand high engineering quality and deep marketing strategy.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['FinTech & NeoBanking', 'AI & Machine Learning', 'B2B SaaS Products', 'E-Commerce & Logistics', 'HealthTech Platforms', 'EdTech Systems', 'PropertyTech', 'Web3 & Blockchain'].map((ind, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between">
                <span className="font-bold text-secondary text-sm sm:text-base">{ind}</span>
                <ChevronRight size={16} className="text-slate-400 shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                Latest Insights & Guides
              </h2>
              <p className="text-slate-600 mt-2">
                Actionable content on technology, marketing, and scaling startups.
              </p>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark">
              <span>See all articles</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <article key={blog._id || blog.id} className="premium-card rounded-2xl overflow-hidden bg-white">
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img
                      src={resolveUrl(blog.featuredImage) || '/images/web_saas_marketing.png'}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 text-left space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>{blog.category}</span>
                      <span>{blog.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary line-clamp-2 hover:text-primary transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{blog.metaDescription}</p>
                    <div className="pt-2 flex justify-between items-center text-xs font-semibold text-slate-600">
                      <span>By {blog.author}</span>
                      <Link to={`/blog/${blog.slug}`} className="text-primary flex items-center gap-1">
                        <span>Read Post</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              // Seed default blog items
              <>
                <article className="premium-card rounded-2xl overflow-hidden bg-white">
                  <img src="/images/web_saas_marketing.png" alt="Startup idea validation landing page showing growth hacking conversion metrics" className="h-48 w-full object-cover" loading="lazy" />
                  <div className="p-6 text-left space-y-4">
                    <div className="text-xs text-slate-400">Venture Building</div>
                    <h3 className="text-lg font-bold text-secondary"><Link to="/blog">How to Validate a Startup Idea with Minimal Capital</Link></h3>
                    <p className="text-sm text-slate-500">Step-by-step framework to validate target audience problems without engineering overhead.</p>
                  </div>
                </article>
                <article className="premium-card rounded-2xl overflow-hidden bg-white">
                  <img src="/images/web_saas_project_management.png" alt="AI operational automation workflow mapping database integrations" className="h-48 w-full object-cover" loading="lazy" />
                  <div className="p-6 text-left space-y-4">
                    <div className="text-xs text-slate-400">AI & Automation</div>
                    <h3 className="text-lg font-bold text-secondary"><Link to="/blog">AI Automation for Business Operations</Link></h3>
                    <p className="text-sm text-slate-500">How scaling companies use lightweight artificial intelligence models to save 20+ support hours.</p>
                  </div>
                </article>
                <article className="premium-card rounded-2xl overflow-hidden bg-white">
                  <img src="/images/web_saas_analytics.png" alt="Performance marketing funnel tracking click-through conversion ROI" className="h-48 w-full object-cover" loading="lazy" />
                  <div className="p-6 text-left space-y-4">
                    <div className="text-xs text-slate-400">Growth Marketing</div>
                    <h3 className="text-lg font-bold text-secondary"><Link to="/blog">Performance Marketing Playbook for MVPs</Link></h3>
                    <p className="text-sm text-slate-500">Key metrics, conversion funnels, and setup templates to acquire initial paying client leads.</p>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-bgSec">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mt-2">
              Everything you need to know about partnering with Zonova.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.length > 0 ? (
              faqs.map((faq, i) => (
                <div key={faq._id || faq.id} className="bg-slate-50/60 hover:bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow transition-all">
                  <button
                    onClick={() => setFaqIndex(faqIndex === i ? null : i)}
                    className="w-full py-4 px-6 text-left font-bold text-secondary flex justify-between items-center focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="text-primary text-xl font-normal">{faqIndex === i ? '−' : '+'}</span>
                  </button>
                  {faqIndex === i && (
                    <div className="px-6 pb-4 text-sm text-slate-5050 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Seed default FAQs
              <>
                <div className="bg-slate-50/60 hover:bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow transition-all">
                  <button
                    onClick={() => setFaqIndex(faqIndex === 0 ? null : 0)}
                    className="w-full py-4 px-6 text-left font-bold text-secondary flex justify-between items-center focus:outline-none"
                  >
                    <span>What is a Venture Studio partnership?</span>
                    <span className="text-primary text-xl font-normal">{faqIndex === 0 ? '−' : '+'}</span>
                  </button>
                  {faqIndex === 0 && (
                    <div className="px-6 pb-4 text-sm text-slate-500 pt-3">
                      Unlike dev agencies that charge purely for labor, a venture studio co-invests resources, aligning product strategy with marketing growth and active business validation.
                    </div>
                  )}
                </div>
                <div className="bg-slate-50/60 hover:bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow transition-all">
                  <button
                    onClick={() => setFaqIndex(faqIndex === 1 ? null : 1)}
                    className="w-full py-4 px-6 text-left font-bold text-secondary flex justify-between items-center focus:outline-none"
                  >
                    <span>How long does it take to launch an MVP?</span>
                    <span className="text-primary text-xl font-normal">{faqIndex === 1 ? '−' : '+'}</span>
                  </button>
                  {faqIndex === 1 && (
                    <div className="px-6 pb-4 text-sm text-slate-500 pt-3">
                      Most MVP prototypes are designed, coded, and launched into validation in 4 to 8 weeks, ensuring zero wasted overhead or code debt.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <Send size={20} />
          </div>
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
            Subscribe to our Growth Newsletter
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Receive vetted startup playbooks, marketing guides, and tech breakdowns. No spam, ever.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              className="flex-grow px-5 py-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 text-sm shadow-inner transition-all"
            />
            <button
              type="submit"
              className="btn-colorful font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              <span>Subscribe</span>
            </button>
          </form>
          {subMessage.text && (
            <p className={`text-xs font-semibold ${subMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {subMessage.text}
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 text-white text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Ready to validate and scale your startup?
            </h2>
            <p className="text-white/80 text-base max-w-lg">
              Book a strategy session with our venture consulting team or apply for our startup program support today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link
              to="/book-meeting"
              className="bg-white hover:bg-slate-50 text-primary font-bold py-4 px-8 rounded-xl text-center shadow-lg transition-all"
            >
              Book Strategy Call
            </Link>
            <Link
              to="/startup-partnership"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-xl text-center shadow-lg transition-all"
            >
              Apply to Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
