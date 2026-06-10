import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import Spinner from '../components/Spinner';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await fetch('/api/privacy/privacy');
        const data = await res.json();
        if (data.success) {
          setPolicy(data.policy);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <div className="bg-white">
      <SEO title="Privacy Policy" description="Read our privacy policy regarding how we collect, store and process your data." />

      <section className="relative overflow-hidden bg-bgSec py-16 border-b border-slate-100">
        {/* Floating stickers */}
        <div className="absolute top-[15%] left-[5%] animate-float-slow hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold shadow-sm select-none">
            🔒 Secure Data
          </span>
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-fast hidden md:block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-extrabold shadow-sm select-none">
            🛡️ Privacy Safe
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Last updated: {policy ? new Date(policy.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4 text-left">
        {loading ? (
          <Spinner />
        ) : (
          <div className="prose prose-blue max-w-none text-slate-600 space-y-6">
            <h2 className="text-2xl font-bold text-secondary">{policy?.title || 'Privacy Policy'}</h2>
            <div 
              className="leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: policy?.content 
                  ? policy.content.replace(/\n/g, '<br/>') 
                  : 'Zonova Technologies is committed to protecting your privacy. This policy explains how we collect and use your data.' 
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default PrivacyPolicy;
