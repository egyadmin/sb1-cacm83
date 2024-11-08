import React, { useState, useEffect } from 'react';
import { Fingerprint, Check, X, AlertTriangle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface BiometricVerificationProps {
  onSuccess: () => void;
  onError: () => void;
}

export function BiometricVerification({ onSuccess, onError }: BiometricVerificationProps) {
  const { currentLanguage } = useLanguageStore();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const simulateFingerprint = () => {
    setStatus('scanning');
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate simulation
      setStatus(isSuccess ? 'success' : 'error');
      
      if (isSuccess) {
        onSuccess();
      } else {
        onError();
      }
    }, 2000);
  };

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  const getStatusColor = () => {
    switch (status) {
      case 'scanning':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'scanning':
        return <Fingerprint className="h-8 w-8 animate-pulse" />;
      case 'success':
        return <Check className="h-8 w-8" />;
      case 'error':
        return <X className="h-8 w-8" />;
      default:
        return <Fingerprint className="h-8 w-8" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'scanning':
        return currentLanguage === 'ar' ? 'جاري المسح...' : 'Scanning...';
      case 'success':
        return currentLanguage === 'ar' ? 'تم التحقق بنجاح' : 'Verification successful';
      case 'error':
        return currentLanguage === 'ar' ? 'فشل التحقق' : 'Verification failed';
      default:
        return currentLanguage === 'ar' ? 'انقر للتحقق' : 'Click to verify';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={simulateFingerprint}
        disabled={status !== 'idle'}
        className={`p-6 rounded-full transition-colors ${getStatusColor()} hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {getStatusIcon()}
      </button>
      <p className="text-sm font-medium text-gray-700">{getStatusMessage()}</p>
      
      {status === 'error' && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>
            {currentLanguage === 'ar' 
              ? 'يرجى المحاولة مرة أخرى'
              : 'Please try again'
            }
          </span>
        </div>
      )}
    </div>
  );
}