import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, Heart, Users, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        const data = await res.json();
        if (data.success) {
          setTeam(data.team);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const coreValues = [
    { icon: <ShieldCheck size={24} />, title: 'Absolute Integrity', desc: 'We stress-test ideas and tell the raw truth. If a concept lacks market demand, we pivot before coding.' },
    { icon: <Users size={24} />, title: 'Venture Partnership', desc: 'We do not act as short-term vendors. We embed with founders as growth and engineering stakeholders.' },
    { icon: <Heart size={24} />, title: 'Execution Obsession', desc: 'Beautiful designs and clean code are only as good as the revenue and traction they generate.' }
  ];

  return (
    <div className="bg-white">
      <SEO title="About Our Agency - Team, Values & Registry" description="Discover Zonova Technologies' mission, core values, corporate registration registry, and our expert team of digital marketers and web engineers serving London, UK, and the US." />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-bgSec py-20 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            🚀 Venture Studio
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-medium hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            💡 Execution Focus
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Users size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            We Build Vetted Ventures
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Zonova is a Startup Growth, Venture Building, Technology, Marketing, and Business Management Company.
          </p>
        </div>
      </section>

      {/* Story, Vision, Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Our Story</h2>
            <p className="text-slate-600 leading-relaxed">
              Zonova Technologies was founded by a group of developers, performance marketers, and seed investors who grew tired of standard software agencies building "dead apps" that fail to acquire users.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We realized that startups fail not because they cannot build code, but because they build things people do not want, fail to establish customer acquisition funnels, or exhaust capital too early.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Zonova solves this by combining **cutting-edge web engineering** with **validated venture design**, **dynamic automation systems**, and **scalable marketing operations** under a single team.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-8 text-left bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Target size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-secondary text-lg">Our Mission</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  To help entrepreneurs and businesses transform complex ideas into scalable, highly profitable companies through technology, strategy, marketing, automation, and rapid execution.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-secondary text-lg">Our Vision</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  To build the global benchmark for startup creation and growth management, lowering the barriers of tech entrepreneurship and ensuring MVPs succeed through robust unit economics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-bgSec border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Our Core Values</h2>
            <p className="text-slate-500 mt-2">The operational principles behind our portfolio decisions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v, i) => (
              <div key={i} className="premium-card p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-left space-y-4 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg text-secondary">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Official Corporate Registration Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Official Corporate Registry</h2>
            <p className="text-slate-500 mt-2">Verified Ministry of Corporate Affairs (MCA) records for ZONOVA TECHNOLOGIES PRIVATE LIMITED.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-4xl mx-auto text-left space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary border-b pb-2">Company Overview</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Company Name</span>
                    <span className="text-right font-bold text-secondary">ZONOVA TECHNOLOGIES PRIVATE LIMITED</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Corporate Identification Number (CIN)</span>
                    <span className="text-right font-mono font-bold text-primary">U68200MH2025PTC449258</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">ROC Code</span>
                    <span className="text-right">RoC-Mumbai</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Registration Number</span>
                    <span className="text-right">449258</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Date of Incorporation</span>
                    <span className="text-right">26-05-2025</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Company Category / Subcategory</span>
                    <span className="text-right">Company limited by shares / Non-government company</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Class of Company</span>
                    <span className="text-right">Private</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary border-b pb-2">Financials & Contact</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Authorised Share Capital</span>
                    <span className="text-right">₹1,00,000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Paid up Capital</span>
                    <span className="text-right">₹10,000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">E-filing Status</span>
                    <span className="text-right text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-xs">Active</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50 text-xs">
                    <span className="font-semibold text-slate-500">Registered Address</span>
                    <span className="text-right max-w-[240px] leading-relaxed">D WING 403 BHOOMI ACROPOLIS Virar Thane Maharashtra India 401303</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Official Email ID</span>
                    <span className="text-right font-medium text-primary">
                      <a href="mailto:Zonovatechnologies@gmail.com">Zonovatechnologies@gmail.com</a>
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Listed status / Suspended</span>
                    <span className="text-right">Unlisted / N</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-secondary mb-4">Board of Directors / Signatory Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-secondary text-sm">ABHINAV NEERAJ MISHRA</h4>
                    <p className="text-xs text-slate-400 mt-1">DIN: 11125863 &bull; Appointed 26-05-2025</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">Director</span>
                </div>
                <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-secondary text-sm">SIDDHESH PRADEEP RANE</h4>
                    <p className="text-xs text-slate-400 mt-1">DIN: 11125864 &bull; Appointed 26-05-2025</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
