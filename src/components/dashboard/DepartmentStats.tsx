import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Department {
  name: string;
  nameAr: string;
  employeeCount: number;
  color: string;
}

interface DepartmentStatsProps {
  departments: Department[];
  currentLanguage: string;
}

export function DepartmentStats({ departments, currentLanguage }: DepartmentStatsProps) {
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);

  const data = departments.map(dept => ({
    name: currentLanguage === 'ar' ? dept.nameAr : dept.name,
    value: dept.employeeCount,
    percentage: (dept.employeeCount / totalEmployees) * 100,
    color: dept.color
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'توزيع الموظفين حسب الإدارات' : 'Employee Distribution by Department'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                `${value} (${props.payload.percentage.toFixed(1)}%)`,
                currentLanguage === 'ar' ? 'عدد الموظفين' : 'Employees'
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}