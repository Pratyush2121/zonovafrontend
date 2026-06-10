import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Upload, Check } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const Careers = () => {
  const [activeJob, setActiveJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const openPositions = [
    {
      id: 'job-1',
      title: 'Senior MERN Developer',
      location: 'Mumbai, India (Hybrid)',
      type: 'Full-Time',
      salary: '₹12L - ₹18L per annum',
      desc: 'We are seeking a senior full-stack engineer to lead development of MVP prototypes and SaaS dashboard products. You will define engineering architectures, write clean APIs, and sync localized databases.',
      requirements: [
        '5+ years experience in React, Node.js, Express, and MongoDB.',
        'Expertise in Redux, Tailwind CSS, and cloud hosting APIs.',
        'Proven track record of building and launching functional software products.'
      ]
    },
    {
      id: 'job-2',
      title: 'Growth Product Manager',
      location: 'Remote, India',
      type: 'Full-Time',
      salary: '₹8L - ₹14L per annum',
      desc: 'Looking for a product manager with growth marketing DNA. You will consult founders on MVP roadmap validation, write sprint stories, and track product analytics conversion loops.',
      requirements: [
        '3+ years experience managing SaaS or mobile app life-cycles.',
        'Deep understanding of Mixpanel, Google Analytics, and A/B sprint loops.',
        'Excellent customer validation and pitch consulting communication.'
      ]
    },
    {
      id: 'job-3',
      title: 'Performance Marketing Lead',
      location: 'Mumbai, India (Hybrid)',
      type: 'Full-Time',
      salary: '₹6L - ₹10L per annum',
      desc: 'Seeking a performance marketer to manage client customer acquisition channels. You will set up targeted ad funnels on Meta and Google, test ad copies, and audit CTR reporting metrics.',
      requirements: [
        '2+ years structuring positive ROI digital advertising campaigns.',
        'Expertise in lead generation lists, landing page opt-ins, and bid optimization.',
        'Strong analytical skills to interpret cost-per-lead margins.'
      ]
    }
  ];

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleApplyClick = (job) => {
    setActiveJob(job);
    setFormData({ ...formData, position: job.title });
    // Scroll to form
    document.getElementById('apply-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume file.');
      return;
    }

    setLoading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('fullName', formData.fullName);
    uploadData.append('email', formData.email);
    uploadData.append('phone', formData.phone);
    uploadData.append('position', formData.position);
    uploadData.append('coverLetter', formData.coverLetter);
    uploadData.append('resume', resumeFile);

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Application failed. Please verify resume file format.');
      }
    } catch (err) {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO title="Careers" description="Join the venture studio crew at Zonova Technologies. Explore our open positions for software engineers, product managers and marketing leads." />

      <section className="bg-bgSec py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Join the Crew
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Co-build scalable companies alongside ambitious startup founders. We work in fast sprint cycles with zero corporate bloat.
          </p>
        </div>
      </section>

      {/* Job Boards List */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Open Jobs list */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Open Positions</h2>
            <div className="space-y-4 pt-2">
              {openPositions.map((job) => (
                <div 
                  key={job.id} 
                  className={`p-6 border rounded-2xl transition-all cursor-pointer ${
                    activeJob?.id === job.id ? 'border-primary bg-primary/10 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setActiveJob(job)}
                >
                  <h3 className="font-extrabold text-xl text-secondary">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-slate-400 text-xs mt-2 font-medium">
                    <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={13} /> {job.salary}</span>
                  </div>
                  {activeJob?.id === job.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200/50 space-y-4 animate-fade-in text-sm">
                      <p className="text-slate-600 leading-relaxed">{job.desc}</p>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-slate-500 space-y-1">
                          {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md shadow-primary/10 transition-all"
                      >
                        Apply For This Role
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Application Section */}
          <div id="apply-form-section" className="text-left bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-extrabold text-2xl text-secondary mb-2">Apply Online</h3>
            <p className="text-xs text-slate-500 mb-6">Submit your candidate profile directly. We read every resume cover letter.</p>

            {submitted ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <h4 className="font-bold text-lg text-secondary">Application Submitted!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Thank you for your interest in Zonova. Our recruitment leads will review your experience and resume document and reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                    {error}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Target Position</label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleTextChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm bg-white"
                  >
                    <option value="">Select a position...</option>
                    {openPositions.map((job) => <option key={job.id} value={job.title}>{job.title}</option>)}
                    <option value="General Application">General Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleTextChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address</label>
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
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleTextChange}
                      placeholder="Number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Upload Resume (PDF, DOC, DOCX)</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-primary rounded-xl py-6 px-4 text-center cursor-pointer transition-colors bg-white">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={24} className="text-slate-400 mx-auto mb-2" />
                    <span className="block text-xs font-medium text-slate-600">
                      {resumeFile ? resumeFile.name : 'Choose file or drag here'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Cover Letter / Message</label>
                  <textarea
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleTextChange}
                    placeholder="Briefly describe why you are interested in joining Zonova..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                >
                  {loading ? <Spinner size="small" color="white" /> : <span>Submit Candidate Profile</span>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Careers;
