import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useSelector((state) => state.settings);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Startup Program', path: '/startup-partnership' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <header className="w-full z-50">
      {/* Top Banner Contact Bar */}
      <div className="hidden md:block bg-secondary text-white text-xs py-2 px-4 border-b border-secondary-light">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a
              href={`tel:${settings.phone1 || '9324707261'}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone size={13} className="text-primary" />
              <span>+91 {settings.phone1 || '9324707261'}</span>
            </a>
            {settings.phone2 && (
              <a
                href={`tel:${settings.phone2 || '9335088060'}`}
                className="flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Phone size={13} className="text-primary" />
                <span>+91 {settings.phone2 || '9335088060'}</span>
              </a>
            )}
            <a
              href={`mailto:${settings.email || 'zonovatechnologies@gmail.com'}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={13} className="text-accent" />
              <span>{settings.email || 'zonovatechnologies@gmail.com'}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1 text-accent hover:underline font-semibold"
              >
                <ShieldCheck size={14} />
                <span>Portal ({user?.role})</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Glassmorphism Header */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary/20">
                  Z
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-secondary font-sans leading-none">
                    ZONOVA
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-slate-400 uppercase font-semibold mt-0.5">
                    Technologies
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary border-b-2 border-primary py-2' : 'text-slate-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="text-sm font-medium text-slate-700 hover:text-primary px-4 py-2 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/book-meeting"
                className="inline-flex items-center gap-1.5 btn-colorful px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                <span>Book Strategy Call</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-slate-600 hover:text-primary p-2 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white animate-fade-in">
            <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 pb-2 border-t border-slate-100 px-3 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-slate-700 font-medium hover:bg-slate-50 rounded-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/book-meeting"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center btn-colorful py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                >
                  Book Strategy Call
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
