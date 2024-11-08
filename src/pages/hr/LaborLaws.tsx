import React from 'react';
import { Book, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export function LaborLaws() {
  const { currentLanguage } = useLanguageStore();

  const externalLinks = [
    {
      title: { ar: 'مكتب العمل', en: 'Labor Office' },
      description: { 
        ar: 'الأنظمة واللوائح وقوانين العمل',
        en: 'Labor laws and regulations'
      },
      url: 'https://www.mol.gov.sa'
    },
    {
      title: { ar: 'مُدد', en: 'Mudad' },
      description: {
        ar: 'احتساب مستحقات نهاية الخدمة',
        en: 'End of service calculator'
      },
      url: 'https://mudad.com.sa'
    },
    {
      title: { ar: 'مقيم', en: 'Muqeem' },
      description: {
        ar: 'خدمات الجوازات والإقامة',
        en: 'Passport and residence services'
      },
      url: 'https://muqeem.sa'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'الأنظمة واللوائح' : 'Labor Laws & Regulations'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'الوصول السريع للأنظمة والخدمات الحكومية'
              : 'Quick access to government services and regulations'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {externalLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  {currentLanguage === 'ar' ? link.title.ar : link.title.en}
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </h3>
                <p className="text-sm text-gray-500">
                  {currentLanguage === 'ar' ? link.description.ar : link.description.en}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Violation Notice Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'نموذج إشعار مخالفة' : 'Violation Notice Form'}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'اسم الموظف' : 'Employee Name'}
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الإدارة' : 'Department'}
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'نوع المخالفة' : 'Violation Type'}
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="attendance">
                {currentLanguage === 'ar' ? 'مخالفة حضور' : 'Attendance Violation'}
              </option>
              <option value="conduct">
                {currentLanguage === 'ar' ? 'مخالفة سلوك' : 'Conduct Violation'}
              </option>
              <option value="performance">
                {currentLanguage === 'ar' ? 'مخالفة أداء' : 'Performance Violation'}
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'تفاصيل المخالفة' : 'Violation Details'}
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentLanguage === 'ar' ? 'إصدار الإشعار' : 'Issue Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}