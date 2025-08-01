"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);

  const services = [
    { name: 'Consult a Doctor', icon: '👨‍⚕️' },
    { name: 'Order Machines', icon: '🩺' },
    { name: 'View Medical Records', icon: '📋' },
    { name: 'Book Test', icon: '🧪' },
  ];

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('/doctors.json');
        const doctors = await response.json();
        
        const uniqueStates = [...new Set(doctors.map(doctor => doctor.address.state))]
          .map((state, index) => ({
            id: index + 1,
            name: state
          }));
        
        setStates(uniqueStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    
    fetchStates();
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedState || !searchQuery) return;
    
    const params = new URLSearchParams();
    if (selectedState) params.set('state', selectedState);
    if (searchQuery) params.set('query', searchQuery);
    
    router.push(`/search?${params.toString()}`);
  };

  if (loadingStates) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading states...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDE1LWJnLTExLmpwZw.jpg"
          alt="Healthcare background"
          fill
          className="opacity-50 object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl px-4 py-40 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Your Health <span className="text-blue-400">Matters</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10">
          Find and book appointments with top healthcare providers in India
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative flex-shrink-0 w-full sm:w-auto">
            <select
              className="appearance-none bg-gray-100 text-gray-700 py-3 px-6 pr-10 border-r border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 w-full h-full"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-grow">
            <input
              type="text"
              placeholder="Search specialists (e.g., Dermatologist, Cardiologist)"
              className="flex-grow py-3 px-6 border-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 transition-colors duration-200 flex items-center justify-center"
            >
              <span className="hidden sm:inline mr-2">Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="relative z-10 w-full mt-auto">
         <div className="flex justify-center items-center px-4 sm:px-8 py-6 bg-gray-800/90 backdrop-blur-sm">
           <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
             {services.map((service, index) => (
               <div key={service.name} className="flex flex-col items-center px-2 sm:px-4 py-3 group cursor-pointer">
                 <div className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                   {service.icon}
                 </div>
                 <div className="text-sm font-medium text-white group-hover:text-blue-600 transition-colors">
                   {service.name}
                 </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
};

export default HeroSection;