import React from 'react';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-20 w-20 border-4',
  };

  const colorClasses = {
    primary: 'border-t-primary border-r-transparent border-b-transparent border-l-transparent',
    accent: 'border-t-accent border-r-transparent border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-transparent border-b-transparent border-l-transparent',
  };

  if (size === 'large') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="relative flex items-center justify-center h-20 w-20">
          {/* Rotating Outer Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-100 border-t-primary" />
          {/* Pulsing Inner Logo */}
          <div className="h-14 w-14 rounded-full overflow-hidden animate-pulse shadow-md bg-white flex items-center justify-center border border-slate-100">
            <img src="/images/logo.jpg" alt="Zonova Logo" className="w-full h-full object-cover scale-[1.1]" />
          </div>
        </div>
        <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase animate-pulse">
          Loading Zonova
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-solid border-slate-200 ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

