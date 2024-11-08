import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MaintenanceOverviewProps {
  currentLanguage: string;
}

export function MaintenanceOverview({ currentLanguage }: MaintenanceOverviewProps) {
  const data = [
    {
      name: currentLanguage === 'ar' ? 'مكتملة' : 'Completed',
      value: 45,
      color: '#10B981'
    },
    {
      name: currentLanguage === 'ar' ? 'قيد التنفيذ' : 'In Progress',
      value: 30,
      color: '#F59E0B'
    },
    {
      name: currentLanguage === 'ar' ? 'معلقة' : 'Pending',
      value: 15,
      color: '#EF4444'
    },
    {
      name: currentLanguage === 'ar' ? 'ملغاة' : 'Cancelled',
      value: 10,
      color: '#6B7280'
    }
  ];

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'نظرة عامة على الصيانة' : 'Maintenance Overview'}
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
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}