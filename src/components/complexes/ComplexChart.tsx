import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ComplexChartProps {
  complex: {
    buildings: Array<{
      totalUnits: number;
      occupiedUnits: number;
      maintenanceRequests: {
        total: number;
        pending: number;
      };
    }>;
  };
  buildingStats: {
    totalUnits: number;
    occupiedUnits: number;
    maintenanceRequests: number;
    pendingMaintenance: number;
  };
  currentLanguage: string;
}

export function ComplexChart({ complex, buildingStats, currentLanguage }: ComplexChartProps) {
  const occupancyData = [
    {
      name: currentLanguage === 'ar' ? 'مشغول' : 'Occupied',
      value: buildingStats.occupiedUnits,
      color: '#10B981'
    },
    {
      name: currentLanguage === 'ar' ? 'متاح' : 'Available',
      value: buildingStats.totalUnits - buildingStats.occupiedUnits,
      color: '#6B7280'
    }
  ];

  const maintenanceData = [
    {
      name: currentLanguage === 'ar' ? 'قيد الانتظار' : 'Pending',
      value: buildingStats.pendingMaintenance,
      color: '#EF4444'
    },
    {
      name: currentLanguage === 'ar' ? 'مكتمل' : 'Completed',
      value: buildingStats.maintenanceRequests - buildingStats.pendingMaintenance,
      color: '#10B981'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2 text-center">
          {currentLanguage === 'ar' ? 'حالة الإشغال' : 'Occupancy Status'}
        </h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, percent }) => 
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2 text-center">
          {currentLanguage === 'ar' ? 'طلبات الصيانة' : 'Maintenance Requests'}
        </h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={maintenanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, percent }) => 
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {maintenanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}