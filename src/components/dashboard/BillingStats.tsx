import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BillingStatsProps {
  currentLanguage: string;
}

export function BillingStats({ currentLanguage }: BillingStatsProps) {
  const data = [
    {
      month: currentLanguage === 'ar' ? 'يناير' : 'Jan',
      revenue: 850000,
      expenses: 650000
    },
    {
      month: currentLanguage === 'ar' ? 'فبراير' : 'Feb',
      revenue: 920000,
      expenses: 700000
    },
    {
      month: currentLanguage === 'ar' ? 'مارس' : 'Mar',
      revenue: 880000,
      expenses: 680000
    },
    {
      month: currentLanguage === 'ar' ? 'أبريل' : 'Apr',
      revenue: 950000,
      expenses: 720000
    },
    {
      month: currentLanguage === 'ar' ? 'مايو' : 'May',
      revenue: 1000000,
      expenses: 750000
    },
    {
      month: currentLanguage === 'ar' ? 'يونيو' : 'Jun',
      revenue: 980000,
      expenses: 730000
    }
  ];

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {currentLanguage === 'ar' ? 'إحصائيات الفواتير' : 'Billing Statistics'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => 
                new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
                  style: 'currency',
                  currency: 'SAR'
                }).format(value)
              }
            />
            <Bar 
              dataKey="revenue" 
              name={currentLanguage === 'ar' ? 'الإيرادات' : 'Revenue'} 
              fill="#10B981" 
            />
            <Bar 
              dataKey="expenses" 
              name={currentLanguage === 'ar' ? 'المصروفات' : 'Expenses'} 
              fill="#EF4444" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}