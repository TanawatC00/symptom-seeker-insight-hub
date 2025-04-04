
import React from 'react';
import { Link } from 'react-router-dom';
import { ActivitySquare, AlertCircle, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ActivitySquare className="h-8 w-8 text-medical-blue" />
            <span className="font-bold text-xl text-medical-dark">SymptomSeeker</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors">
                  <Home className="h-4 w-4" />
                  <span>หน้าหลัก</span>
                </Link>
              </li>
              <li>
                <Link to="/checker" className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors">
                  <AlertCircle className="h-4 w-4" />
                  <span>ตรวจสอบอาการ</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
