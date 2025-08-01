"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const DoctorCard = ({ doctor }) => {
  const doctorImages = [
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop"
  ];
  
  const imageUrl = doctorImages[doctor.id % doctorImages.length];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-start transition-transform hover:scale-[1.02]">
      <div className="w-full md:w-48 h-48 flex-shrink-0 relative">
        <Image
          src={imageUrl}
          alt={`${doctor.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
            <p className="text-blue-600 font-semibold text-lg mb-1">{doctor.speciality}</p>
            <p className="text-gray-600 mb-1">
              <strong>Clinic:</strong> {doctor.address.clinic}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {doctor.address.location}, {doctor.address.city}, {doctor.address.state}
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center justify-end mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600">({doctor.patientStories})</span>
            </div>
            <p className="text-gray-800 font-bold text-xl mb-2">₹{doctor.consultationFee}</p>
            <a
              href={`tel:${doctor.contact}`}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Book Clinic Visit</span>
            </a>
            <p className={`text-sm font-medium px-2 py-1 rounded-full ${
              doctor.availability.today ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {doctor.availability.today ? 
                `Available Today (${doctor.availability.timings})` : 
                `Next Available: ${doctor.availability.nextAvailable}`
              }
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 mb-1"><strong>Experience:</strong> {doctor.experience}</p>
          <p className="text-gray-600 mb-1">
            <strong>Patient Stories:</strong> {doctor.patientStories} successful customers
          </p>
          {doctor.additionalClinics && (
            <p className="text-gray-600">
              <strong>Additional Clinics:</strong> {doctor.additionalClinics.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function SearchContent() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const stateQuery = searchParams.get('state') || '';
  const specialtyQuery = searchParams.get('query') || '';

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch('/doctors.json');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        
        const allDoctors = await response.json();
        
        if (!Array.isArray(allDoctors)) {
          throw new Error('Invalid data format: expected array');
        }

        const filteredDoctors = allDoctors.filter(doctor => {
          const doctorState = (doctor.address?.state || '').toString().toLowerCase().trim();
          const searchState = stateQuery.toLowerCase().trim();
          
          const doctorSpeciality = (doctor.speciality || '').toString().toLowerCase().trim();
          const searchSpeciality = specialtyQuery.toLowerCase().trim();
          
          const stateMatch = !stateQuery || doctorState.includes(searchState);
          const specialityMatch = !specialtyQuery || 
            doctorSpeciality.includes(searchSpeciality) ||
            (doctor.focusArea || '').toString().toLowerCase().includes(searchSpeciality);
            
          return stateMatch && specialityMatch;
        });
        
        setSearchResults(filteredDoctors);
      } catch (error) {
        console.error('Error loading doctors:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, [stateQuery, specialtyQuery]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800">
            {searchResults.length > 0 ? (
              <>
                Found <span className="text-blue-600">{searchResults.length}</span> doctors for
                <span className="font-bold text-blue-600"> {specialtyQuery || 'all specialties'}</span>
                {stateQuery && (
                  <> in <span className="font-bold text-blue-600">{stateQuery}</span></>
                )}
              </>
            ) : (
              <>No doctors found matching your criteria</>
            )}
          </h2>
          <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
            ← Back to home
          </Link>
        </div>
        
        {/* Filter Bar - UI Only */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Gender Filter */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                id="gender"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Experience Filter */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select
                id="experience"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="all">All Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-20">10-20 years</option>
                <option value="20-">20+ years</option>
              </select>
            </div>
            
            {/* Patient Stories Filter */}
            <div>
              <label htmlFor="patientStories" className="block text-sm font-medium text-gray-700 mb-1">Patient Stories</label>
              <select
                id="patientStories"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="all">All Ratings</option>
                <option value="100">100+</option>
                <option value="500">500+</option>
                <option value="1000">1000+</option>
              </select>
            </div>
            
            {/* Sort By Filter */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="default">Default</option>
                <option value="experience-high">Experience (High to Low)</option>
                <option value="experience-low">Experience (Low to High)</option>
                <option value="rating-high">Rating (High to Low)</option>
                <option value="rating-low">Rating (Low to High)</option>
                <option value="fee-high">Fee (High to Low)</option>
                <option value="fee-low">Fee (Low to High)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
              <p className="text-gray-500 mt-2">
                We couldn't find any {specialtyQuery} specialists in {stateQuery || 'your selected location'}.
              </p>
              <Link 
                href="/" 
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try a new search
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-2 text-gray-600">Searching for doctors...</p>
    </div>
  </div>
);

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  );
}