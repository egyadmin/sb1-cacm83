import React, { useState, useEffect } from 'react';
import { FolderKanban, Search, Filter, Download, Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { AddProjectModal } from '../../components/projects/AddProjectModal';

// Sample projects data (replace with API data)
const projectsData = [
  {
    id: 'PRJ-2024-001',
    name: 'تطوير المجمع السكني',
    manager: 'أحمد محمد',
    progress: 65,
    status: 'active',
    deliveryDate: '2024/06/30',
    description: 'تطوير وتحديث المجمع السكني الرئيسي'
  },
  {
    id: 'PRJ-2024-002',
    name: 'بناء المستودعات',
    manager: 'محمد علي',
    progress: 30,
    status: 'delayed',
    deliveryDate: '2024/08/15',
    description: 'إنشاء مستودعات جديدة في المنطقة الصناعية'
  },
  {
    id: 'PRJ-2024-003',
    name: 'تجديد المكاتب الإدارية',
    manager: 'خالد عبدالله',
    progress: 90,
    status: 'completed',
    deliveryDate: '2024/04/01',
    description: 'تجديد وتحديث المكاتب الإدارية في المقر الرئيسي'
  },
  {
    id: 'PRJ-2024-004',
    name: 'توسعة المجمع الثاني',
    manager: 'عمر أحمد',
    progress: 15,
    status: 'pending',
    deliveryDate: '2024/12/31',
    description: 'مشروع توسعة المجمع السكني الثاني'
  }
];

export function Projects() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    let filtered = projectsData;

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.manager.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [selectedStatus, searchQuery]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'pending':
        return 'معلق';
      case 'delayed':
        return 'متأخر';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  // Calculate statistics
  const stats = {
    active: projectsData.filter(p => p.status === 'active').length,
    inProgress: projectsData.filter(p => p.status === 'pending').length,
    delayed: projectsData.filter(p => p.status === 'delayed').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">إدارة المشاريع</h1>
          <p className="mt-2 text-sm text-gray-700">متابعة وإدارة المشاريع والأعمال</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 ml-2" />
          مشروع جديد
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">المشاريع النشطة</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.active}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">قيد التنفيذ</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.inProgress}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">متأخرة</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.delayed}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في المشاريع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">جميع المشاريع</option>
              <option value="active">نشط</option>
              <option value="pending">قيد التنفيذ</option>
              <option value="delayed">متأخر</option>
              <option value="completed">مكتمل</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم المشروع</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدير المسؤول</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نسبة الإنجاز</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسليم</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.id}</div>
                      <div className="text-xs text-gray-500 mt-1">{project.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              project.progress > 90 ? 'bg-green-600' :
                              project.progress > 50 ? 'bg-blue-600' :
                              project.progress > 25 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.deliveryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">عرض التفاصيل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <AddProjectModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}