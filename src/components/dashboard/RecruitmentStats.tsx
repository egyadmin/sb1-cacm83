import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RecruitmentStatsProps {
  data: {
    applications: number[];
    hires: number[];
    months: string[];
  };
  currentLanguage: string;
}

export function RecruitmentStats({ data, currentLanguage }: RecruitmentStatsProps) {
  const chartData = data.months.map((month, index) => ({
    month: month,
    applications: data.applications[index],
    hires: data.hires[index]
  }));

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'إحصائيات التوظيف' : 'Recruitment Statistics'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="applications"
              name={currentLanguage === 'ar' ? 'الطلبات' : 'Applications'}
              stroke="#6366F1"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="hires"
              name={currentLanguage === 'ar' ? 'التعيينات' : 'Hires'}
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}