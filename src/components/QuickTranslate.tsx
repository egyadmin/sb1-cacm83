import React, { useState } from 'react';
import { Languages, X } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

export function QuickTranslate() {
  const { currentLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      // Simulate translation API call
      const translated = text.split('').reverse().join('');
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title={currentLanguage === 'ar' ? 'ترجمة سريعة' : 'Quick Translate'}
      >
        <Languages className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {currentLanguage === 'ar' ? 'ترجمة سريعة' : 'Quick Translate'}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={currentLanguage === 'ar' ? 'أدخل النص للترجمة...' : 'Enter text to translate...'}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={!text}
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentLanguage === 'ar' ? 'ترجمة' : 'Translate'}
        </button>

        {translatedText && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'النص المترجم' : 'Translated Text'}
            </label>
            <div className="p-3 bg-gray-50 rounded-md text-sm">
              {translatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}