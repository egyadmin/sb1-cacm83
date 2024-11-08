import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguageStore } from '../../store/useLanguageStore';

export function AttendanceChart() {
  const { currentLanguage } = useLanguageStore();

  // Sample data - replace with actual data from your store
  const data = [
    {
      time: '07:00',
      checkIn: 5,
      checkOut: 0
    },
    {
      time: '08:00',
      checkIn: 25,
      checkOut: 0
    },
    {
      time: '09:00',
      checkIn: 12,
      checkOut: 2
    },
    {
      time: '16:00',
      checkIn: 0,
      checkOut: 8
    },
    {
      time: '17:00',
      checkIn: 0,
      checkOut: 28
    },
    {
      time: '18:00',
      checkIn: 0,
      checkOut: 12
    }
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="checkIn"
            name={currentLanguage === 'ar' ? 'تسجيل الحضور' : 'Check In'}
            fill="#10B981"
          />
          <Bar
            dataKey="checkOut"
            name={currentLanguage === 'ar' ? 'تسجيل الانصراف' : 'Check Out'}
            fill="#EF4444"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}