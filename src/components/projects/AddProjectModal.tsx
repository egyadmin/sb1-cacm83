import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddProjectModalProps {
  onClose: () => void;
}

interface ProjectFormData {
  name: string;
  managerId: string;
  progress: number;
  status: 'active' | 'pending' | 'delayed' | 'completed';
  deliveryDate: string;
}

const initialFormData: ProjectFormData = {
  name: '',
  managerId: '',
  progress: 0,
  status: 'pending',
  deliveryDate: '',
};

// Sample managers data (replace with actual data from your API)
const managers = [
  { id: '1', name: 'أحمد محمد' },
  { id: '2', name: 'محمد علي' },
  { id: '3', name: 'خالد عبدالله' },
];

export function AddProjectModal({ onClose }: AddProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">إضافة مشروع جديد</h3>
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
              اسم المشروع
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              المدير المسؤول
            </label>
            <select
              name="managerId"
              required
              value={formData.managerId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">اختر المدير المسؤول</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              نسبة الإنجاز
            </label>
            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              required
              value={formData.progress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              الحالة
            </label>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="pending">معلق</option>
              <option value="active">نشط</option>
              <option value="delayed">متأخر</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              تاريخ التسليم
            </label>
            <input
              type="date"
              name="deliveryDate"
              required
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              إضافة المشروع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}