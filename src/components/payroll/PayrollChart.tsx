import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PayrollChartProps {
  currentLanguage: string;
}

export function PayrollChart({ currentLanguage }: PayrollChartProps) {
  // Sample data - replace with actual data
  const data = [
    {
      department: currentLanguage === 'ar' ? 'تقنية المعلومات' : 'IT',
      basicSalary: 85000,
      allowances: 25000,
      deductions: 15000
    },
    {
      department: currentLanguage === 'ar' ? 'الموارد البشرية' : 'HR',
      basicSalary: 65000,
      allowances: 20000,
      deductions: 12000
    },
    {
      department: currentLanguage === 'ar' ? 'المالية' : 'Finance',
      basicSalary: 75000,
      allowances: 22000,
      deductions: 14000
    },
    {
      department: currentLanguage === 'ar' ? 'العمليات' : 'Operations',
      basicSalary: 95000,
      allowances: 28000,
      deductions: 18000
    }
  ];

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="basicSalary"
            name={currentLanguage === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}
            fill="#4F46E5"
          />
          <Bar
            dataKey="allowances"
            name={currentLanguage === 'ar' ? 'البدلات' : 'Allowances'}
            fill="#10B981"
          />
          <Bar
            dataKey="deductions"
            name={currentLanguage === 'ar' ? 'الخصومات' : 'Deductions'}
            fill="#EF4444"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}