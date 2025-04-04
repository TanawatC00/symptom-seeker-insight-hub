
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ActivitySquare, ShieldAlert, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const features = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-medical-blue" />,
      title: 'Symptom Analysis',
      description: 'Select your symptoms and get a list of possible conditions based on your selection.'
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-medical-teal" />,
      title: 'Self-Care Guidance',
      description: 'Receive recommendations for managing your symptoms and when to seek professional care.'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-medical-orange" />,
      title: 'Reliable Information',
      description: 'Access medical information based on trusted health sources and clinical guidelines.'
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
                Understand Your Symptoms
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Check your symptoms, discover possible causes, and get guidance on next steps.
              </p>
              <Link 
                to="/checker" 
                className="btn-accent inline-flex items-center text-lg px-8 py-3"
              >
                <span>Start Symptom Check</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Not a substitute for professional medical advice
              </p>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
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
              <h2 className="text-3xl font-bold mb-4">Ready to check your symptoms?</h2>
              <p className="text-xl opacity-90 mb-8">
                Our symptom checker helps you understand what might be causing your symptoms 
                and provides guidance on what to do next.
              </p>
              <Link 
                to="/checker" 
                className="bg-white text-medical-blue hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 inline-flex items-center"
              >
                <span>Get Started Now</span>
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
                <h2 className="text-xl font-semibold mb-4 text-center">Important Disclaimer</h2>
                <p className="text-gray-600 mb-4">
                  SymptomSeeker is designed to provide general information and guidance based on the symptoms you report. 
                  It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p className="text-gray-600">
                  Always seek the advice of your physician or other qualified health provider with any questions you may have 
                  regarding a medical condition. Never disregard professional medical advice or delay in seeking it because 
                  of something you have read on this website.
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
