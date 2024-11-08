import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, AlertTriangle, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AttendanceDetails() {
  const { employeeId } = useParams();
  const { currentLanguage } = useLanguageStore();

  // Sample data - replace with actual data from your store
  const employeeData = {
    name: 'أحمد محمد',
    id: 'EMP-001',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات',
    workSchedule: {
      start: '08:00',
      end: '17:00',
      workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
    },
    statistics: {
      onTime: 85,
      late: 10,
      absent: 5,
      earlyLeave: 3,
      overtime: 12
    },
    deductions: {
      lateDeductions: 150,
      absenceDeductions: 500,
      earlyLeaveDeductions: 100,
      totalDeductions: 750
    }
  };

  const attendanceData = [
    { date: '2024-03-01', checkIn: '07:55', checkOut: '17:05', status: 'onTime' },
    { date: '2024-03-02', checkIn: '08:15', checkOut: '17:00', status: 'late' },
    { date: '2024-03-03', checkIn: '08:00', checkOut: '16:45', status: 'earlyLeave' },
    // Add more attendance records...
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'onTime': return 'text-green-600';
      case 'late': return 'text-red-600';
      case 'earlyLeave': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentLanguage === 'ar' ? 'تفاصيل الحضور والانصراف' : 'Attendance Details'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {employeeData.name} - {employeeData.id}
          </p>
        </div>
      </div>

      {/* Employee Info Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600" />
              <div className="mr-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {employeeData.workSchedule.start} - {employeeData.workSchedule.end}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div className="mr-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'نسبة التأخير' : 'Late Percentage'}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {employeeData.statistics.late}%
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-red-600" />
              <div className="mr-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'إجمالي الخصومات' : 'Total Deductions'}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {employeeData.deductions.totalDeductions} SAR
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-green-600" />
              <div className="mr-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {currentLanguage === 'ar' ? 'نسبة الالتزام' : 'Compliance Rate'}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {employeeData.statistics.onTime}%
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentLanguage === 'ar' ? 'سجل الحضور والانصراف' : 'Attendance History'}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="checkIn" 
                stroke="#10B981" 
                name={currentLanguage === 'ar' ? 'وقت الحضور' : 'Check In'}
              />
              <Line 
                type="monotone" 
                dataKey="checkOut" 
                stroke="#EF4444" 
                name={currentLanguage === 'ar' ? 'وقت الانصراف' : 'Check Out'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Records */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحضور' : 'Check In'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الانصراف' : 'Check Out'}
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {record.checkIn}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-red-600">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        {record.checkOut}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getStatusColor(record.status)}`}>
                        {currentLanguage === 'ar'
                          ? record.status === 'onTime' ? 'في الوقت'
                            : record.status === 'late' ? 'متأخر'
                            : 'خروج مبكر'
                          : record.status
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}