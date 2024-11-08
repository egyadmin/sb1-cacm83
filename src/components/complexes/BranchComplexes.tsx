import React from 'react';
import { Building2 } from 'lucide-react';
import { ComplexDetails } from './ComplexDetails';

interface Complex {
  id: string;
  name: string;
  nameEn: string;
  rooms: number;
  kitchens: number;
  bathrooms: number;
  totalCapacity: number;
  currentOccupancy: number;
  buildings?: Array<{
    id: string;
    number: string;
    rooms: number;
    bathrooms: number;
    kitchens: number;
    location: string;
  }>;
}

interface BranchComplexesProps {
  branch: {
    id: string;
    name: string;
    nameEn: string;
    complexes: Complex[];
  };
  onEditComplex?: (complex: Complex) => void;
}

export function BranchComplexes({ branch, onEditComplex }: BranchComplexesProps) {
  const totalCapacity = branch.complexes.reduce((sum, complex) => sum + complex.totalCapacity, 0);
  const totalOccupancy = branch.complexes.reduce((sum, complex) => sum + complex.currentOccupancy, 0);
  const branchOccupancyPercentage = (totalOccupancy / totalCapacity) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-gray-400" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{branch.name}</h2>
            <p className="text-sm text-gray-500">{branch.nameEn}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">إجمالي الإشغال:</span>
          <div className="w-24 bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                branchOccupancyPercentage > 90 ? 'bg-red-600' : 
                branchOccupancyPercentage > 70 ? 'bg-yellow-600' : 
                'bg-green-600'
              }`}
              style={{ width: `${branchOccupancyPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{Math.round(branchOccupancyPercentage)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branch.complexes.map(complex => (
          <ComplexDetails 
            key={complex.id} 
            complex={complex}
            onEdit={onEditComplex ? () => onEditComplex(complex) : undefined}
          />
        ))}
      </div>
    </div>
  );
}