import React, { useState } from 'react';
import { ClipboardCheck, Search, Filter, Download, Plus } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { TaskChart } from '../../components/projects/TaskChart';

const sampleTaskData = [
  { status: 'completed', count: 12 },
  { status: 'inProgress', count: 8 },
  { status: 'pending', count: 5 },
  { status: 'delayed', count: 3 }
];

export function ProjectTasks() {
  const { currentLanguage } = useLanguageStore();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'المهام والأعمال' : 'Tasks and Activities'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'متابعة مهام ومراحل المشاريع'
              : 'Track project tasks and phases'
            }
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'مهمة جديدة' : 'New Task'}
        </button>
      </div>

      {/* Task Statistics Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'إحصائيات المهام' : 'Task Statistics'}
        </h2>
        <TaskChart data={sampleTaskData} />
      </div>

      {/* Tasks List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المهمة' : 'Task'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المشروع' : 'Project'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'المسؤول' : 'Assignee'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'تاريخ التسليم' : 'Due Date'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample task row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {currentLanguage === 'ar' ? 'تركيب الأبواب' : 'Door Installation'}
                    </div>
                    <div className="text-sm text-gray-500">TSK-2024-001</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'تطوير المجمع السكني' : 'Housing Complex Development'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currentLanguage === 'ar' ? 'محمد علي' : 'Mohammed Ali'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {currentLanguage === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024/04/15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      {currentLanguage === 'ar' ? 'تحديث الحالة' : 'Update Status'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}