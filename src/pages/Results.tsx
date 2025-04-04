
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
            <h2 className="text-xl font-medium text-gray-700">กำลังวิเคราะห์อาการของคุณ...</h2>
            <p className="text-gray-500 mt-2">อาจใช้เวลาสักครู่</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const generalAdvice = [
    "ดื่มน้ำให้เพียงพอเพื่อรักษาความชุ่มชื้น",
    "พักผ่อนให้เพียงพอเพื่อช่วยให้ร่างกายฟื้นตัว",
    "ติดตามอาการของคุณและบันทึกการเปลี่ยนแปลงใดๆ",
    "หลีกเลี่ยงกิจกรรมที่ต้องออกแรงมากระหว่างการฟื้นตัว"
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
                <span>กลับไปยังตัวตรวจสอบอาการ</span>
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">ผลลัพธ์ของคุณ</h1>
            <p className="text-gray-600 mb-6">
              จากอาการที่คุณรายงาน: {selectedSymptomNames.join(', ')}
            </p>
            
            <InfoCard
              title="ข้อสงวนสิทธิ์ทางการแพทย์"
              description="เครื่องมือนี้ให้ข้อมูลทั่วไปและไม่ใช่การทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญ ผลลัพธ์อิงตามอาการที่รายงานบ่อยและไม่ควรใช้เพื่อการวินิจฉัยตนเอง"
              type="warning"
            />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-medical-blue" />
                โรคที่เป็นไปได้
              </h2>
              
              {possibleConditions.length > 0 ? (
                <div className="space-y-4">
                  {possibleConditions.map(condition => (
                    <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-lg text-medical-blue">{condition.name}</h3>
                      <p className="text-gray-600 mt-1 mb-3">{condition.description}</p>
                      
                      <h4 className="font-medium text-gray-700 mt-3">คำแนะนำในการดูแลตนเอง:</h4>
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
                          เมื่อใดควรพบแพทย์:
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{condition.whenToSeeDoctor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>ไม่พบโรคที่ตรงกับอาการของคุณ</p>
                  <p className="mt-2">อาจเป็นเพราะข้อมูลอาการที่จำกัดหรืออาการของคุณอาจเกี่ยวข้องกับโรคที่ไม่มีในฐานข้อมูลของเรา</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-medical-teal" />
                คำแนะนำสุขภาพทั่วไป
              </h2>
              
              <InfoCard
                title="คำแนะนำในการดูแลตนเองขั้นพื้นฐาน"
                items={generalAdvice}
                type="success"
              />
              
              <InfoCard
                title="เมื่อใดควรขอความช่วยเหลือทางการแพทย์"
                description="ติดต่อผู้ให้บริการด้านสุขภาพหากคุณมีอาการใดต่อไปนี้:"
                items={[
                  "อาการปวดรุนแรงหรืออาการที่แย่ลงอย่างมีนัยสำคัญ",
                  "หายใจลำบากหรือหายใจถี่",
                  "มีไข้สูงเกิน 39.4°C ที่ไม่ตอบสนองต่อยา",
                  "อาการที่ยังคงอยู่นานกว่า 7 วัน",
                  "อาการที่ส่งผลกระทบอย่างมากต่อกิจกรรมประจำวันของคุณ"
                ]}
                type="warning"
              />
            </div>
            
            <div className="text-center mt-8">
              <Link to="/checker" className="btn-primary">
                ตรวจสอบอาการอื่น
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
