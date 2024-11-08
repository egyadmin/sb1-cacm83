import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResidentDistributionProps {
  currentLanguage: string;
}

export function ResidentDistribution({ currentLanguage }: ResidentDistributionProps) {
  const data = [
    {
      name: currentLanguage === 'ar' ? 'موظفي الشركة' : 'Company Employees',
      value: 65,
      color: '#4F46E5'
    },
    {
      name: currentLanguage === 'ar' ? 'مقاولي الباطن' : 'Subcontractors',
      value: 25,
      color: '#10B981'
    },
    {
      name: currentLanguage === 'ar' ? 'عمال مؤقتين' : 'Temporary Workers',
      value: 10,
      color: '#F59E0B'
    }
  ];

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'توزيع المقيمين' : 'Resident Distribution'}
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