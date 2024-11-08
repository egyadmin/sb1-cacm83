import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  nameAr: string;
  value: number;
  color: string;
}

interface DashboardChartProps {
  data: ChartData[];
  type: 'pie' | 'donut';
  currentLanguage: string;
}

export function DashboardChart({ data, type, currentLanguage }: DashboardChartProps) {
  const formattedData = data.map(item => ({
    name: currentLanguage === 'ar' ? item.nameAr : item.name,
    value: item.value
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={type === 'donut' ? 60 : 0}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
  );
}