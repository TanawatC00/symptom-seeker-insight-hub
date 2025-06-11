
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleToggle}
        className="relative flex items-center bg-gray-200 rounded-full p-1 w-20 h-8 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
        aria-label="Toggle language"
      >
        {/* Sliding background */}
        <div
          className={`absolute top-1 w-8 h-6 bg-medical-blue rounded-full transition-transform duration-200 ease-in-out ${
            language === 'en' ? 'translate-x-10' : 'translate-x-0'
          }`}
        />
        
        {/* TH Label */}
        <span
          className={`relative z-10 flex-1 text-xs font-medium text-center transition-colors duration-200 ${
            language === 'th' ? 'text-white' : 'text-gray-600'
          }`}
        >
          TH
        </span>
        
        {/* EN Label */}
        <span
          className={`relative z-10 flex-1 text-xs font-medium text-center transition-colors duration-200 ${
            language === 'en' ? 'text-white' : 'text-gray-600'
          }`}
        >
          EN
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
