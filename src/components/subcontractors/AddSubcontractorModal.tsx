import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface AddSubcontractorModalProps {
  onClose: () => void;
}

interface TaskData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  value: number;
}

interface ContractFormData {
  companyName: string;
  companyNameEn: string;
  contractNumber: string;
  projectName: string;
  contractValue: number;
  startDate: string;
  endDate: string;
  tasks: TaskData[];
}

const initialTaskData: TaskData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  value: 0,
};

const initialFormData: ContractFormData = {
  companyName: '',
  companyNameEn: '',
  contractNumber: '',
  projectName: '',
  contractValue: 0,
  startDate: '',
  endDate: '',
  tasks: [{ ...initialTaskData }],
};

export function AddSubcontractorModal({ onClose }: AddSubcontractorModalProps) {
  const [formData, setFormData] = useState<ContractFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTaskChange = (index: number, field: keyof TaskData, value: string | number) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = {
      ...newTasks[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      tasks: newTasks
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { ...initialTaskData }]
    }));
  };

  const removeTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">إضافة مقاول باطن جديد</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                اسم الشركة (عربي)
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name (English)
              </label>
              <input
                type="text"
                name="companyNameEn"
                required
                value={formData.companyNameEn}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                رقم العقد
              </label>
              <input
                type="text"
                name="contractNumber"
                required
                value={formData.contractNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                اسم المشروع
              </label>
              <input
                type="text"
                name="projectName"
                required
                value={formData.projectName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                قيمة العقد
              </label>
              <input
                type="number"
                name="contractValue"
                required
                min="0"
                value={formData.contractValue}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                تاريخ البداية
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                تاريخ النهاية
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900">المهام والأعمال</h4>
              <button
                type="button"
                onClick={addTask}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة مهمة
              </button>
            </div>

            {formData.tasks.map((task, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium text-gray-900">مهمة {index + 1}</h5>
                  {formData.tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      اسم المهمة
                    </label>
                    <input
                      type="text"
                      required
                      value={task.name}
                      onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      القيمة
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={task.value}
                      onChange={(e) => handleTaskChange(index, 'value', parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      الوصف
                    </label>
                    <textarea
                      required
                      value={task.description}
                      onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      تاريخ البداية
                    </label>
                    <input
                      type="date"
                      required
                      value={task.startDate}
                      onChange={(e) => handleTaskChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      تاريخ النهاية
                    </label>
                    <input
                      type="date"
                      required
                      value={task.endDate}
                      onChange={(e) => handleTaskChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
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
              إضافة المقاول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}