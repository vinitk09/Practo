'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const corporateItems = [
    { name: 'Health Plans', href: '/corporate/health-plans' },
    { name: 'Employee Wellness', href: '/corporate/wellness' },
    { name: 'Enterprise Solutions', href: '/corporate/solutions' }
  ];

  const providerItems = [
    { name: 'For Doctors', href: '/providers/doctors' },
    { name: 'For Clinics', href: '/providers/clinics' },
    { name: 'Partner With Us', href: '/providers/partnership' }
  ];

  const securityItems = [
    { name: 'Help Center', href: '/help-center' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Security', href: '/security' }
  ];

  return (
    <nav className='bg-white shadow-md relative z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Left side - Logo and main links */}
          <div className='flex items-center space-x-4 md:space-x-8'>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  alt="logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            {/* Main navigation links - hidden on mobile, shown on md+ */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/doctors" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Find Doctors
              </Link>
              <Link 
                href="/video-consult" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Video Consult
              </Link>
              <Link 
                href="/surgeries" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Surgeries
              </Link>
            </div>
          </div>

          {/* Right side - Secondary links with dropdowns and button */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Corporate Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('corporate')}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                For Corporate
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === 'corporate' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openDropdown === 'corporate' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {corporateItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Providers Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('providers')}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                For Providers
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === 'providers' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openDropdown === 'providers' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {providerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Security/Help Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('security')}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                Security/Help
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === 'security' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openDropdown === 'security' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {securityItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/login" 
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200'
            >
              Login/Signup
            </Link>
          </div>

          {/* Mobile menu button - shown on mobile, hidden on md+ */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shown when isOpen is true */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/doctors" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Find Doctors
          </Link>
          <Link 
            href="/video-consult" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Video Consult
          </Link>
          <Link 
            href="/surgeries" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Surgeries
          </Link>

          {/* Mobile Dropdown - Corporate */}
          <div>
            <button 
              onClick={() => toggleDropdown('corporate-mobile')}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex justify-between items-center"
            >
              For Corporate
              <svg 
                className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'corporate-mobile' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'corporate-mobile' && (
              <div className="pl-4">
                {corporateItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Dropdown - Providers */}
          <div>
            <button 
              onClick={() => toggleDropdown('providers-mobile')}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex justify-between items-center"
            >
              For Providers
              <svg 
                className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'providers-mobile' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'providers-mobile' && (
              <div className="pl-4">
                {providerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Dropdown - Security/Help */}
          <div>
            <button 
              onClick={() => toggleDropdown('security-mobile')}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex justify-between items-center"
            >
              Security/Help
              <svg 
                className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'security-mobile' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'security-mobile' && (
              <div className="pl-4">
                {securityItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/login" 
            className='w-full text-left block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50'
            onClick={() => setIsOpen(false)}
          >
            Login/Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;