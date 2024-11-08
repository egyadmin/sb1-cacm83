import React from 'react';
import { WrenchIcon, AlertTriangle, Save, Users } from 'lucide-react';
import { useMaintenanceStore } from '../store/useMaintenanceStore';
import { useAuthStore } from '../store/useAuthStore';

export function Settings() {
  const {
    isMaintenanceMode,
    maintenanceMessage,
    plannedEndTime,
    toggleMaintenance,
    updateMessage,
    updateEndTime,
  } = useMaintenanceStore();

  const {
    pendingUsers,
    approveUser,
    rejectUser,
    currentUser
  } = useAuthStore();

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Only administrators can access this page
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">Manage system settings and maintenance</p>
      </div>

      {/* User Approvals */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              Pending User Approvals
            </div>
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending user approvals</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => approveUser(user.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            <div className="flex items-center gap-2">
              <WrenchIcon className="h-5 w-5 text-gray-400" />
              Maintenance Mode
            </div>
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isMaintenanceMode}
                onChange={(e) => toggleMaintenance(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Enable Maintenance Mode
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Maintenance Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={maintenanceMessage}
                onChange={(e) => updateMessage(e.target.value)}
                placeholder="Enter maintenance message..."
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                Planned End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={plannedEndTime || ''}
                onChange={(e) => updateEndTime(e.target.value || null)}
              />
            </div>
          </div>

          {isMaintenanceMode && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Maintenance Mode Active</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      The system is currently in maintenance mode. Only administrators can access the system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}