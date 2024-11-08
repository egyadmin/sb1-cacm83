import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell
} from 'recharts';
import { useLanguageStore } from '../../store/useLanguageStore';

interface TaskChartProps {
  data: {
    status: string;
    count: number;
  }[];
}

const COLORS = {
  completed: '#10B981',
  inProgress: '#3B82F6',
  pending: '#F59E0B',
  delayed: '#EF4444'
};

export function TaskChart({ data }: TaskChartProps) {
  const { currentLanguage } = useLanguageStore();

  const chartData = data.map(item => ({
    name: currentLanguage === 'ar' 
      ? getArabicStatus(item.status)
      : getEnglishStatus(item.status),
    value: item.count,
    status: item.status
  }));

  function getArabicStatus(status: string) {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'inProgress': return 'قيد التنفيذ';
      case 'pending': return 'معلق';
      case 'delayed': return 'متأخر';
      default: return status;
    }
  }

  function getEnglishStatus(status: string) {
    switch (status) {
      case 'completed': return 'Completed';
      case 'inProgress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'delayed': return 'Delayed';
      default: return status;
    }
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => entry.name}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.status as keyof typeof COLORS] || '#CBD5E1'}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-700">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}