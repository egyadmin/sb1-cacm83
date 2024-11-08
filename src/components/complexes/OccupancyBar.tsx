import React from 'react';

interface OccupancyBarProps {
  percentage: number;
}

export function OccupancyBar({ percentage }: OccupancyBarProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            percentage > 90 ? 'bg-red-600' :
            percentage > 70 ? 'bg-yellow-600' :
            'bg-green-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}