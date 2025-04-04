
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-bold text-lg text-medical-blue">SymptomSeeker</p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} สงวนลิขสิทธิ์</p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mt-4 md:mt-0">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">ข้อสงวนสิทธิ์ทางการแพทย์:</span> เครื่องมือนี้ให้ข้อมูลทั่วไปและไม่ใช่การทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญ โปรดปรึกษาผู้ให้บริการด้านสุขภาพสำหรับปัญหาทางการแพทย์เสมอ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
