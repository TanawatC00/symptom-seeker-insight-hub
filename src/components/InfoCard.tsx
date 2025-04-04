
import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description?: string;
  items?: string[];
  type?: 'info' | 'warning' | 'success';
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  description, 
  items = [], 
  type = 'info' 
}) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-medical-blue',
          icon: <Info className="h-5 w-5" />
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-500',
          icon: <AlertCircle className="h-5 w-5" />
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500',
          icon: <CheckCircle2 className="h-5 w-5" />
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-medical-blue',
          icon: <Info className="h-5 w-5" />
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bgColor} border ${styles.borderColor} rounded-lg p-4 mb-4`}>
      <div className="flex items-start gap-3">
        <div className={`${styles.iconColor} flex-shrink-0 mt-0.5`}>
          {styles.icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          
          {items.length > 0 && (
            <ul className="mt-2 space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
