import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { fetchSuccess } from './store/slices/settingSlice';
import { Phone } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages (Lazy Loaded for Core Web Vitals)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const StartupPartnership = lazy(() => import('./pages/StartupPartnership'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const Careers = lazy(() => import('./pages/Careers'));
const BookMeeting = lazy(() => import('./pages/BookMeeting'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const LocationLandingPage = lazy(() => import('./pages/LocationLandingPage'));
const IndustryLandingPage = lazy(() => import('./pages/IndustryLandingPage'));

import './App.css';

// Scroll to Top component that triggers smooth scrolling on routing changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

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
            <ScrollToTop />
             <main className="flex-grow">
              <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
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
                  <Route path="/digital-marketing-agency-:location" element={<LocationLandingPage />} />
                  <Route path="/industry/:industrySlug" element={<IndustryLandingPage />} />
                  
                  {/* Admin Management Panel */}
                  <Route path="/adminhu" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
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

            {/* Global Floating WhatsApp Widget */}
            <div className="fixed left-6 bottom-6 z-50">
              <a
                href="https://wa.me/919335088060"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce"
                style={{ animationDuration: '3s' }}
                aria-label="Contact on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.634 1.97 14.162.946 11.536.946c-5.438 0-9.865 4.372-9.87 9.802 0 1.698.452 3.355 1.309 4.8l-.999 3.647 3.75-.981-.129-.215zm10.741-6.975c-.29-.145-1.713-.846-1.978-.941-.264-.096-.457-.145-.649.145-.192.29-.743.941-.91 1.133-.167.192-.334.215-.624.07-.29-.145-1.226-.452-2.336-1.442-.864-.77-1.447-1.721-1.617-2.011-.17-.29-.018-.447.127-.592.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.361-.024-.507-.072-.145-.649-1.564-.89-2.142-.234-.564-.471-.487-.649-.496-.167-.008-.36-.01-.553-.01-.193 0-.507.072-.771.361-.264.29-1.011.989-1.011 2.41 0 1.42 1.036 2.795 1.18 2.99.145.193 2.037 3.11 4.935 4.364.689.299 1.228.477 1.648.61.692.22 1.32.19 1.817.116.554-.083 1.713-.699 1.953-1.374.24-.675.24-1.253.168-1.374-.072-.121-.264-.193-.554-.338z" />
                </svg>
              </a>
            </div>
          </div>
        </Router>
      </SettingsLoader>
    </Provider>
  );
}

export default App;
