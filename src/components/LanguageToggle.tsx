
import React from 'react';
import { Toggle } from './ui/toggle';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${language === 'th' ? 'font-medium text-medical-blue' : 'text-gray-500'}`}>
        ไทย
      </span>
      <Toggle 
        pressed={language === 'en'} 
        onPressedChange={handleToggle}
        aria-label="Toggle language"
        className="data-[state=on]:bg-medical-blue data-[state=on]:text-white"
      >
        {language === 'en' ? 'EN' : 'TH'}
      </Toggle>
      <span className={`text-sm ${language === 'en' ? 'font-medium text-medical-blue' : 'text-gray-500'}`}>
        English
      </span>
    </div>
  );
};

export default LanguageToggle;
