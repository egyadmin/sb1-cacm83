import React, { useState } from 'react';
import { X, UserPlus, Building2, MapPin } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useBranchStore } from '../../store/useBranchStore';
import { useApprovalWorkflow } from '../../hooks/useApprovalWorkflow';

interface UserRegistrationModalProps {
  onClose: () => void;
}

export function UserRegistrationModal({ onClose }: UserRegistrationModalProps) {
  const { currentLanguage } = useLanguageStore();
  const { branches } = useBranchStore();
  const { requestApproval } = useApprovalWorkflow();

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    email: '',
    employeeId: '',
    iqamaNumber: '',
    jobTitle: '',
    jobTitleEn: '',
    department: '',
    departmentEn: '',
    branchId: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    directManager: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = currentLanguage === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    if (!formData.email) newErrors.email = currentLanguage === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    if (!formData.employeeId) newErrors.employeeId = currentLanguage === 'ar' ? 'الرقم الوظيفي مطلوب' : 'Employee ID is required';
    if (!formData.iqamaNumber) newErrors.iqamaNumber = currentLanguage === 'ar' ? 'رقم الإقامة مطلوب' : 'Iqama number is required';
    if (!formData.password) newErrors.password = currentLanguage === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match';
    }
    if (!formData.mobileNumber) newErrors.mobileNumber = currentLanguage === 'ar' ? 'رقم الجوال مطلوب' : 'Mobile number is required';
    if (!formData.directManager) newErrors.directManager = currentLanguage === 'ar' ? 'المدير المباشر مطلوب' : 'Direct manager is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await requestApproval('user_registration', {
        ...formData,
        type: 'user_registration',
        approvalFlow: [
          { level: 1, role: 'direct_manager', status: 'pending' },
          { level: 2, role: 'housing_manager', status: 'pending' },
          { level: 3, role: 'regional_manager', status: 'pending' }
        ]
      });

      onClose();
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              {currentLanguage === 'ar' ? 'تسجيل مستخدم جديد' : 'New User Registration'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'رقم الجوال' : 'Mobile Number'}
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.mobileNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.employeeId ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'رقم الإقامة' : 'Iqama Number'}
              </label>
              <input
                type="text"
                value={formData.iqamaNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, iqamaNumber: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.iqamaNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.iqamaNumber && <p className="mt-1 text-sm text-red-600">{errors.iqamaNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'المسمى الوظيفي (عربي)' : 'Job Title (Arabic)'}
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'المسمى الوظيفي (إنجليزي)' : 'Job Title (English)'}
              </label>
              <input
                type="text"
                value={formData.jobTitleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitleEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'القسم (عربي)' : 'Department (Arabic)'}
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'القسم (إنجليزي)' : 'Department (English)'}
              </label>
              <input
                type="text"
                value={formData.departmentEn}
                onChange={(e) => setFormData(prev => ({ ...prev, departmentEn: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'الفرع' : 'Branch'}
              </label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData(prev => ({ ...prev, branchId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">
                  {currentLanguage === 'ar' ? 'اختر الفرع' : 'Select Branch'}
                </option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {currentLanguage === 'ar' ? branch.name : branch.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'المدير المباشر' : 'Direct Manager'}
              </label>
              <input
                type="text"
                value={formData.directManager}
                onChange={(e) => setFormData(prev => ({ ...prev, directManager: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.directManager ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.directManager && <p className="mt-1 text-sm text-red-600">{errors.directManager}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Approval Flow Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {currentLanguage === 'ar' ? 'مسار الموافقات' : 'Approval Flow'}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-800 text-xs">1</span>
                </div>
                <span className="text-sm text-gray-600">
                  {currentLanguage === 'ar' ? 'المدير المباشر' : 'Direct Manager'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 text-xs">2</span>
                </div>
                <span className="text-sm text-gray-600">
                  {currentLanguage === 'ar' ? 'مدير قسم الإسكان' : 'Housing Department Manager'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-xs">3</span>
                </div>
                <span className="text-sm text-gray-600">
                  {currentLanguage === 'ar' ? 'مدير المنطقة' : 'Regional Manager'}
                </span>
              </div>
            </div>
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
              {currentLanguage === 'ar' ? 'تقديم الطلب' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}