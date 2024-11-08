import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useMaintenanceStore } from '../store/useMaintenanceStore';

export function MaintenanceBanner() {
  const { isMaintenanceMode, maintenanceMessage, plannedEndTime } = useMaintenanceStore();

  if (!isMaintenanceMode) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 mt-0 lg:mt-0">
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-800" aria-hidden="true" />
              </span>
              <div className="ml-3 font-medium text-yellow-800">
                <span className="block text-sm">{maintenanceMessage}</span>
                {plannedEndTime && (
                  <span className="block text-sm mt-1">
                    Expected completion: {plannedEndTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}