import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface AttendanceChartProps {
  data: {
    checkInTimes: Array<{ hour: string; count: number }>;
    checkOutTimes: Array<{ hour: string; count: number }>;
    departmentAttendance: Array<{
      name: string;
      nameAr: string;
      present: number;
      total: number;
    }>;
  };
  currentLanguage: string;
}

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6'];

export function AttendanceChart({ data, currentLanguage }: AttendanceChartProps) {
  const departmentData = data.departmentAttendance.map(dept => ({
    name: currentLanguage === 'ar' ? dept.nameAr : dept.name,
    value: (dept.present / dept.total) * 100,
    present: dept.present,
    total: dept.total
  }));

  return (
    <>
      {/* Check-in/out Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'توزيع أوقات الحضور والانصراف' : 'Check-in/out Distribution'}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.checkInTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                name={currentLanguage === 'ar' ? 'عدد الموظفين' : 'Employee Count'}
                fill="#10B981"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Attendance */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'نسبة الحضور حسب الإدارة' : 'Department Attendance Rate'}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}%`,
                  currentLanguage === 'ar' ? 'نسبة الحضور' : 'Attendance Rate'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}