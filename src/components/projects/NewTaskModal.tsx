import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface NewTaskModalProps {
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}

interface TaskFormData {
  name: string;
  projectId: string;
  projectName: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  description: string;
}

const priorityLevels = [
  { value: 'low', labelAr: 'منخفضة', labelEn: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', labelAr: 'متوسطة', labelEn: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', labelAr: 'عالية', labelEn: 'High', color: 'bg-red-100 text-red-800' }
];

export function NewTaskModal({ onClose, onSubmit }: NewTaskModalProps) {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    projectId: '',
    projectName: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    priority: 'medium',
    progress: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {currentLanguage === 'ar' ? 'مهمة جديدة' : 'New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'اسم المهمة' : 'Task Name'}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المشروع' : 'Project'}
            </label>
            <input
              type="text"
              required
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'المسؤول عن التنفيذ' : 'Assigned To'}
            </label>
            <input
              type="text"
              required
              value={formData.assignedTo}
              onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'تاريخ البداية' : 'Start Date'}
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'تاريخ النهاية' : 'End Date'}
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الأولوية' : 'Priority'}
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              {priorityLevels.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority: priority.value as TaskFormData['priority'] }))}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${formData.priority === priority.value
                      ? priority.color
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {currentLanguage === 'ar' ? priority.labelAr : priority.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'نسبة التقدم' : 'Progress'}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
              className="mt-1 block w-full"
            />
            <div className="mt-1 text-sm text-gray-500 text-center">
              {formData.progress}%
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {currentLanguage === 'ar' ? 'الوصف' : 'Description'}
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {currentLanguage === 'ar' ? 'إضافة المهمة' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}