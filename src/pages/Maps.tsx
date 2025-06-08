import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationSearch from '../components/LocationSearch';
import { MapPin, Navigation, Hospital, Search } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom red icon for hospitals
const hospitalIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Hospital {
  name: string;
  lat: number;
  lng: number;
  distance?: number;
}

const Maps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, name: string} | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);

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
      const marker = L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
        .addTo(mapInstance.current!)
        .bindPopup(`<strong>${hospital.name}</strong><br>โรงพยาบาลในกรุงเทพฯ`);
      markersRef.current.push(marker);
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

          // Search for hospitals near current location
          searchNearbyHospitals(latitude, longitude);
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

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const searchNearbyHospitals = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="hospital"](around:30000,${lat},${lng});way["amenity"="hospital"](around:30000,${lat},${lng});relation["amenity"="hospital"](around:30000,${lat},${lng}););out center;`
      );
      const data = await response.json();
      
      const hospitals: Hospital[] = data.elements.map((element: any) => {
        const hospitalLat = element.lat || element.center?.lat;
        const hospitalLng = element.lon || element.center?.lon;
        const distance = calculateDistance(lat, lng, hospitalLat, hospitalLng);
        
        return {
          name: element.tags?.name || 'โรงพยาบาลไม่ระบุชื่อ',
          lat: hospitalLat,
          lng: hospitalLng,
          distance: distance
        };
      }).filter((hospital: Hospital) => hospital.distance <= 30);

      setNearbyHospitals(hospitals);
      
      // Clear existing hospital markers
      markersRef.current.forEach(marker => {
        mapInstance.current?.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new hospital markers
      hospitals.forEach(hospital => {
        const marker = L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
          .addTo(mapInstance.current!)
          .bindPopup(`<strong>${hospital.name}</strong><br>ระยะทาง: ${hospital.distance?.toFixed(1)} กม.`);
        markersRef.current.push(marker);
      });

    } catch (error) {
      console.error('Error searching hospitals:', error);
    }
  };

  const handleLocationSelect = (lat: number, lng: number, placeName: string) => {
    if (!mapInstance.current) return;

    // Set the selected location
    setSelectedLocation({ lat, lng, name: placeName });
    
    // Center map on selected location
    mapInstance.current.setView([lat, lng], 14);
    
    // Add marker for selected location
    L.marker([lat, lng])
      .addTo(mapInstance.current)
      .bindPopup(`<strong>ตำแหน่งที่เลือก</strong><br>${placeName}`)
      .openPopup();

    // Search for nearby hospitals
    searchNearbyHospitals(lat, lng);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-medical-light">
        <div className="container-custom py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-medical-dark">แผนที่สถานพยาบาล</h1>
                <p className="text-gray-600">ค้นหาสถานพยาบาลและคลินิกใกล้เคียง</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <LocationSearch onLocationSelect={handleLocationSelect} />
              </div>
            </div>

            {selectedLocation && (
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-medical-blue" />
                  <span className="font-medium text-medical-dark">ตำแหน่งที่เลือก</span>
                </div>
                <p className="text-gray-600 text-sm">{selectedLocation.name}</p>
                <p className="text-medical-blue text-sm mt-1">
                  พบโรงพยาบาล {nearbyHospitals.length} แห่ง ในรัศมี 30 กิโลเมตร
                </p>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 text-medical-blue">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">แผนที่โต้ตอบได้</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ค้นหาสถานที่และคลิกที่เครื่องหมายบนแผนที่เพื่อดูข้อมูลเพิ่มเติม
                </p>
              </div>
              
              <div className="relative">
                <div 
                  ref={mapRef} 
                  className="w-full h-[600px]"
                  style={{ zIndex: 1 }}
                />
                
                {/* Floating Current Location Button */}
                <button
                  onClick={centerToCurrentLocation}
                  className="absolute bottom-4 left-4 w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl z-[1000]"
                  title="ตำแหน่งปัจจุบัน"
                >
                  <Navigation className="h-5 w-5 text-medical-blue" />
                </button>
              </div>
            </div>

            {nearbyHospitals.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border mt-6">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2 text-medical-blue">
                    <Hospital className="h-5 w-5" />
                    <span className="font-medium">โรงพยาบาลใกล้เคียง</span>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {nearbyHospitals.slice(0, 10).map((hospital, index) => (
                    <div key={index} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-medical-dark">{hospital.name}</h4>
                          <p className="text-sm text-gray-600">ระยะทาง: {hospital.distance?.toFixed(1)} กิโลเมตร</p>
                        </div>
                        <button
                          onClick={() => {
                            mapInstance.current?.setView([hospital.lat, hospital.lng], 16);
                          }}
                          className="text-medical-blue hover:text-medical-dark text-sm"
                        >
                          ดูบนแผนที่
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">ค้นหาสถานที่</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  พิมพ์อย่างน้อย 3 ตัวอักษรเพื่อค้นหาสถานที่และแสดงโรงพยาบาลใกล้เคียง
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-teal rounded-full flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">ตำแหน่งปัจจุบัน</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  คลิกปุ่มวงกลมในมุมซ้ายล่างของแผนที่เพื่อหาโรงพยาบาลใกล้เคียงโดยอัตโนมัติ
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-medical-orange rounded-full flex items-center justify-center">
                    <Hospital className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark">โรงพยาบาลใกล้เคียง</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  แสดงโรงพยาบาลทั้งหมดในรัศมี 30 กิโลเมตรพร้อมระยะทาง
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
