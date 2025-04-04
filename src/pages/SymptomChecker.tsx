
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SymptomCard from '../components/SymptomCard';
import { Symptom, symptoms, SymptomCategory } from '../data/symptoms';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SymptomCategory | 'All'>('All');
  const navigate = useNavigate();

  const categories: (SymptomCategory | 'All')[] = ['All', 'General', 'Head', 'Respiratory', 'Digestive', 'Musculoskeletal', 'Skin'];

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) 
        ? prev.filter(symptomId => symptomId !== id) 
        : [...prev, id]
    );
  };

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          symptom.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || symptom.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      navigate('/results', { state: { selectedSymptoms } });
    }
  };

  const categorySymptomCount = (category: SymptomCategory | 'All') => {
    if (category === 'All') return symptoms.length;
    return symptoms.filter(s => s.category === category).length;
  };

  // Thai translations for category names
  const categoryTranslations: Record<SymptomCategory | 'All', string> = {
    'All': 'ทั้งหมด',
    'General': 'ทั่วไป',
    'Head': 'ศีรษะ',
    'Respiratory': 'ระบบหายใจ',
    'Digestive': 'ระบบย่อยอาหาร',
    'Musculoskeletal': 'กล้ามเนื้อและกระดูก',
    'Skin': 'ผิวหนัง'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-medical-light">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">ตรวจสอบอาการ</h1>
            <p className="text-gray-600 text-center mb-8">
              เลือกอาการทั้งหมดที่คุณกำลังประสบเพื่อค้นหาโรคที่เป็นไปได้
            </p>
            
            {/* Search bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                placeholder="ค้นหาอาการ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category filters */}
            <div className="flex overflow-x-auto mb-6 pb-2 -mx-2 px-2 space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-medical-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {categoryTranslations[category]} ({categorySymptomCount(category)})
                </button>
              ))}
            </div>
            
            {/* Symptoms grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredSymptoms.length > 0 ? (
                filteredSymptoms.map(symptom => (
                  <SymptomCard
                    key={symptom.id}
                    symptom={symptom}
                    isSelected={selectedSymptoms.includes(symptom.id)}
                    onToggle={handleToggleSymptom}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  ไม่พบอาการที่ตรงกับเกณฑ์การค้นหาของคุณ
                </div>
              )}
            </div>
            
            {/* Submit button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={selectedSymptoms.length === 0}
                className={`btn-primary inline-flex items-center ${
                  selectedSymptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>ตรวจสอบโรคที่เป็นไปได้</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <p className="text-sm text-gray-500 mt-2">
                {selectedSymptoms.length === 0 
                  ? 'กรุณาเลือกอย่างน้อยหนึ่งอาการ' 
                  : `เลือก ${selectedSymptoms.length} อาการ`}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SymptomChecker;
