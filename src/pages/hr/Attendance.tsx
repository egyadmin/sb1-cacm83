import React, { useState } from 'react';
import { Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { BiometricVerification } from '../../components/attendance/BiometricVerification';

export function Attendance() {
  const { currentLanguage } = useLanguageStore();
  const [lastAction, setLastAction] = useState<'check-in' | 'check-out' | null>(null);
  const [showBiometric, setShowBiometric] = useState(false);
  const [actionType, setActionType] = useState<'check-in' | 'check-out'>('check-in');

  const handleAttendanceAction = (type: 'check-in' | 'check-out') => {
    setActionType(type);
    setShowBiometric(true);
  };

  const handleVerificationSuccess = () => {
    setLastAction(actionType);
    setShowBiometric(false);
  };

  const handleVerificationError = () => {
    setShowBiometric(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'الحضور والانصراف' : 'Attendance'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'تسجيل الحضور والانصراف اليومي'
              : 'Record daily attendance and departure'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'الوقت الحالي' : 'Current Time'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {new Date().toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US')}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowUpRight className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'وقت الحضور' : 'Check-in Time'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {lastAction === 'check-in' 
                      ? new Date().toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US')
                      : '-'
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowDownRight className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'وقت الانصراف' : 'Check-out Time'}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {lastAction === 'check-out'
                      ? new Date().toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US')
                      : '-'
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {showBiometric ? (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentLanguage === 'ar'
                ? actionType === 'check-in' ? 'تسجيل الحضور' : 'تسجيل الانصراف'
                : actionType === 'check-in' ? 'Check-in' : 'Check-out'
              }
            </h3>
            <BiometricVerification
              onSuccess={handleVerificationSuccess}
              onError={handleVerificationError}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full max-w-md">
              <button
                onClick={() => handleAttendanceAction('check-in')}
                disabled={lastAction === 'check-in'}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpRight className="h-5 w-5 mr-2" />
                {currentLanguage === 'ar' ? 'تسجيل الحضور' : 'Check-in'}
              </button>
              
              <button
                onClick={() => handleAttendanceAction('check-out')}
                disabled={lastAction === 'check-out' || !lastAction}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowDownRight className="h-5 w-5 mr-2" />
                {currentLanguage === 'ar' ? 'تسجيل الانصراف' : 'Check-out'}
              </button>
            </div>

            {!lastAction && (
              <div className="flex items-center text-yellow-600 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>
                  {currentLanguage === 'ar'
                    ? 'يرجى تسجيل الحضور أولاً'
                    : 'Please check-in first'
                  }
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}