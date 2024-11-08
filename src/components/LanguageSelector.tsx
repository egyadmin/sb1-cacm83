import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
    >
      <Globe className="h-5 w-5" />
      <span className="ml-2 text-sm font-medium hidden sm:inline">
        {currentLanguage === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}