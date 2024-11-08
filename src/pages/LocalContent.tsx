import React, { useState } from 'react';
import { Calculator, Download, Upload, FileText, BarChart2, DollarSign, Users, Building2 } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface LocalContentFormData {
  contractValue: number;
  localPurchases: number;
  localManpower: number;
  localServices: number;
  localMaterials: number;
  trainingBudget: number;
  saudiEmployees: number;
  totalEmployees: number;
  localSuppliers: number;
  totalSuppliers: number;
}

export function LocalContent() {
  const { currentLanguage } = useLanguageStore();
  const [formData, setFormData] = useState<LocalContentFormData>({
    contractValue: 0,
    localPurchases: 0,
    localManpower: 0,
    localServices: 0,
    localMaterials: 0,
    trainingBudget: 0,
    saudiEmployees: 0,
    totalEmployees: 0,
    localSuppliers: 0,
    totalSuppliers: 0
  });

  const calculateLocalContent = () => {
    // Calculate spending weights
    const spendingWeight = 0.4;
    const manpowerWeight = 0.4;
    const developmentWeight = 0.2;

    // Calculate local spending percentage
    const totalLocalSpending = 
      formData.localPurchases +
      formData.localManpower +
      formData.localServices +
      formData.localMaterials;
    const spendingPercentage = (totalLocalSpending / formData.contractValue) * 100;

    // Calculate local manpower percentage
    const manpowerPercentage = (formData.saudiEmployees / formData.totalEmployees) * 100;

    // Calculate development contribution
    const supplierPercentage = (formData.localSuppliers / formData.totalSuppliers) * 100;
    const trainingPercentage = (formData.trainingBudget / formData.contractValue) * 100;
    const developmentScore = (supplierPercentage + trainingPercentage) / 2;

    // Calculate weighted score
    const localContentScore = 
      (spendingPercentage * spendingWeight) +
      (manpowerPercentage * manpowerWeight) +
      (developmentScore * developmentWeight);

    return {
      totalLocalSpending,
      spendingPercentage,
      manpowerPercentage,
      developmentScore,
      localContentScore: Math.round(localContentScore * 100) / 100
    };
  };

  const results = calculateLocalContent();

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'المحتوى المحلي' : 'Local Content'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'حاسبة المحتوى المحلي وتقارير الأداء'
              : 'Local Content Calculator and Performance Reports'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'رفع البيانات' : 'Upload Data'}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            {currentLanguage === 'ar' ? 'تحميل التقرير' : 'Download Report'}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'الإنفاق المحلي' : 'Local Spending'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {Math.round(results.spendingPercentage)}%
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
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'التوطين' : 'Saudization'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {Math.round(results.manpowerPercentage)}%
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
                <Building2 className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'الموردين المحليين' : 'Local Suppliers'}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {Math.round((formData.localSuppliers / formData.totalSuppliers) * 100)}%
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
                <BarChart2 className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {currentLanguage === 'ar' ? 'المحتوى المحلي' : 'Local Content'}
                  </dt>
                  <dd className={`text-2xl font-semibold ${getScoreColor(results.localContentScore)}`}>
                    {results.localContentScore}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {currentLanguage === 'ar' ? 'حاسبة المحتوى المحلي' : 'Local Content Calculator'}
          </h2>
          
          <form className="space-y-4">
            {/* Contract Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'معلومات العقد' : 'Contract Information'}
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {currentLanguage === 'ar' ? 'قيمة العقد' : 'Contract Value'}
                </label>
                <input
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractValue: parseFloat(e.target.value) || 0 }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Local Spending */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'الإنفاق المحلي' : 'Local Spending'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'المشتريات المحلية' : 'Local Purchases'}
                  </label>
                  <input
                    type="number"
                    value={formData.localPurchases}
                    onChange={(e) => setFormData(prev => ({ ...prev, localPurchases: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'القوى العاملة المحلية' : 'Local Manpower'}
                  </label>
                  <input
                    type="number"
                    value={formData.localManpower}
                    onChange={(e) => setFormData(prev => ({ ...prev, localManpower: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Manpower */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'القوى العاملة' : 'Manpower'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'الموظفين السعوديين' : 'Saudi Employees'}
                  </label>
                  <input
                    type="number"
                    value={formData.saudiEmployees}
                    onChange={(e) => setFormData(prev => ({ ...prev, saudiEmployees: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}
                  </label>
                  <input
                    type="number"
                    value={formData.totalEmployees}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalEmployees: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Development */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'التطوير' : 'Development'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'الموردين المحليين' : 'Local Suppliers'}
                  </label>
                  <input
                    type="number"
                    value={formData.localSuppliers}
                    onChange={(e) => setFormData(prev => ({ ...prev, localSuppliers: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === 'ar' ? 'إجمالي الموردين' : 'Total Suppliers'}
                  </label>
                  <input
                    type="number"
                    value={formData.totalSuppliers}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalSuppliers: parseFloat(e.target.value) || 0 }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentLanguage === 'ar' ? 'ميزانية التدريب' : 'Training Budget'}
              </label>
              <input
                type="number"
                value={formData.trainingBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, trainingBudget: parseFloat(e.target.value) || 0 }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {currentLanguage === 'ar' ? 'النتائج والتحليل' : 'Results & Analysis'}
          </h2>

          <div className="space-y-6">
            {/* Spending Score */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'درجة الإنفاق المحلي (40%)' : 'Local Spending Score (40%)'}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {Math.round(results.spendingPercentage * 0.4)}%
              </p>
              <div className="mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${Math.min(results.spendingPercentage, 100)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Manpower Score */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'درجة التوطين (40%)' : 'Saudization Score (40%)'}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {Math.round(results.manpowerPercentage * 0.4)}%
              </p>
              <div className="mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${Math.min(results.manpowerPercentage, 100)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Development Score */}
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {currentLanguage === 'ar' ? 'درجة التطوير (20%)' : 'Development Score (20%)'}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {Math.round(results.developmentScore * 0.2)}%
              </p>
              <div className="mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${Math.min(results.developmentScore, 100)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Total Score */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {currentLanguage === 'ar' ? 'النتيجة النهائية' : 'Final Score'}
              </h3>
              <p className={`mt-2 text-4xl font-bold ${getScoreColor(results.localContentScore)}`}>
                {results.localContentScore}%
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {currentLanguage === 'ar'
                  ? 'الحد الأدنى المطلوب: 40%'
                  : 'Minimum Required: 40%'
                }
              </p>
            </div>

            <div className="pt-6">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <FileText className="h-5 w-5 mr-2" />
                {currentLanguage === 'ar' ? 'إنشاء تقرير مفصل' : 'Generate Detailed Report'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}