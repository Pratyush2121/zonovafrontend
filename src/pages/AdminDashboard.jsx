import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { fetchSuccess, updateSuccess } from '../store/slices/settingSlice';
import { 
  LayoutDashboard, Layers, BookOpen, UserCheck, Calendar, Briefcase, Mail, 
  Settings, Users, MessageSquare, HelpCircle, Lock, Shield, Bell, FileText, 
  Trash2, Edit, Plus, Download, Check, X, LogOut, Search, PlusCircle, AlertCircle, Save 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const { settings } = useSelector((state) => state.settings);

  // Active module tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dynamic state hooks for dashboard data
  const [stats, setStats] = useState({});
  const [growthData, setGrowthData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [leads, setLeads] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [startups, setStartups] = useState([]);
  const [careers, setCareers] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [privacyPolicy, setPrivacyPolicy] = useState({ title: '', content: '' });
  const [termsPolicy, setTermsPolicy] = useState({ title: '', content: '' });
  const [usersList, setUsersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);

  // Common UI State
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add-project', 'edit-project', 'add-blog', 'edit-blog', etc.
  const [selectedItem, setSelectedItem] = useState(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', category: 'SaaS', clientGoals: '', challenges: '',
    solution: '', results: '', testimonialText: '', testimonialAuthor: '',
    testimonialRole: '', technologyStack: '', featured: false, link: ''
  });
  const [blogForm, setBlogForm] = useState({
    title: '', content: '', author: '', category: 'Venture Building',
    tags: '', status: 'draft', metaTitle: '', metaDescription: ''
  });
  const [faqForm, setFAQForm] = useState({ question: '', answer: '', category: 'General' });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', bio: '', linkedin: '', twitter: '' });
  const [testimonialForm, setTestimonialForm] = useState({ author: '', role: '', company: '', text: '', rating: 5 });
  const [settingsForm, setSettingsForm] = useState({ phone1: '', phone2: '', email: '', address: '', linkedin: '', twitter: '', facebook: '' });
  
  // Notification dropdown
  const [notifDropdown, setNotifDropdown] = useState(false);

  // Auto redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchSafe = async (url, options = {}, defaultValue = { success: false }) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.warn(`Failed to fetch from ${url}: status ${res.status}`);
        return defaultValue;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err);
      return defaultValue;
    }
  };

  const refreshTabResource = async (tabName) => {
    if (!token) return;
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      switch (tabName) {
        case 'dashboard':
          const analyticsData = await fetchSafe('/api/analytics', { headers });
          if (analyticsData.success) {
            setStats(analyticsData.stats || {});
            setGrowthData(analyticsData.monthlyGrowth || []);
          }
          break;
        case 'projects':
          const projectsData = await fetchSafe('/api/projects');
          if (projectsData.success) setProjectsList(projectsData.projects || []);
          break;
        case 'blogs':
          const blogsData = await fetchSafe('/api/blogs');
          if (blogsData.success) setBlogsList(blogsData.blogs || []);
          break;
        case 'leads':
          const leadsData = await fetchSafe('/api/leads', { headers });
          if (leadsData.success) setLeads(leadsData.leads || []);
          break;
        case 'meetings':
          const meetingsData = await fetchSafe('/api/meetings', { headers });
          if (meetingsData.success) setMeetings(meetingsData.meetings || []);
          break;
        case 'startups':
          const startupsData = await fetchSafe('/api/startups', { headers });
          if (startupsData.success) setStartups(startupsData.applications || []);
          break;
        case 'careers':
          const careersData = await fetchSafe('/api/careers', { headers });
          if (careersData.success) setCareers(careersData.applications || []);
          break;
        case 'team':
          const teamData = await fetchSafe('/api/team');
          if (teamData.success) setTeam(teamData.team || []);
          break;
        case 'testimonials':
          const testimonialsData = await fetchSafe('/api/testimonials');
          if (testimonialsData.success) setTestimonials(testimonialsData.testimonials || []);
          break;
        case 'newsletter':
          const subsData = await fetchSafe('/api/newsletter/subscribers', { headers });
          if (subsData.success) setSubscribers(subsData.subscribers || []);
          break;
        case 'faqs':
          const faqsData = await fetchSafe('/api/faqs');
          if (faqsData.success) setFaqs(faqsData.faqs || []);
          break;
        case 'policy':
          const privacyData = await fetchSafe('/api/privacy/privacy', { headers });
          if (privacyData.success) setPrivacyPolicy(privacyData.policy || { title: '', content: '' });
          const termsData = await fetchSafe('/api/privacy/terms', { headers });
          if (termsData.success) setTermsPolicy(termsData.policy || { title: '', content: '' });
          break;
        case 'roles':
          const usersData = await fetchSafe('/api/auth/users', { headers });
          if (usersData.success) setUsersList(usersData.users || []);
          break;
        case 'settings':
          setSettingsForm({
            phone1: settings?.phone1 || '',
            phone2: settings?.phone2 || '',
            email: settings?.email || '',
            address: settings?.address || '',
            linkedin: settings?.socialLinks?.linkedin || '',
            twitter: settings?.socialLinks?.twitter || '',
            facebook: settings?.socialLinks?.facebook || ''
          });
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`Error refreshing tab resource ${tabName}:`, err);
    }
  };

  const refreshData = () => {
    refreshTabResource(activeTab);
    const headers = { 'Authorization': `Bearer ${token}` };
    fetchSafe('/api/notifications', { headers }).then(notifData => {
      if (notifData.success) setNotifications(notifData.notifications || []);
    });
  };

  // Load Initial Dashboard Metrics
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Load resources sequentially with 100ms delay to prevent rate limiter overflow
      const analyticsData = await fetchSafe('/api/analytics', { headers });
      if (analyticsData.success) {
        setStats(analyticsData.stats || {});
        setGrowthData(analyticsData.monthlyGrowth || []);
      }
      await delay(100);

      const notifData = await fetchSafe('/api/notifications', { headers });
      if (notifData.success) setNotifications(notifData.notifications || []);
      await delay(100);

      const leadsData = await fetchSafe('/api/leads', { headers });
      if (leadsData.success) setLeads(leadsData.leads || []);
      await delay(100);

      const meetingsData = await fetchSafe('/api/meetings', { headers });
      if (meetingsData.success) setMeetings(meetingsData.meetings || []);
      await delay(100);

      const startupsData = await fetchSafe('/api/startups', { headers });
      if (startupsData.success) setStartups(startupsData.applications || []);
      await delay(100);

      const careersData = await fetchSafe('/api/careers', { headers });
      if (careersData.success) setCareers(careersData.applications || []);
      await delay(100);

      const teamData = await fetchSafe('/api/team');
      if (teamData.success) setTeam(teamData.team || []);
      await delay(100);

      const testimonialsData = await fetchSafe('/api/testimonials');
      if (testimonialsData.success) setTestimonials(testimonialsData.testimonials || []);
      await delay(100);

      const subsData = await fetchSafe('/api/newsletter/subscribers', { headers });
      if (subsData.success) setSubscribers(subsData.subscribers || []);
      await delay(100);

      const faqsData = await fetchSafe('/api/faqs');
      if (faqsData.success) setFaqs(faqsData.faqs || []);
      await delay(100);

      const privacyData = await fetchSafe('/api/privacy/privacy', { headers });
      if (privacyData.success) setPrivacyPolicy(privacyData.policy || { title: '', content: '' });
      await delay(100);

      const termsData = await fetchSafe('/api/privacy/terms', { headers });
      if (termsData.success) setTermsPolicy(termsData.policy || { title: '', content: '' });
      await delay(100);

      const usersData = await fetchSafe('/api/auth/users', { headers });
      if (usersData.success) setUsersList(usersData.users || []);
      await delay(100);

      const projectsData = await fetchSafe('/api/projects');
      if (projectsData.success) setProjectsList(projectsData.projects || []);
      await delay(100);

      const blogsData = await fetchSafe('/api/blogs');
      if (blogsData.success) setBlogsList(blogsData.blogs || []);
      
      // Seed Settings form
      setSettingsForm({
        phone1: settings?.phone1 || '',
        phone2: settings?.phone2 || '',
        email: settings?.email || '',
        address: settings?.address || '',
        linkedin: settings?.socialLinks?.linkedin || '',
        twitter: settings?.socialLinks?.twitter || '',
        facebook: settings?.socialLinks?.facebook || ''
      });

    } catch (err) {
      console.error('Error fetching dashboard records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (isAuthenticated && activeTab !== 'dashboard') {
      refreshTabResource(activeTab);
    }
  }, [activeTab, isAuthenticated, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  // CSV Export Trigger
  const handleCSVExport = () => {
    window.open(`/api/leads/export?Authorization=Bearer ${token}`, '_blank');
  };

  // General Status Toggles (leads, meetings, startups, careers)
  const handleStatusUpdate = async (endpoint, id, statusField, newStatus) => {
    try {
      const res = await fetch(`/api/${endpoint}/${id}/${statusField === 'status' && endpoint !== 'meetings' ? 'status' : ''}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [statusField]: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // General deletes
  const handleDeleteItem = async (endpoint, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Form Submits CRUD handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');
    
    const method = modalType === 'add-project' ? 'POST' : 'PUT';
    const url = modalType === 'add-project' ? '/api/projects' : `/api/projects/${selectedItem._id || selectedItem.id}`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectForm)
      });
      const data = await res.json();
      if (data.success) {
        setCrudSuccess('Project saved successfully!');
        setModalOpen(false);
        refreshData();
      } else {
        setCrudError(data.message || 'Operation failed.');
      }
    } catch (err) {
      setCrudError('Connection error.');
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const method = modalType === 'add-blog' ? 'POST' : 'PUT';
    const url = modalType === 'add-blog' ? '/api/blogs' : `/api/blogs/${selectedItem._id || selectedItem.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });
      const data = await res.json();
      if (data.success) {
        setCrudSuccess('Blog article saved successfully!');
        setModalOpen(false);
        refreshData();
      } else {
        setCrudError(data.message || 'Operation failed.');
      }
    } catch (err) {
      setCrudError('Connection error.');
    }
  };

  const handleFAQSubmit = async (e) => {
    e.preventDefault();
    const method = modalType === 'add-faq' ? 'POST' : 'PUT';
    const url = modalType === 'add-faq' ? '/api/faqs' : `/api/faqs/${selectedItem._id || selectedItem.id}`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(faqForm)
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const method = modalType === 'add-team' ? 'POST' : 'PUT';
    const url = modalType === 'add-team' ? '/api/team' : `/api/team/${selectedItem._id || selectedItem.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamForm)
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    const method = modalType === 'add-testimonial' ? 'POST' : 'PUT';
    const url = modalType === 'add-testimonial' ? '/api/testimonials' : `/api/testimonials/${selectedItem._id || selectedItem.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonialForm)
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        setCrudSuccess('Settings updated successfully!');
        dispatch(updateSuccess(data.settings));
      }
    } catch (err) {
      setCrudError('Failed to update settings');
    }
  };

  const handlePolicySubmit = async (type) => {
    setCrudError('');
    setCrudSuccess('');
    const doc = type === 'privacy' ? privacyPolicy : termsPolicy;
    try {
      const res = await fetch(`/api/privacy/${type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(doc)
      });
      const data = await res.json();
      if (data.success) {
        setCrudSuccess(`${type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'} updated!`);
      }
    } catch (err) {
      setCrudError('Failed to update document.');
    }
  };

  // Modify roles
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Notifications read trigger
  const handleMarkNotificationsRead = async () => {
    try {
      const res = await fetch('/api/notifications/read-all', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD Forms Seed Helpers
  const openAddProject = () => {
    setModalType('add-project');
    setProjectForm({
      title: '', description: '', category: 'SaaS', clientGoals: '', challenges: '',
      solution: '', results: '', testimonialText: '', testimonialAuthor: '',
      testimonialRole: '', technologyStack: '', featured: false, link: ''
    });
    setModalOpen(true);
  };

  const openEditProject = (p) => {
    setSelectedItem(p);
    setModalType('edit-project');
    setProjectForm({
      title: p.title || '',
      description: p.description || '',
      category: p.category || 'SaaS',
      clientGoals: p.clientGoals || '',
      challenges: p.challenges || '',
      solution: p.solution || '',
      results: p.results || '',
      testimonialText: p.testimonialText || '',
      testimonialAuthor: p.testimonialAuthor || '',
      testimonialRole: p.testimonialRole || '',
      technologyStack: p.technologyStack ? p.technologyStack.join(', ') : '',
      featured: p.featured || false,
      link: p.link || ''
    });
    setModalOpen(true);
  };

  const openAddBlog = () => {
    setModalType('add-blog');
    setBlogForm({
      title: '', content: '', author: user?.name || 'Zonova Editor', category: 'Venture Building',
      tags: '', status: 'draft', metaTitle: '', metaDescription: ''
    });
    setModalOpen(true);
  };

  const openEditBlog = (b) => {
    setSelectedItem(b);
    setModalType('edit-blog');
    setBlogForm({
      title: b.title || '',
      content: b.content || '',
      author: b.author || '',
      category: b.category || 'Venture Building',
      tags: b.tags ? b.tags.join(', ') : '',
      status: b.status || 'draft',
      metaTitle: b.metaTitle || '',
      metaDescription: b.metaDescription || ''
    });
    setModalOpen(true);
  };

  const openAddFAQ = () => {
    setModalType('add-faq');
    setFAQForm({ question: '', answer: '', category: 'General' });
    setModalOpen(true);
  };

  const openEditFAQ = (f) => {
    setSelectedItem(f);
    setModalType('edit-faq');
    setFAQForm({ question: f.question, answer: f.answer, category: f.category || 'General' });
    setModalOpen(true);
  };

  const openAddTeam = () => {
    setModalType('add-team');
    setTeamForm({ name: '', role: '', bio: '', linkedin: '', twitter: '' });
    setModalOpen(true);
  };

  const openEditTeam = (t) => {
    setSelectedItem(t);
    setModalType('edit-team');
    setTeamForm({ name: t.name, role: t.role, bio: t.bio || '', linkedin: t.linkedin || '', twitter: t.twitter || '' });
    setModalOpen(true);
  };

  const openAddTestimonial = () => {
    setModalType('add-testimonial');
    setTestimonialForm({ author: '', role: '', company: '', text: '', rating: 5 });
    setModalOpen(true);
  };

  const openEditTestimonial = (t) => {
    setSelectedItem(t);
    setModalType('edit-testimonial');
    setTestimonialForm({ author: t.author, role: t.role, company: t.company, text: t.text, rating: t.rating || 5 });
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="large" />
      </div>
    );
  }

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'projects', label: 'Portfolio Projects', icon: <Layers size={16} /> },
    { id: 'blogs', label: 'Blog System', icon: <BookOpen size={16} /> },
    { id: 'leads', label: 'Lead Management', icon: <UserCheck size={16} /> },
    { id: 'meetings', label: 'Meetings Scheduler', icon: <Calendar size={16} /> },
    { id: 'startups', label: 'Startup Partners', icon: <Briefcase size={16} /> },
    { id: 'careers', label: 'Job Candidates', icon: <Users size={16} /> },
    { id: 'team', label: 'Team Members', icon: <Users size={16} /> },
    { id: 'testimonials', label: 'Client Reviews', icon: <MessageSquare size={16} /> },
    { id: 'newsletter', label: 'Newsletter list', icon: <Mail size={16} /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings size={16} /> },
    { id: 'faqs', label: 'FAQs Manager', icon: <HelpCircle size={16} /> },
    { id: 'policy', label: 'Policies & Terms', icon: <FileText size={16} /> },
    { id: 'roles', label: 'Roles / Permissions', icon: <Shield size={16} /> }
  ];

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <SEO title="Admin Control Center" />

      {/* 1. Left Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-secondary text-slate-300 border-r border-secondary-light">
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-secondary-light bg-secondary-dark">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
              Z
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm text-white leading-none">ZONOVA</span>
              <span className="text-[8px] tracking-widest text-slate-400 mt-0.5">CONSOLE</span>
            </div>
          </Link>
        </div>

        {/* Links Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveTab(link.id); setCrudError(''); setCrudSuccess(''); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === link.id
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer auth info */}
        <div className="p-4 border-t border-secondary-light bg-secondary-dark/50 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.[0] || 'A'}
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-none">{user?.name}</h5>
              <span className="text-[10px] text-slate-400 leading-none mt-1 block uppercase">{user?.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Header bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
          <h2 className="font-extrabold text-xl text-secondary text-left capitalize">
            {sidebarLinks.find(l => l.id === activeTab)?.label}
          </h2>

          {/* Top Actions */}
          <div className="flex items-center gap-4 relative">
            {/* Alarm notifications */}
            <button 
              onClick={() => setNotifDropdown(!notifDropdown)}
              className="relative p-2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <Bell size={20} />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Dropdown notifications drawer */}
            {notifDropdown && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-30 text-left animate-fade-in">
                <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-bold text-xs text-secondary">System Alerts</h4>
                  <button 
                    onClick={handleMarkNotificationsRead}
                    className="text-[10px] text-primary font-bold hover:underline"
                  >
                    Mark read
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div key={notif._id || notif.id} className={`p-3 text-xs ${notif.read ? 'opacity-60' : 'bg-blue-50/10 font-medium'}`}>
                        <span className="block font-bold text-secondary">{notif.title}</span>
                        <span className="block text-slate-500 mt-0.5">{notif.message}</span>
                        <span className="block text-[9px] text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-xs">No alerts generated.</div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="md:hidden flex items-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 text-rose-500 rounded-xl text-xs font-bold transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Dashboard Modules views */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {crudSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-600 text-left">
              {crudSuccess}
            </div>
          )}

          {/* TAB 1: Dashboard Overview statistics */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 text-left animate-fade-in">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Leads', val: stats.totalLeads, icon: <UserCheck className="text-blue-500" />, bg: 'bg-blue-50' },
                  { label: 'Meetings Booked', val: stats.totalMeetings, icon: <Calendar className="text-violet-500" />, bg: 'bg-violet-50' },
                  { label: 'Startup Program', val: stats.totalStartupApps, icon: <Briefcase className="text-amber-500" />, bg: 'bg-amber-50' },
                  { label: 'Newsletter Subs', val: stats.totalSubscribers, icon: <Mail className="text-emerald-500" />, bg: 'bg-emerald-50' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
                      <h3 className="text-3xl font-black text-secondary leading-none">{card.val || 0}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Aggregate */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-lg text-secondary">Pipeline Growth Statistics</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="leadsColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="meetingsColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: 12 }} />
                      <YAxis stroke="#94A3B8" style={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="Leads" stroke="#2563EB" fillOpacity={1} fill="url(#leadsColor)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Meetings" stroke="#8B5CF6" fillOpacity={1} fill="url(#meetingsColor)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Portfolio Projects CRUD */}
          {activeTab === 'projects' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Manage Portfolio Case Studies</h3>
                <button
                  onClick={openAddProject}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Project Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {projectsList.map((p) => (
                      <tr key={p._id || p.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-secondary">{p.title}</td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${p.featured ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-slate-100 text-slate-500'}`}>
                            {p.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditProject(p)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('projects', p._id || p.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Blog CRUD */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Manage Blog Articles</h3>
                <button
                  onClick={openAddBlog}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Create Blog</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Article Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {blogsList.map((b) => (
                      <tr key={b._id || b.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-secondary">{b.title}</td>
                        <td className="p-4">{b.category}</td>
                        <td className="p-4">{b.author}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${b.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditBlog(b)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('blogs', b._id || b.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Lead list */}
          {activeTab === 'leads' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Contact Form Leads</h3>
                <button
                  onClick={handleCSVExport}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Lead Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Company</th>
                      <th className="p-4">Interested In</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {leads.map((l) => (
                      <tr key={l._id || l.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <span className="block font-bold text-secondary">{l.name}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{l.phone}</span>
                        </td>
                        <td className="p-4">{l.email}</td>
                        <td className="p-4 font-medium">{l.company || 'Individual'}</td>
                        <td className="p-4">{l.serviceInterestedIn}</td>
                        <td className="p-4">
                          <select
                            value={l.status}
                            onChange={(e) => handleStatusUpdate('leads', l._id || l.id, 'status', e.target.value)}
                            className="bg-slate-100 border-none rounded-lg p-1.5 font-bold text-[10px] uppercase text-slate-700"
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteItem('leads', l._id || l.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Meetings scheduler */}
          {activeTab === 'meetings' && (
            <div className="space-y-6 text-left animate-fade-in">
              <h3 className="font-extrabold text-lg text-secondary">Scheduled Strategy Bookings</h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Contact</th>
                      <th className="p-4">Preferred Slot</th>
                      <th className="p-4">Service Required</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {meetings.map((m) => (
                      <tr key={m._id || m.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <span className="block font-bold text-secondary">{m.fullName}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{m.email}</span>
                          <span className="block text-[10px] text-slate-400">{m.phone}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">
                          {m.preferredDate} at {m.preferredTime}
                        </td>
                        <td className="p-4">{m.serviceRequired}</td>
                        <td className="p-4">{m.budget}</td>
                        <td className="p-4">
                          <select
                            value={m.status}
                            onChange={(e) => handleStatusUpdate('meetings', m._id || m.id, 'status', e.target.value)}
                            className="bg-slate-100 border-none rounded-lg p-1.5 font-bold text-[10px] uppercase text-slate-700"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteItem('meetings', m._id || m.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: Startup applications */}
          {activeTab === 'startups' && (
            <div className="space-y-6 text-left animate-fade-in">
              <h3 className="font-extrabold text-lg text-secondary">Startup Support Applications</h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Founder / Startup</th>
                      <th className="p-4">Stage / Stage</th>
                      <th className="p-4">Idea Description</th>
                      <th className="p-4">Required Services</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {startups.map((sa) => (
                      <tr key={sa._id || sa.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <span className="block font-bold text-secondary">{sa.founderName}</span>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">{sa.startupName}</span>
                          <span className="block text-[10px] text-slate-400">{sa.email}</span>
                        </td>
                        <td className="p-4">
                          <span className="block font-medium">{sa.startupStage}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{sa.fundingStatus}</span>
                        </td>
                        <td className="p-4 max-w-xs truncate">{sa.startupIdea}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {sa.requiredServices?.map((srv, idx) => (
                              <span key={idx} className="bg-slate-100 text-[9px] px-1.5 py-0.5 rounded text-slate-600 font-semibold">{srv}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={sa.status}
                            onChange={(e) => handleStatusUpdate('startups', sa._id || sa.id, 'status', e.target.value)}
                            className="bg-slate-100 border-none rounded-lg p-1.5 font-bold text-[10px] uppercase text-slate-700"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteItem('startups', sa._id || sa.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: Careers Job Applications */}
          {activeTab === 'careers' && (
            <div className="space-y-6 text-left animate-fade-in">
              <h3 className="font-extrabold text-lg text-secondary">Job Candidate Profiles</h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Target Position</th>
                      <th className="p-4">Resume</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {careers.map((ca) => (
                      <tr key={ca._id || ca.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <span className="block font-bold text-secondary">{ca.fullName}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{ca.email}</span>
                          <span className="block text-[10px] text-slate-400">{ca.phone}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{ca.position}</td>
                        <td className="p-4">
                          <a
                            href={ca.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            View File
                          </a>
                        </td>
                        <td className="p-4">
                          <select
                            value={ca.status}
                            onChange={(e) => handleStatusUpdate('careers', ca._id || ca.id, 'status', e.target.value)}
                            className="bg-slate-100 border-none rounded-lg p-1.5 font-bold text-[10px] uppercase text-slate-700"
                          >
                            <option value="applied">Applied</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteItem('careers', ca._id || ca.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: Team members CRUD */}
          {activeTab === 'team' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Manage Team crew</h3>
                <button
                  onClick={openAddTeam}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((t) => (
                  <div key={t._id || t.id} className="p-6 bg-white border border-slate-200 rounded-2xl flex items-start justify-between shadow-sm">
                    <div className="flex gap-4">
                      <img src={t.image || '/images/team1.svg'} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-secondary text-sm">{t.name}</h4>
                        <span className="text-[10px] text-primary font-semibold uppercase tracking-wider block mt-0.5">{t.role}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEditTeam(t)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                        <Edit size={12} />
                      </button>
                      <button onClick={() => handleDeleteItem('team', t._id || t.id)} className="p-1 hover:bg-rose-50 rounded text-rose-500">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: Testimonials CRUD */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Manage Client Reviews</h3>
                <button
                  onClick={openAddTestimonial}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t._id || t.id} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm space-y-4">
                    <p className="text-xs text-slate-500 italic">"{t.text}"</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-secondary text-xs">{t.author}</h5>
                        <span className="text-[9px] text-slate-400">{t.role}, {t.company}</span>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditTestimonial(t)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                          <Edit size={12} />
                        </button>
                        <button onClick={() => handleDeleteItem('testimonials', t._id || t.id)} className="p-1 hover:bg-rose-50 rounded text-rose-500">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: Newsletter Subscribers */}
          {activeTab === 'newsletter' && (
            <div className="space-y-6 text-left animate-fade-in">
              <h3 className="font-extrabold text-lg text-secondary">Subscribers list</h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm max-w-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Subscription status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {subscribers.map((s) => (
                      <tr key={s._id || s.id}>
                        <td className="p-4 font-semibold text-secondary">{s.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${s.status === 'subscribed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: Settings form */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-left animate-fade-in max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-extrabold text-xl text-secondary border-b border-slate-100 pb-3">Change Contact details & Address</h3>
              
              <form onSubmit={handleSettingsSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Corporate Phone 1</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phone1}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                      placeholder="9324707261"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Corporate Phone 2</label>
                    <input
                      type="text"
                      value={settingsForm.phone2}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                      placeholder="9335088060"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    placeholder="zonovatechnologies@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Office Address</label>
                  <textarea
                    required
                    rows={3}
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    placeholder="Enter corporate office address..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-md shadow-primary/10 flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Save Settings changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 12: FAQ Manager */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg text-secondary">Frequently Asked Questions</h3>
                <button
                  onClick={openAddFAQ}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Question</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {faqs.map((f) => (
                      <tr key={f._id || f.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-secondary">{f.question}</td>
                        <td className="p-4">{f.category}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditFAQ(f)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('faqs', f._id || f.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 13: Policy & Terms manager */}
          {activeTab === 'policy' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left animate-fade-in">
              {/* Privacy Policy */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="font-extrabold text-sm text-secondary uppercase tracking-widest">Privacy Policy content</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Document Title</label>
                  <input
                    type="text"
                    value={privacyPolicy.title}
                    onChange={(e) => setPrivacyPolicy({ ...privacyPolicy, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Content (Text/Markdown)</label>
                  <textarea
                    rows={8}
                    value={privacyPolicy.content}
                    onChange={(e) => setPrivacyPolicy({ ...privacyPolicy, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <button
                  onClick={() => handlePolicySubmit('privacy')}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-xs font-bold"
                >
                  Save Privacy policy
                </button>
              </div>

              {/* Terms Policy */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="font-extrabold text-sm text-secondary uppercase tracking-widest">Terms & Conditions content</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Document Title</label>
                  <input
                    type="text"
                    value={termsPolicy.title}
                    onChange={(e) => setTermsPolicy({ ...termsPolicy, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Content (Text/Markdown)</label>
                  <textarea
                    rows={8}
                    value={termsPolicy.content}
                    onChange={(e) => setTermsPolicy({ ...termsPolicy, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <button
                  onClick={() => handlePolicySubmit('terms')}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-xs font-bold"
                >
                  Save Terms conditions
                </button>
              </div>
            </div>
          )}

          {/* TAB 14: User Roles Manager */}
          {activeTab === 'roles' && (
            <div className="space-y-6 text-left animate-fade-in">
              <h3 className="font-extrabold text-lg text-secondary">Console User Roles</h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm max-w-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Assigned Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {usersList.map((usr) => (
                      <tr key={usr.id}>
                        <td className="p-4 font-bold text-secondary">{usr.name}</td>
                        <td className="p-4">{usr.email}</td>
                        <td className="p-4">
                          <select
                            value={usr.role}
                            onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                            disabled={usr.email === 'admin@zonova.com'} // secure seeding root account
                            className="bg-slate-100 border-none rounded-lg p-1.5 font-semibold text-xs text-slate-700 disabled:opacity-50"
                          >
                            <option value="admin">Administrator</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CRUD MODALS */}
      {modalOpen && (
        <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-8 shadow-2xl text-left max-h-[85vh] overflow-y-auto space-y-6 animate-fade-in relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
            >
              <X size={20} />
            </button>

            {/* A. Project modal form */}
            {(modalType === 'add-project' || modalType === 'edit-project') && (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <h3 className="font-extrabold text-2xl text-secondary">
                  {modalType === 'add-project' ? 'Add Case Study' : 'Edit Case Study'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
                    <input
                      type="text" required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                    >
                      <option value="SaaS">SaaS</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Web">Web</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="Automation">Automation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description</label>
                  <textarea
                    required rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Client Goals</label>
                    <input
                      type="text"
                      value={projectForm.clientGoals}
                      onChange={(e) => setProjectForm({ ...projectForm, clientGoals: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Key Results</label>
                    <input
                      type="text"
                      value={projectForm.results}
                      onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text" placeholder="React, Node, Express"
                    value={projectForm.technologyStack}
                    onChange={(e) => setProjectForm({ ...projectForm, technologyStack: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox" id="featuredProj"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="h-4 w-4 text-primary rounded border-slate-300"
                  />
                  <label htmlFor="featuredProj" className="text-xs font-semibold text-slate-700">Feature this project on Home page</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold"
                >
                  Save Case Study
                </button>
              </form>
            )}

            {/* B. Blog modal form */}
            {(modalType === 'add-blog' || modalType === 'edit-blog') && (
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <h3 className="font-extrabold text-2xl text-secondary">
                  {modalType === 'add-blog' ? 'Create Article' : 'Edit Article'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Article Title</label>
                    <input
                      type="text" required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                    >
                      <option value="Venture Building">Venture Building</option>
                      <option value="Tech & Engineering">Tech & Engineering</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Growth Marketing">Growth Marketing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Content (HTML allowed)</label>
                  <textarea
                    required rows={6}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Title SEO</label>
                    <input
                      type="text"
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                    <input
                      type="text" required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description SEO</label>
                  <input
                    type="text"
                    value={blogForm.metaDescription}
                    onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={blogForm.status}
                      onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text" placeholder="startup, mvp, code"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold"
                >
                  Save Blog Post
                </button>
              </form>
            )}

            {/* C. FAQ Form */}
            {(modalType === 'add-faq' || modalType === 'edit-faq') && (
              <form onSubmit={handleFAQSubmit} className="space-y-4">
                <h3 className="font-extrabold text-2xl text-secondary">
                  {modalType === 'add-faq' ? 'Add FAQ Item' : 'Edit FAQ Item'}
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Question</label>
                  <input
                    type="text" required
                    value={faqForm.question}
                    onChange={(e) => setFAQForm({ ...faqForm, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Answer</label>
                  <textarea
                    required rows={3}
                    value={faqForm.answer}
                    onChange={(e) => setFAQForm({ ...faqForm, answer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold"
                >
                  Save FAQ
                </button>
              </form>
            )}

            {/* D. Team Form */}
            {(modalType === 'add-team' || modalType === 'edit-team') && (
              <form onSubmit={handleTeamSubmit} className="space-y-4">
                <h3 className="font-extrabold text-2xl text-secondary">
                  {modalType === 'add-team' ? 'Add Team Member' : 'Edit Team Member'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                    <input
                      type="text" required
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                    <input
                      type="text" required
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Biography</label>
                  <textarea
                    rows={2}
                    value={teamForm.bio}
                    onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold"
                >
                  Save Member
                </button>
              </form>
            )}

            {/* E. Testimonial Form */}
            {(modalType === 'add-testimonial' || modalType === 'edit-testimonial') && (
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <h3 className="font-extrabold text-2xl text-secondary">
                  {modalType === 'add-testimonial' ? 'Add Testimonial' : 'Edit Testimonial'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Author</label>
                    <input
                      type="text" required
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                    <input
                      type="text" required
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                    <input
                      type="text" required
                      value={testimonialForm.company}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Review Text</label>
                  <textarea
                    required rows={3}
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold"
                >
                  Save Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
