
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Plus, Minus, Navigation, ExternalLink, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationSearch from '../components/LocationSearch';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface Facility {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  distance?: string;
}

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

const facilityData: Facility[] = [
  {
    id: 'hospital-001',
    name: 'โรงพยาบาล A',
    address: '123 ถนน Main, เมือง',
    latitude: 13.7563,
    longitude: 100.5018,
    type: 'โรงพยาบาล'
  },
  {
    id: 'clinic-001',
    name: 'คลินิก B',
    address: '456 ถนน รอง, เมือง',
    latitude: 13.7527,
    longitude: 100.4939,
    type: 'คลินิก'
  },
  {
    id: 'healthcenter-001',
    name: 'ศูนย์สุขภาพ C',
    address: '789 ถนน สาม, เมือง',
    latitude: 13.7469,
    longitude: 100.5062,
    type: 'ศูนย์สุขภาพ'
  },
];

const Maps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [nearbyFacilities, setNearbyFacilities] = useState<Facility[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize Leaflet map
    map.current = L.map(mapRef.current, {
      center: [13.7563, 100.5018], // Default to Bangkok
      zoom: 12,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ name: 'ตำแหน่งของคุณ', latitude, longitude });
          map.current?.setView([latitude, longitude], 15);

          L.marker([latitude, longitude]).addTo(map.current!)
            .bindPopup('คุณอยู่ที่นี่').openPopup();
        },
        () => {
          console.log('User denied geolocation.');
        }
      );
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.scrollWheelZoom.enable();
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    if (selectedLocation) {
      map.current?.setView([selectedLocation.latitude, selectedLocation.longitude], 15);

      // Add marker for selected location
      L.marker([selectedLocation.latitude, selectedLocation.longitude]).addTo(map.current!)
        .bindPopup(selectedLocation.name).openPopup();

      // Find nearby facilities
      const nearby = facilityData.map(facility => ({
        ...facility,
        distance: calculateDistance(
          selectedLocation.latitude,
          selectedLocation.longitude,
          facility.latitude,
          facility.longitude
        )
      })).sort((a, b) => Number(a.distance) - Number(b.distance));

      setNearbyFacilities(nearby);
    }
  }, [selectedLocation]);

  const handleLocationSelect = (lat: number, lng: number, placeName: string) => {
    const location: Location = {
      name: placeName,
      latitude: lat,
      longitude: lng
    };
    setSelectedLocation(location);
  };

  const openInGoogleMaps = (facility: Facility) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${facility.name}+${facility.address}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column - Search and Facilities */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-medical-blue" />
                  <h1 className="text-2xl font-bold text-medical-dark">{t('maps.title')}</h1>
                </div>
                <p className="text-gray-600">{t('maps.subtitle')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-medical-dark">
                  {t('maps.nearbyFacilities')}{selectedLocation && ` - ${selectedLocation.name}`}
                </h2>
                <LocationSearch onLocationSelect={handleLocationSelect} />
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {nearbyFacilities.length > 0 ? (
                  <div className="divide-y">
                    {nearbyFacilities.map((facility, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-medical-dark mb-1">{facility.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{t('maps.type')}: {facility.type}</span>
                              <span>{t('maps.distance')}: {facility.distance}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                            onClick={() => openInGoogleMaps(facility)}
                          >
                            <ExternalLink className="h-3 w-3" />
                            {t('maps.viewOnMap')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>{t('maps.selectLocation')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Interactive Map */}
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-medical-dark">{t('maps.interactiveMap')}</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (map.current && userLocation) {
                          map.current.setView([userLocation.latitude, userLocation.longitude], 15);
                        }
                      }}
                      className="flex items-center gap-1"
                    >
                      <Navigation className="h-4 w-4" />
                      {t('maps.myLocation')}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div ref={mapRef} className="h-96 w-full" />
                
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-white shadow-md"
                    onClick={() => map.current?.zoomIn()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-white shadow-md"
                    onClick={() => map.current?.zoomOut()}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
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
