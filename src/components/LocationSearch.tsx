
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lng: number, placeName: string) => void;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const searchLocation = async (query: string) => {
    // Require at least 3 characters for search
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      // Enhanced search with Thai language support
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&countrycodes=th&addressdetails=1&accept-language=th,en&namedetails=1&extratags=1`
      );
      const data = await response.json();
      
      // Filter and sort results to prioritize Thai locations
      const filteredResults = data.filter((result: SearchResult) => {
        return result.display_name && result.lat && result.lon;
      });

      setSuggestions(filteredResults);
      setShowSuggestions(filteredResults.length > 0);
      
      console.log(`Found ${filteredResults.length} location suggestions for: "${query}"`);
    } catch (error) {
      console.error('Error searching location:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce search with 500ms delay for better performance
    debounceTimeoutRef.current = setTimeout(() => {
      searchLocation(searchQuery);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Show loading state immediately if we have 3+ characters
    if (value.length >= 3) {
      setIsLoading(true);
    }
  };

  const handleLocationSelect = (suggestion: SearchResult) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    setSearchQuery(suggestion.display_name);
    setShowSuggestions(false);
    onLocationSelect(lat, lng, suggestion.display_name);
    
    console.log(`Selected location: ${suggestion.display_name} (${lat}, ${lng})`);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && searchQuery.length >= 3) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="ค้นหาสถานที่ในประเทศไทย..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-4 bg-white border-gray-300 focus:border-medical-blue focus:ring-medical-blue"
        />
      </div>

      {/* Show minimum character requirement hint */}
      {searchQuery.length > 0 && searchQuery.length < 3 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-center">
          <span className="text-sm text-gray-500">
            พิมพ์อย่างน้อย 3 ตัวอักษรเพื่อค้นหาสถานที่
          </span>
        </div>
      )}

      {/* Loading state */}
      {isLoading && searchQuery.length >= 3 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-medical-blue"></div>
            <span className="text-sm text-gray-500">กำลังค้นหาสถานที่...</span>
          </div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-auto">
          <div className="p-2 border-b border-gray-100">
            <span className="text-xs text-gray-500">
              พบ {suggestions.length} สถานที่ที่เกี่ยวข้อง
            </span>
          </div>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={() => handleLocationSelect(suggestion)}
            >
              <MapPin className="h-4 w-4 text-medical-blue flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-900 line-clamp-2 leading-relaxed">
                  {suggestion.display_name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && suggestions.length === 0 && !isLoading && searchQuery.length >= 3 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">ไม่พบสถานที่ที่ตรงกับ "{searchQuery}"</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            ลองค้นหาด้วยคำอื่นหรือตรวจสอบการสะกดอีกครั้ง
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
