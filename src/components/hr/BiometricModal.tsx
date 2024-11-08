import React, { useState, useEffect } from 'react';
import { X, Fingerprint, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface BiometricModalProps {
  action: 'check-in' | 'check-out';
  onClose: () => void;
}

export function BiometricModal({ action, onClose }: BiometricModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [status, setStatus] = useState<'waiting' | 'scanning' | 'success' | 'error'>('waiting');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status === 'waiting') {
      // Simulate starting the scan
      setStatus('scanning');
      setTimeout(() => {
        // Simulate successful scan
        setStatus('success');
        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 2000);
      }, 3000);
    }
  }, [status, onClose]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar'
              ? action === 'check-in' ? 'تسجيل حضور' : 'تسجيل انصراف'
              : action === 'check-in' ? 'Check In' : 'Check Out'
            }
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          {status === 'waiting' && (
            <div className="text-center">
              <Fingerprint className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">
                {currentLanguage === 'ar'
                  ? 'جاري تهيئة جهاز البصمة...'
                  : 'Initializing biometric device...'
                }
              </p>
            </div>
          )}

          {status === 'scanning' && (
            <div className="text-center">
              <Fingerprint className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600">
                {currentLanguage === 'ar'
                  ? 'يرجى وضع إصبعك على جهاز البصمة'
                  : 'Please place your finger on the scanner'
                }
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <p className="text-green-600 font-medium">
                {currentLanguage === 'ar'
                  ? 'تم تسجيل البصمة بنجاح'
                  : 'Successfully recorded'
                }
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date().toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US')}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <Fingerprint className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <p className="text-red-600 font-medium">
                {currentLanguage === 'ar'
                  ? 'حدث خطأ أثناء تسجيل البصمة'
                  : 'Error recording biometric data'
                }
              </p>
              <p className="text-sm text-gray-500 mt-2">{errorMessage}</p>
              <button
                onClick={() => setStatus('waiting')}
                className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {currentLanguage === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}