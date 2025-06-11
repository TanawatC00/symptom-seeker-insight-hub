
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  th: {
    // Home page
    'home.title': 'เข้าใจอาการของคุณ',
    'home.subtitle': 'ตรวจสอบอาการของคุณ ค้นพบสาเหตุที่เป็นไปได้ และรับคำแนะนำเกี่ยวกับขั้นตอนต่อไป',
    'home.startChecker': 'เริ่มการตรวจสอบอาการ',
    'home.disclaimer': 'ไม่ใช่การทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญ',
    'home.howItWorks': 'วิธีการทำงาน',
    'home.analyzeSymptoms': 'วิเคราะห์อาการ',
    'home.analyzeSymptomsDesc': 'เลือกอาการของคุณและรับรายการโรคที่เป็นไปได้ตามอาการที่คุณเลือก',
    'home.selfCareAdvice': 'คำแนะนำในการดูแลตนเอง',
    'home.selfCareAdviceDesc': 'รับคำแนะนำในการจัดการกับอาการของคุณและเมื่อใดควรพบแพทย์',
    'home.reliableInfo': 'ข้อมูลที่น่าเชื่อถือ',
    'home.reliableInfoDesc': 'เข้าถึงข้อมูลทางการแพทย์จากแหล่งสุขภาพที่เชื่อถือได้และแนวทางทางคลินิก',
    'home.readyToCheck': 'พร้อมที่จะตรวจสอบอาการของคุณหรือไม่?',
    'home.readyToCheckDesc': 'ตัวตรวจสอบอาการของเราช่วยให้คุณเข้าใจสิ่งที่อาจเป็นสาเหตุของอาการของคุณและให้คำแนะนำเกี่ยวกับสิ่งที่ควรทำต่อไป',
    'home.startNow': 'เริ่มตอนนี้เลย',
    'home.importantDisclaimer': 'ข้อสงวนสิทธิ์ที่สำคัญ',
    'home.disclaimerText1': 'SymptomSeeker ถูกออกแบบมาเพื่อให้ข้อมูลทั่วไปและคำแนะนำตามอาการที่คุณรายงาน ไม่ได้มีวัตถุประสงค์เพื่อทดแทนคำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษาจากผู้เชี่ยวชาญ',
    'home.disclaimerText2': 'ควรขอคำแนะนำจากแพทย์หรือผู้ให้บริการด้านสุขภาพที่มีคุณสมบัติเหมาะสมเสมอหากคุณมีคำถามเกี่ยวกับสภาพทางการแพทย์ อย่าละเลยคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญหรือชะลอการขอรับคำปรึกษาเนื่องจากสิ่งที่คุณอ่านบนเว็บไซต์นี้',
    
    // Header
    'header.home': 'หน้าหลัก',
    'header.chatbot': 'แชทบอท',
    'header.maps': 'แผนที่',
    'header.login': 'เข้าสู่ระบบ',
    'header.logout': 'ออกจากระบบ',
    
    // Maps page
    'maps.title': 'ค้นหาสถานพยาบาล',
    'maps.subtitle': 'ค้นหาโรงพyาบาล คลินิก และศูนย์สุขภาพใกล้เคียง',
    'maps.nearbyFacilities': 'สถานพยาบาลใกล้เคียง',
    'maps.interactiveMap': 'แผนที่แบบโต้ตอบ',
    'maps.myLocation': 'ตำแหน่งของฉัน',
    'maps.viewOnMap': 'ดูบนแผนที่',
    'maps.type': 'ประเภท',
    'maps.distance': 'ระยะทาง',
    'maps.selectLocation': 'เลือกตำแหน่งเพื่อค้นหาสถานพยาบาลใกล้เคียง',

    // Footer
    'footer.copyright': 'สงวนลิขสิทธิ์',
    'footer.medicalDisclaimer': 'ข้อสงวนสิทธิ์ทางการแพทย์:',
    'footer.disclaimerText': 'เครื่องมือนี้ให้ข้อมูลทั่วไปและไม่ใช่การทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญ โปรดปรึกษาผู้ให้บริการด้านสุขภาพสำหรับปัญหาทางการแพทย์เสมอ',
  },
  en: {
    // Home page
    'home.title': 'Understand Your Symptoms',
    'home.subtitle': 'Check your symptoms, discover possible causes, and get advice on next steps',
    'home.startChecker': 'Start Symptom Checker',
    'home.disclaimer': 'Not a substitute for professional medical advice',
    'home.howItWorks': 'How It Works',
    'home.analyzeSymptoms': 'Analyze Symptoms',
    'home.analyzeSymptomsDesc': 'Select your symptoms and get a list of possible conditions based on your selected symptoms',
    'home.selfCareAdvice': 'Self-Care Advice',
    'home.selfCareAdviceDesc': 'Get advice on managing your symptoms and when you should see a doctor',
    'home.reliableInfo': 'Reliable Information',
    'home.reliableInfoDesc': 'Access medical information from trusted health sources and clinical guidelines',
    'home.readyToCheck': 'Ready to check your symptoms?',
    'home.readyToCheckDesc': 'Our symptom checker helps you understand what might be causing your symptoms and provides guidance on what to do next',
    'home.startNow': 'Start Now',
    'home.importantDisclaimer': 'Important Disclaimer',
    'home.disclaimerText1': 'SymptomSeeker is designed to provide general information and advice based on the symptoms you report. It is not intended to replace professional medical advice, diagnosis, or treatment.',
    'home.disclaimerText2': 'Always seek advice from qualified healthcare providers if you have questions about a medical condition. Do not ignore professional medical advice or delay seeking consultation because of something you read on this website.',
    
    // Header
    'header.home': 'Home',
    'header.chatbot': 'Chatbot',
    'header.maps': 'Maps',
    'header.login': 'Sign In',
    'header.logout': 'Sign Out',
    
    // Maps page
    'maps.title': 'Find Healthcare Facilities',
    'maps.subtitle': 'Search for hospitals, clinics, and nearby health centers',
    'maps.nearbyFacilities': 'Nearby Health Facilities',
    'maps.interactiveMap': 'Interactive Map',
    'maps.myLocation': 'My Location',
    'maps.viewOnMap': 'View on Map',
    'maps.type': 'Type',
    'maps.distance': 'Distance',
    'maps.selectLocation': 'Select a location to find nearby healthcare facilities',

    // Footer
    'footer.copyright': 'All rights reserved',
    'footer.medicalDisclaimer': 'Medical Disclaimer:',
    'footer.disclaimerText': 'This tool provides general information and is not a substitute for professional medical advice. Always consult healthcare providers for medical concerns.',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'th' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
