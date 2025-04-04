
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Heart, Stethoscope } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';
import { conditions, findPossibleConditions, symptoms, Condition } from '../data/symptoms';

const Results = () => {
  const location = useLocation();
  const [possibleConditions, setPossibleConditions] = useState<Condition[]>([]);
  const [selectedSymptomNames, setSelectedSymptomNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the selected symptom IDs from the location state
    const selectedSymptoms = location.state?.selectedSymptoms || [];
    
    // Simulate API call or processing time
    setTimeout(() => {
      // Find possible conditions based on symptoms
      const foundConditions = findPossibleConditions(selectedSymptoms);
      setPossibleConditions(foundConditions);
      
      // Get the names of selected symptoms for display
      const symptomNames = selectedSymptoms.map(id => {
        const found = symptoms.find(s => s.id === id);
        return found ? found.name : '';
      }).filter(Boolean);
      
      setSelectedSymptomNames(symptomNames);
      setIsLoading(false);
    }, 1500);
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-medical-light flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-medical-blue border-r-transparent mb-4"></div>
            <h2 className="text-xl font-medium text-gray-700">Analyzing your symptoms...</h2>
            <p className="text-gray-500 mt-2">This may take a moment</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const generalAdvice = [
    "Stay hydrated by drinking plenty of water",
    "Get adequate rest to help your body recover",
    "Monitor your symptoms and note any changes",
    "Avoid strenuous activities while recovering"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-medical-light">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to="/checker" className="inline-flex items-center text-medical-blue hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Symptom Checker</span>
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Your Results</h1>
            <p className="text-gray-600 mb-6">
              Based on your reported symptoms: {selectedSymptomNames.join(', ')}
            </p>
            
            <InfoCard
              title="Medical Disclaimer"
              description="This tool provides general information and is not a substitute for professional medical advice. The results are based on commonly reported symptoms and should not be used for self-diagnosis."
              type="warning"
            />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-medical-blue" />
                Possible Conditions
              </h2>
              
              {possibleConditions.length > 0 ? (
                <div className="space-y-4">
                  {possibleConditions.map(condition => (
                    <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-lg text-medical-blue">{condition.name}</h3>
                      <p className="text-gray-600 mt-1 mb-3">{condition.description}</p>
                      
                      <h4 className="font-medium text-gray-700 mt-3">Self-Care Recommendations:</h4>
                      <ul className="mt-1 space-y-1">
                        {condition.selfCare.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="font-medium text-amber-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          When to See a Doctor:
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{condition.whenToSeeDoctor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No specific conditions match your symptoms.</p>
                  <p className="mt-2">This may be due to limited symptom information or your symptoms may be related to a condition not in our database.</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-medical-teal" />
                General Health Advice
              </h2>
              
              <InfoCard
                title="Basic Self-Care Recommendations"
                items={generalAdvice}
                type="success"
              />
              
              <InfoCard
                title="When to Seek Medical Attention"
                description="Contact a healthcare provider if you experience any of the following:"
                items={[
                  "Severe pain or symptoms that worsen significantly",
                  "Difficulty breathing or shortness of breath",
                  "High fever above 103°F (39.4°C) that doesn't respond to medication",
                  "Symptoms that persist for more than 7 days",
                  "Symptoms that significantly impact your daily activities"
                ]}
                type="warning"
              />
            </div>
            
            <div className="text-center mt-8">
              <Link to="/checker" className="btn-primary">
                Check Different Symptoms
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
