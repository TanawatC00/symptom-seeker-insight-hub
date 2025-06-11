
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ActivitySquare, ShieldAlert, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-medical-blue" />,
      title: t('home.analyzeSymptoms'),
      description: t('home.analyzeSymptomsDesc')
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-medical-teal" />,
      title: t('home.selfCareAdvice'),
      description: t('home.selfCareAdviceDesc')
    },
    {
      icon: <BookOpen className="h-8 w-8 text-medical-orange" />,
      title: t('home.reliableInfo'),
      description: t('home.reliableInfoDesc')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-medical-light to-white py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <ActivitySquare className="h-12 w-12 text-medical-blue" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-medical-dark">
                {t('home.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('home.subtitle')}
              </p>
              <Link 
                to="/checker" 
                className="btn-accent inline-flex items-center text-lg px-8 py-3"
              >
                <span>{t('home.startChecker')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                {t('home.disclaimer')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home.howItWorks')}</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-medical-blue text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{t('home.readyToCheck')}</h2>
              <p className="text-xl opacity-90 mb-8">
                {t('home.readyToCheckDesc')}
              </p>
              <Link 
                to="/checker" 
                className="bg-white text-medical-blue hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 inline-flex items-center"
              >
                <span>{t('home.startNow')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Disclaimer section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">{t('home.importantDisclaimer')}</h2>
                <p className="text-gray-600 mb-4">
                  {t('home.disclaimerText1')}
                </p>
                <p className="text-gray-600">
                  {t('home.disclaimerText2')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
