import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectsOverviewProps {
  currentLanguage: string;
}

export function ProjectsOverview({ currentLanguage }: ProjectsOverviewProps) {
  const data = [
    {
      month: currentLanguage === 'ar' ? 'يناير' : 'Jan',
      completed: 4,
      active: 6,
      delayed: 2
    },
    {
      month: currentLanguage === 'ar' ? 'فبراير' : 'Feb',
      completed: 5,
      active: 8,
      delayed: 1
    },
    {
      month: currentLanguage === 'ar' ? 'مارس' : 'Mar',
      completed: 6,
      active: 7,
      delayed: 3
    },
    {
      month: currentLanguage === 'ar' ? 'أبريل' : 'Apr',
      completed: 8,
      active: 5,
      delayed: 2
    },
    {
      month: currentLanguage === 'ar' ? 'مايو' : 'May',
      completed: 7,
      active: 9,
      delayed: 1
    },
    {
      month: currentLanguage === 'ar' ? 'يونيو' : 'Jun',
      completed: 9,
      active: 6,
      delayed: 2
    }
  ];

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'نظرة عامة على المشاريع' : 'Projects Overview'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" name={currentLanguage === 'ar' ? 'مكتملة' : 'Completed'} stackId="a" fill="#10B981" />
            <Bar dataKey="active" name={currentLanguage === 'ar' ? 'نشطة' : 'Active'} stackId="a" fill="#6366F1" />
            <Bar dataKey="delayed" name={currentLanguage === 'ar' ? 'متأخرة' : 'Delayed'} stackId="a" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}