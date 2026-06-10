import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { KeyRound, Mail, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginStart());
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess({ token: data.token, user: data.user }));
        navigate('/admin/dashboard');
      } else {
        dispatch(loginFailure(data.message || 'Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure('Connection error. Is API server running?'));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <SEO title="Admin Login" description="Secure access portal for Zonova Technologies administrators." />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-left space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md">
            Z
          </div>
          <h2 className="text-2xl font-black text-secondary mt-4">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log in to manage leads, projects, applications and settings.</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-xs font-semibold text-rose-600">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Corporate Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zonova.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Seeded Default:</span>
            <span className="font-mono text-slate-600 bg-slate-100 px-1 py-0.5 rounded">admin@zonova.com</span>
            <span>/</span>
            <span className="font-mono text-slate-600 bg-slate-100 px-1 py-0.5 rounded">admin123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Spinner size="small" color="white" /> : <span>Access Console</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
