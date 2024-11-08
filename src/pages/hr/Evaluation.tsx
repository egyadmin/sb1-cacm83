import React, { useState } from 'react';
import { Star, TrendingUp, Award, DollarSign, Search, Filter, Download, X } from 'lucide-react';

const performanceMetrics = [
  { id: 1, name: 'Work Quality', nameAr: 'جودة العمل', weight: 0.3 },
  { id: 2, name: 'Productivity', nameAr: 'الإنتاجية', weight: 0.25 },
  { id: 3, name: 'Initiative', nameAr: 'المبادرة', weight: 0.15 },
  { id: 4, name: 'Teamwork', nameAr: 'العمل الجماعي', weight: 0.15 },
  { id: 5, name: 'Attendance', nameAr: 'الحضور', weight: 0.15 },
];

export function Evaluation() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEvaluationForm(false);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats remain the same */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employee Performance & KPIs</h1>
          <p className="mt-2 text-sm text-gray-700">Track performance metrics and calculate bonuses</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowBonusModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="h-5 w-5 mr-2" />
            Calculate Bonuses
          </button>
          <button 
            onClick={() => setShowEvaluationForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Star className="h-5 w-5 mr-2" />
            New Evaluation
          </button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Performance Score</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">87%</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      +2.5%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Top Performers</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">12</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
                      Employees
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Monthly Bonus Pool</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">$25,000</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Form Modal */}
      {showEvaluationForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">New Employee Evaluation</h3>
              <button onClick={() => setShowEvaluationForm(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitEvaluation} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>Select Employee</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Evaluation Period</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>Q1 2024</option>
                    <option>Q2 2024</option>
                    <option>Q3 2024</option>
                    <option>Q4 2024</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">Performance Metrics</h4>
                {performanceMetrics.map((metric) => (
                  <div key={metric.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {metric.name} ({(metric.weight * 100)}%)
                      </label>
                      <span className="text-sm text-gray-500">{metric.nameAr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add any additional comments or feedback..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Development Goals</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Set goals for the next evaluation period..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEvaluationForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}