import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Check, MapPin, Video, Phone, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import CustomScheduler from '../components/CustomScheduler';
import Spinner from '../components/Spinner';

const BookMeeting = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: '',
    meetingType: 'Google Meet',
    budget: '',
    message: ''
  });
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const budgets = ['$5k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError('Please select a preferred date and time slot from the scheduler calendar.');
      return;
    }

    setLoading(true);
    setError('');

    const submissionData = {
      ...formData,
      preferredDate: selectedDate,
      preferredTime: selectedTime
    };

    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Booking failed. This time slot might have been taken.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO title="Book a Meeting" description="Schedule a strategy session call with the venture consulting team at Zonova Technologies." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            📅 Schedule Zoom
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            📈 Growth Strategy
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Video size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Schedule a Strategy Call
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Select a convenient date and time to speak with our startup growth leads.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4">
        {submitted ? (
          <div className="text-center p-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>
            <h2 className="text-3xl font-black text-secondary">Meeting Scheduled!</h2>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              Your meeting booking has been registered. An admin will review the slot and send a calendar invite link to **{formData.email}**. We look forward to speaking!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Form & Scheduler (Left 2 cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left hover:border-primary/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <p className="text-sm font-semibold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                    {error}
                  </p>
                )}

                <h3 className="font-extrabold text-xl text-secondary border-b border-slate-100 pb-3">1. Contact Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullname-input" className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      id="fullname-input"
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleTextChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 mb-2">Business Email</label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleTextChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-700 mb-2">Mobile Number</label>
                    <input
                      id="phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleTextChange}
                      placeholder="Number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="company-input" className="block text-xs font-semibold text-slate-700 mb-2">Company / Startup Name</label>
                    <input
                      id="company-input"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleTextChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service-select" className="block text-xs font-semibold text-slate-700 mb-2">Service Required</label>
                    <select
                      id="service-select"
                      name="serviceRequired"
                      required
                      value={formData.serviceRequired}
                      onChange={handleTextChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm bg-white"
                    >
                      <option value="">Choose service...</option>
                      {services.map((srv) => <option key={srv} value={srv}>{srv}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="meeting-select" className="block text-xs font-semibold text-slate-700 mb-2">Meeting Type</label>
                    <select
                      id="meeting-select"
                      name="meetingType"
                      value={formData.meetingType}
                      onChange={handleTextChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm bg-white"
                    >
                      <option value="Google Meet">Google Meet Video Call</option>
                      <option value="Phone Call">Phone Call Sync</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-3">Project Budget Range</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: bud })}
                        className={`py-2.5 px-2 border rounded-xl text-xs font-semibold text-center transition-all ${
                          formData.budget === bud
                            ? 'border-primary bg-primary/10 text-primary shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </div>

                <h3 className="font-extrabold text-xl text-secondary border-b border-slate-100 pb-3 pt-4">2. Select Schedule Slot</h3>

                <CustomScheduler
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />

                <div>
                  <label htmlFor="message-input" className="block text-xs font-semibold text-slate-700 mb-2">Message / Requirements</label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleTextChange}
                    placeholder="Briefly describe what you would like to discuss..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                >
                  {loading ? <Spinner size="small" color="white" /> : <span>Schedule Strategy Meeting</span>}
                </button>

              </form>
            </div>

            {/* Sidebar Details (Right 1 col) */}
            <div className="space-y-6 text-left lg:sticky lg:top-24">
              <div className="p-6 rounded-3xl border border-slate-200 hover:border-primary/30 transition-all duration-300 space-y-4 bg-slate-50/50">
                <h4 className="font-extrabold text-sm text-secondary uppercase tracking-widest">Meeting Details</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex gap-2 items-center">
                    <Video size={16} className="text-slate-400" />
                    <span>Google Meet (Invite sent on confirm)</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Clock size={16} className="text-slate-400" />
                    <span>Duration: 30 minutes</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-primary/20 bg-primary/10 hover:border-primary/40 transition-all duration-300 space-y-2">
                <h4 className="font-bold text-sm text-primary">Strategy Briefing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  During this briefing, we will stress-test your idea stages, analyze target channels, and map out a structured developmental roadmap proposal.
                </p>
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
};

export default BookMeeting;
