
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ActivitySquare, ShieldAlert, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const features = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-medical-blue" />,
      title: 'วิเคราะห์อาการ',
      description: 'เลือกอาการของคุณและรับรายการโรคที่เป็นไปได้ตามอาการที่คุณเลือก'
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-medical-teal" />,
      title: 'คำแนะนำในการดูแลตนเอง',
      description: 'รับคำแนะนำในการจัดการกับอาการของคุณและเมื่อใดควรพบแพทย์'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-medical-orange" />,
      title: 'ข้อมูลที่น่าเชื่อถือ',
      description: 'เข้าถึงข้อมูลทางการแพทย์จากแหล่งสุขภาพที่เชื่อถือได้และแนวทางทางคลินิก'
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
                เข้าใจอาการของคุณ
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                ตรวจสอบอาการของคุณ ค้นพบสาเหตุที่เป็นไปได้ และรับคำแนะนำเกี่ยวกับขั้นตอนต่อไป
              </p>
              <Link 
                to="/checker" 
                className="btn-accent inline-flex items-center text-lg px-8 py-3"
              >
                <span>เริ่มการตรวจสอบอาการ</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                ไม่ใช่การทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญ
              </p>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">วิธีการทำงาน</h2>
            
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
              <h2 className="text-3xl font-bold mb-4">พร้อมที่จะตรวจสอบอาการของคุณหรือไม่?</h2>
              <p className="text-xl opacity-90 mb-8">
                ตัวตรวจสอบอาการของเราช่วยให้คุณเข้าใจสิ่งที่อาจเป็นสาเหตุของอาการของคุณ
                และให้คำแนะนำเกี่ยวกับสิ่งที่ควรทำต่อไป
              </p>
              <Link 
                to="/checker" 
                className="bg-white text-medical-blue hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 inline-flex items-center"
              >
                <span>เริ่มตอนนี้เลย</span>
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
                <h2 className="text-xl font-semibold mb-4 text-center">ข้อสงวนสิทธิ์ที่สำคัญ</h2>
                <p className="text-gray-600 mb-4">
                  SymptomSeeker ถูกออกแบบมาเพื่อให้ข้อมูลทั่วไปและคำแนะนำตามอาการที่คุณรายงาน
                  ไม่ได้มีวัตถุประสงค์เพื่อทดแทนคำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษาจากผู้เชี่ยวชาญ
                </p>
                <p className="text-gray-600">
                  ควรขอคำแนะนำจากแพทย์หรือผู้ให้บริการด้านสุขภาพที่มีคุณสมบัติเหมาะสมเสมอหากคุณมีคำถามเกี่ยวกับสภาพทางการแพทย์
                  อย่าละเลยคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญหรือชะลอการขอรับคำปรึกษาเนื่องจากสิ่งที่คุณอ่านบนเว็บไซต์นี้
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
