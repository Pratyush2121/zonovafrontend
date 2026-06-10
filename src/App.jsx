import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { fetchSuccess } from './store/slices/settingSlice';
import { Phone } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import StartupPartnership from './pages/StartupPartnership';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import Careers from './pages/Careers';
import BookMeeting from './pages/BookMeeting';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

// Settings Loader Wrapper Component
const SettingsLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success) {
          dispatch(fetchSuccess(data.settings));
        }
      } catch (err) {
        console.error('Failed to fetch settings from backend api:', err);
      }
    };
    loadSettings();
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <SettingsLoader>
        <Router>
          <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-primary/10 selection:text-primary">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/startup-partnership" element={<StartupPartnership />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProjectDetails />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/book-meeting" element={<BookMeeting />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                
                {/* Admin Management Panel */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            {/* Global Sticky Call Widget */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
              <a
                href="tel:9335088060"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-3 py-6 rounded-l-2xl shadow-2xl transition-all duration-300 hover:-translate-x-1 hover:scale-105"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                <div className="bg-white/20 p-1.5 rounded-full mb-2 rotate-90 shrink-0">
                  <Phone size={14} className="text-white animate-pulse" />
                </div>
                <span className="font-extrabold text-[10px] tracking-widest uppercase font-sans">
                  Call Now: 9335088060
                </span>
              </a>
            </div>
          </div>
        </Router>
      </SettingsLoader>
    </Provider>
  );
}

export default App;
