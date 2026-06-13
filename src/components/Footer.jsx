import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { settings } = useSelector((state) => state.settings);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-slate-300 border-t border-secondary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Brief */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border border-slate-700 flex items-center justify-center bg-white shrink-0">
                <img src="/images/logo.jpg" alt="Zonova Technologies Logo" className="w-full h-full object-cover scale-[1.1]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans leading-none">
                  ZONOVA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-slate-400 uppercase font-semibold mt-0.5">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Zonova Technologies is a Venture Studio, Startup Growth Partner, and Technology Company. We help founders validate, launch, and scale high-growth companies.
            </p>
            <div className="flex gap-4">
              <a
                href={settings.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={settings.socialLinks?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href={settings.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>About Us</span>
                  <ArrowUpRight size={12} className="opacity-0 hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/startup-partnership" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Startup Program</span>
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Portfolio</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Focus Areas */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Expertise</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Startup Consulting & Strategy</li>
              <li>MVP & SaaS Development</li>
              <li>Branding & Growth Marketing</li>
              <li>AI Solutions & Automation</li>
              <li>Dedicated Development Teams</li>
            </ul>
          </div>

          {/* Dynamic Office Address & Contact details */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2.5 items-start">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="leading-relaxed text-slate-400">
                  {settings.address || 'Zonova HQ, Venture Building Hub, Mumbai, India'}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="text-primary shrink-0" />
                <a href={`tel:${settings.phone1}`} className="hover:text-white transition-colors">
                  +91 {settings.phone1 || '9324707261'}
                </a>
              </li>
              {settings.phone2 && (
                <li className="flex gap-2.5 items-center">
                  <Phone size={16} className="text-primary shrink-0" />
                  <a href={`tel:${settings.phone2}`} className="hover:text-white transition-colors">
                    +91 {settings.phone2 || '9335088060'}
                  </a>
                </li>
              )}
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="text-accent shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email || 'zonovatechnologies@gmail.com'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start gap-4 text-xs text-slate-500">
          <div className="space-y-2 text-left">
            <div>
              &copy; {currentYear} ZONOVA TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </div>
            <div className="text-[10px] text-slate-600 font-mono space-y-0.5">
              <p>CIN: U68200MH2025PTC449258 | ROC: RoC-Mumbai | Status: Active</p>
              <p>Registered Office: D WING 403 BHOOMI ACROPOLIS Virar Thane Maharashtra India 401303</p>
              <p>Directors: ABHINAV NEERAJ MISHRA, SIDDHESH PRADEEP RANE</p>
            </div>
          </div>
          <div className="flex gap-6 shrink-0 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
