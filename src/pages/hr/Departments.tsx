import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, BarChart2 } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface Department {
  id: string;
  name: string;
  nameEn: string;
  employeeCount: number;
  manager: string;
  budget: number;
}

const initialDepartments: Department[] = [
  {
    id: '1',
    name: 'إدارة شئون الموظفين',
    nameEn: 'HR Management',
    employeeCount: 15,
    manager: 'محمد أحمد',
    budget: 250000
  },
  {
    id: '2',
    name: 'إدارة تكنولوجيا المعلومات',
    nameEn: 'IT Department',
    employeeCount: 25,
    manager: 'أحمد علي',
    budget: 500000
  },
  {
    id: '3',
    name: 'إدارة المشاريع',
    nameEn: 'Project Management',
    employeeCount: 30,
    manager: 'خالد محمد',
    budget: 750000
  }
];

export function Departments() {
  const { currentLanguage } = useLanguageStore();
  const [departments] = useState<Department[]>(initialDepartments);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);

  const stats = [
    {
      title: currentLanguage === 'ar' ? 'عدد الإدارات' : 'Total Departments',
      value: departments.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: currentLanguage === 'ar' ? 'إجمالي الموظفين' : 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: currentLanguage === 'ar' ? 'الميزانية السنوية' : 'Annual Budget',
      value: `${(totalBudget / 1000000).toFixed(1)}M`,
      icon: BarChart2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'إدارة الأقسام' : 'Department Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {currentLanguage === 'ar' 
              ? 'إدارة الأقسام والهيكل التنظيمي'
              : 'Manage departments and organizational structure'
            }
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {currentLanguage === 'ar' ? 'إضافة قسم' : 'Add Department'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentLanguage === 'ar' ? department.name : department.nameEn}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentLanguage === 'ar' ? department.nameEn : department.name}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 hover:text-blue-800">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    {currentLanguage === 'ar' ? 'المدير' : 'Manager'}
                  </div>
                  <div className="mt-1 text-sm text-gray-900">{department.manager}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    {currentLanguage === 'ar' ? 'عدد الموظفين' : 'Employee Count'}
                  </div>
                  <div className="mt-1 text-sm text-gray-900">{department.employeeCount}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    {currentLanguage === 'ar' ? 'الميزانية السنوية' : 'Annual Budget'}
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {department.budget.toLocaleString()} {currentLanguage === 'ar' ? 'ر.س' : 'SAR'}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="relative">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">
                        {currentLanguage === 'ar' ? 'نسبة التوظيف' : 'Staffing Level'}
                      </span>
                      <span className="text-blue-600 font-medium">
                        {Math.round((department.employeeCount / totalEmployees) * 100)}%
                      </span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                      <div
                        style={{ width: `${(department.employeeCount / totalEmployees) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}