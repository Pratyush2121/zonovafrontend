import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Check, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const Contact = () => {
  const { settings } = useSelector((state) => state.settings);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterestedIn: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Inquiry submission failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO title="Contact Us - Hire SEO & Web Development Experts" description="Contact Zonova Technologies to scale your business. Get in touch with our expert digital marketing and web development agency for London, UK, and US consultations." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            ✉️ Get in Touch
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            ⚡ 24hr Response
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <Mail size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Contact Us
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Have a project or partnership inquiry? Reach out and our team will get in touch shortly.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Info Details (Right 1 col in UI order, let's place info left, form right) */}
          <div className="lg:col-span-1 space-y-8 text-left">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Get in Touch</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Whether you are an early-stage founder seeking technical co-builders or an established business optimizing performance marketing, we are here to support you.
            </p>

            <ul className="space-y-6 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary">Office Address</h4>
                  <span className="text-slate-500 mt-1 block leading-relaxed">
                    {settings.address || 'Zonova HQ, Venture Building Hub, Mumbai, India'}
                  </span>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary">Call Us</h4>
                  <a href={`tel:${settings.phone1}`} className="text-slate-500 hover:text-primary transition-colors block mt-0.5">
                    +91 {settings.phone1 || '9324707261'}
                  </a>
                  {settings.phone2 && (
                    <a href={`tel:${settings.phone2}`} className="text-slate-500 hover:text-primary transition-colors block mt-0.5">
                      +91 {settings.phone2 || '9335088060'}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary">Email Support</h4>
                  <a href={`mailto:${settings.email}`} className="text-slate-500 hover:text-primary transition-colors block mt-0.5">
                    {settings.email || 'zonovatechnologies@gmail.com'}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Form (Left/Center 2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left hover:border-primary/30 transition-all duration-300">
            {submitted ? (
              <div className="text-center py-16 space-y-6 bg-slate-50/50 border border-slate-100 rounded-2xl animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-black text-secondary">Message Sent!</h3>
                <p className="text-slate-500 max-w-sm mx-auto leading-relaxed text-sm">
                  Thank you for contacting Zonova. We have received your project details and a partner will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-sm font-semibold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleTextChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Business Email</label>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleTextChange}
                      placeholder="Number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleTextChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Area of Interest</label>
                  <select
                    name="serviceInterestedIn"
                    required
                    value={formData.serviceInterestedIn}
                    onChange={handleTextChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm bg-white"
                  >
                    <option value="">Select an option...</option>
                    {services.map((srv) => <option key={srv} value={srv}>{srv}</option>)}
                    <option value="Partnership Program">Venture Studio Partnership</option>
                    <option value="General Support">General Support / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleTextChange}
                    placeholder="Tell us about your project or business needs..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                >
                  {loading ? <Spinner size="small" color="white" /> : <span>Send Message</span>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
