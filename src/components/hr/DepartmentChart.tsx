import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';

interface Department {
  id: string;
  name: string;
  nameEn: string;
  employeeCount: number;
  color: string;
}

interface DepartmentChartProps {
  departments: Department[];
}

export function DepartmentChart({ departments }: DepartmentChartProps) {
  const { currentLanguage } = useLanguageStore();
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'توزيع الموظفين' : 'Employee Distribution'}
      </h3>
      
      <div className="space-y-4">
        {departments.map((department) => {
          const percentage = (department.employeeCount / totalEmployees) * 100;
          
          return (
            <div key={department.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">
                  {currentLanguage === 'ar' ? department.name : department.nameEn}
                </span>
                <span className="text-gray-600">
                  {department.employeeCount} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: department.color
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}