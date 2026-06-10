import React from 'react';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4',
  };

  const colorClasses = {
    primary: 'border-t-primary border-r-transparent border-b-transparent border-l-transparent',
    accent: 'border-t-accent border-r-transparent border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-transparent border-b-transparent border-l-transparent',
  };

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
