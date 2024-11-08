import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface OccupancyTrendsProps {
  currentLanguage: string;
}

export function OccupancyTrends({ currentLanguage }: OccupancyTrendsProps) {
  const data = [
    {
      month: currentLanguage === 'ar' ? 'يناير' : 'Jan',
      occupancy: 75,
      capacity: 85
    },
    {
      month: currentLanguage === 'ar' ? 'فبراير' : 'Feb',
      occupancy: 78,
      capacity: 85
    },
    {
      month: currentLanguage === 'ar' ? 'مارس' : 'Mar',
      occupancy: 82,
      capacity: 85
    },
    {
      month: currentLanguage === 'ar' ? 'أبريل' : 'Apr',
      occupancy: 80,
      capacity: 85
    },
    {
      month: currentLanguage === 'ar' ? 'مايو' : 'May',
      occupancy: 83,
      capacity: 85
    },
    {
      month: currentLanguage === 'ar' ? 'يونيو' : 'Jun',
      occupancy: 85,
      capacity: 85
    }
  ];

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'اتجاهات الإشغال' : 'Occupancy Trends'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="occupancy"
              name={currentLanguage === 'ar' ? 'الإشغال' : 'Occupancy'}
              stroke="#10B981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="capacity"
              name={currentLanguage === 'ar' ? 'السعة' : 'Capacity'}
              stroke="#6B7280"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}