
import React from 'react';
import { Check } from 'lucide-react';
import { Symptom } from '../data/symptoms';

interface SymptomCardProps {
  symptom: Symptom;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom, isSelected, onToggle }) => {
  return (
    <div 
      className={`p-4 rounded-lg border transition-all cursor-pointer card-shadow ${
        isSelected 
          ? 'bg-blue-50 border-medical-blue' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onToggle(symptom.id)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{symptom.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{symptom.description}</p>
        </div>
        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-medical-blue text-white' : 'bg-gray-100'
        }`}>
          {isSelected && <Check className="h-3 w-3" />}
        </div>
      </div>
    </div>
  );
};

export default SymptomCard;
