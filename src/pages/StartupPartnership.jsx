import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, ArrowLeft, ArrowRight, Check, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const StartupPartnership = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    founderName: '',
    startupName: '',
    email: '',
    phoneNumber: '',
    industry: '',
    startupStage: '',
    fundingStatus: '',
    startupIdea: '',
    budgetRange: '',
    requiredServices: [],
    expectedTimeline: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const industries = ['FinTech', 'SaaS', 'AI / ML', 'E-Commerce', 'HealthTech', 'EdTech', 'Enterprise Tech', 'Other'];
  const stages = ['Idea Stage', 'MVP built', 'Pre-revenue validation', 'Generating revenue', 'Scaling operations'];
  const funding = ['Bootstrap', 'Pre-Seed', 'Seed Funded', 'Series A+', 'Crowdfunded'];
  const budgets = ['$5k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];
  const timelines = ['Immediately (1-2 weeks)', '1-2 Months', '3-6 Months', 'Flexible'];

  const services = [
    'Startup Consulting',
    'MVP Development',
    'Web Development',
    'Mobile App Development',
    'SaaS Development',
    'AI Solutions',
    'UI/UX Design',
    'Branding',
    'SEO',
    'Performance Marketing',
    'Lead Generation',
    'Automation Solutions'
  ];

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (srv) => {
    const active = [...formData.requiredServices];
    if (active.includes(srv)) {
      setFormData({ ...formData, requiredServices: active.filter(item => item !== srv) });
    } else {
      setFormData({ ...formData, requiredServices: [...active, srv] });
    }
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.founderName || !formData.startupName || !formData.email || !formData.phoneNumber) {
        setError('Please fill out all contact fields before proceeding.');
        return;
      }
    } else if (step === 2) {
      if (!formData.industry || !formData.startupStage || !formData.fundingStatus) {
        setError('Please select your industry, startup stage, and funding status.');
        return;
      }
    } else if (step === 3) {
      if (!formData.startupIdea || !formData.budgetRange || !formData.expectedTimeline) {
        setError('Please describe your startup idea and select budget and timeline values.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/startups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO title="Startup Partnership Program" description="Apply for Zonova Technologies startup support, venture design, and co-building partner services." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            🤝 Co-Investment
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold shadow-sm select-none">
            🚀 SaaS Scaling
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Briefcase size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Startup Partnership Program
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Apply to co-build, launch, and scale your venture with our studio resources, tech experts, and marketing leads.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-4">
        {submitted ? (
          <div className="text-center p-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>
            <h2 className="text-3xl font-black text-secondary">Application Received!</h2>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for applying. Our venture consulting team will review your pitch and contact details, and schedule a validation briefing call within 2 business days.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-primary/30 transition-all duration-300">
            {/* Steps Visual Progress */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                      step >= s
                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/10'
                        : 'border-slate-200 text-slate-400 bg-white'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-0.5 flex-grow mx-2 rounded transition-all ${
                        step > s ? 'bg-primary' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-sm font-semibold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100 text-left">
                  {error}
                </p>
              )}

              {/* STEP 1: Founder Details */}
              {step === 1 && (
                <div className="space-y-4 text-left animate-fade-in">
                  <h3 className="font-extrabold text-2xl text-secondary">Contact Details</h3>
                  <p className="text-sm text-slate-500 mb-6">Let's start with who you are and how we can reach you.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Founder Name</label>
                      <input
                        type="text"
                        name="founderName"
                        required
                        value={formData.founderName}
                        onChange={handleTextChange}
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Startup Name</label>
                      <input
                        type="text"
                        name="startupName"
                        required
                        value={formData.startupName}
                        onChange={handleTextChange}
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleTextChange}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleTextChange}
                        placeholder="Number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Startup Background */}
              {step === 2 && (
                <div className="space-y-6 text-left animate-fade-in">
                  <h3 className="font-extrabold text-2xl text-secondary">Startup Overview</h3>
                  <p className="text-sm text-slate-500">Provide details on your target sector and stage.</p>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Industry Domain</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setFormData({ ...formData, industry: ind })}
                          className={`py-3 px-2 border rounded-xl text-xs font-semibold text-center transition-all ${
                            formData.industry === ind
                              ? 'border-primary bg-primary/10 text-primary shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Startup Stage</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {stages.map((stg) => (
                        <button
                          key={stg}
                          type="button"
                          onClick={() => setFormData({ ...formData, startupStage: stg })}
                          className={`py-3 px-4 border rounded-xl text-xs font-semibold text-center transition-all ${
                            formData.startupStage === stg
                              ? 'border-primary bg-primary/10 text-primary shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {stg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Funding Status</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {funding.map((fund) => (
                        <button
                          key={fund}
                          type="button"
                          onClick={() => setFormData({ ...formData, fundingStatus: fund })}
                          className={`py-3 px-2 border rounded-xl text-xs font-semibold text-center transition-all ${
                            formData.fundingStatus === fund
                              ? 'border-primary bg-primary/10 text-primary shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {fund}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Startup Idea & Scope */}
              {step === 3 && (
                <div className="space-y-6 text-left animate-fade-in">
                  <h3 className="font-extrabold text-2xl text-secondary">The Concept & Budget</h3>
                  <p className="text-sm text-slate-500">Outline the core problems you solve and your timeline expectations.</p>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Startup Idea & Description</label>
                    <textarea
                      name="startupIdea"
                      required
                      rows={4}
                      value={formData.startupIdea}
                      onChange={handleTextChange}
                      placeholder="Please describe what your startup does, who the audience is, and the core technology required..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Budget Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgets.map((bud) => (
                          <button
                            key={bud}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetRange: bud })}
                            className={`py-3 px-2 border rounded-xl text-xs font-semibold text-center transition-all ${
                              formData.budgetRange === bud
                                ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {bud}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Expected Timeline</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timelines.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, expectedTimeline: time })}
                            className={`py-3 px-2 border rounded-xl text-[10px] font-semibold text-center transition-all ${
                              formData.expectedTimeline === time
                                ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Choose Required Services */}
              {step === 4 && (
                <div className="space-y-6 text-left animate-fade-in">
                  <h3 className="font-extrabold text-2xl text-secondary">Select Required Services</h3>
                  <p className="text-sm text-slate-500">Pick any services you require from our studio crew.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`p-4 border rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          formData.requiredServices.includes(srv)
                            ? 'border-primary bg-primary/10 text-primary shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{srv}</span>
                        {formData.requiredServices.includes(srv) && (
                          <Check size={14} className="text-primary shrink-0 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stepper Navigation Actions */}
              <div className="border-t border-slate-100 pt-6 flex justify-between items-center gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 py-3 px-5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 py-3 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/10 transition-all ml-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 py-3 px-8 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-md shadow-primary/10 transition-all ml-auto disabled:opacity-50"
                  >
                    {loading ? <Spinner size="small" color="white" /> : <span>Submit Application</span>}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default StartupPartnership;
