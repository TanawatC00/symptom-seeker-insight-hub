
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Navigation } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Maps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView([13.7563, 100.5018], 10); // Bangkok coordinates

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add a marker for Bangkok
    const bangkokMarker = L.marker([13.7563, 100.5018])
      .addTo(mapInstance.current)
      .bindPopup('กรุงเทพมหานคร<br>Bangkok, Thailand')
      .openPopup();

    // Add some sample markers for hospitals
    const hospitals = [
      { name: 'โรงพยาบาลจุฬาลงกรณ์', lat: 13.7326, lng: 100.5262 },
      { name: 'โรงพยาบาลศิริราช', lat: 13.7581, lng: 100.4797 },
      { name: 'โรงพยาบาลรามาธิบดี', lat: 13.7596, lng: 100.5296 },
      { name: 'โรงพยาบาลเวชศาสตร์เขตร้อน', lat: 13.7297, lng: 100.5215 }
    ];

    hospitals.forEach(hospital => {
      L.marker([hospital.lat, hospital.lng])
        .addTo(mapInstance.current!)
        .bindPopup(`<strong>${hospital.name}</strong><br>โรงพยาบาลในกรุงเทพฯ`);
    });

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const centerToCurrentLocation = () => {
    if (!mapInstance.current) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.current!.setView([latitude, longitude], 15);
          
          L.marker([latitude, longitude])
            .addTo(mapInstance.current!)
            .bindPopup('ตำแหน่งปัจจุบันของคุณ')
            .openPopup();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('ไม่สามารถหาตำแหน่งปัจจุบันได้');
        }
      );
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับการหาตำแหน่ง');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-medical-light">
        <div className="container-custom py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-medical-dark">แผนที่สถานพยาบาล</h1>
                <p className="text-gray-600">ค้นหาสถานพยาบาลและคลินิกใกล้เคียง</p>
              </div>
              <button
                onClick={centerToCurrentLocation}
                className="flex items-center gap-2 btn-primary"
              >
                <Navigation className="h-4 w-4" />
                ตำแหน่งปัจจุบัน
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 text-medical-blue">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">แผนที่โต้ตอบได้</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  คลิกที่เครื่องหมายบนแผนที่เพื่อดูข้อมูลเพิ่มเติม
                </p>
              </div>
              
              <div className="relative">
                <div 
                  ref={mapRef} 
                  className="w-full h-[600px]"
                  style={{ zIndex: 1 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">ค้นหาสถานพยาบาล</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  ใช้แผนที่เพื่อค้นหาสถานพยาบาลและคลินิกในพื้นที่ของคุณ
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-teal rounded-full flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">นำทางไปยังที่ตั้ง</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  คลิกที่ปุ่ม "ตำแหน่งปัจจุบัน" เพื่อหาสถานพยาบาลใกล้เคียง
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-orange rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">ข้อมูลรายละเอียด</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  คลิกที่เครื่องหมายบนแผนที่เพื่อดูข้อมูลของสถานพยาบาล
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Maps;
