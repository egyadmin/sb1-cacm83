import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  Settings as SettingsIcon, 
  LayoutDashboard,
  UserPlus,
  Star,
  DollarSign,
  Briefcase,
  ShoppingCart,
  Package,
  Warehouse,
  ClipboardList,
  BoxesIcon,
  FileText,
  FolderKanban,
  LogOut,
  Menu,
  X,
  MapPin,
  Home,
  Wrench,
  UserCog,
  Flag
} from 'lucide-react';
import { Navigation } from './Navigation';
import { MaintenanceBanner } from './MaintenanceBanner';
import { LanguageSelector } from './LanguageSelector';
import { useLanguageStore } from '../store/useLanguageStore';
import { useAuthStore } from '../store/useAuthStore';
import { Banner } from './Banner';

const navigationItems = [
  { name: 'Dashboard', nameAr: 'لوحة التحكم', icon: LayoutDashboard, href: '/' },
  { name: 'Branches', nameAr: 'الفروع', icon: MapPin, href: '/branches' },
  { 
    name: 'Housing Management', 
    nameAr: 'إدارة الإسكان', 
    icon: Home,
    children: [
      { name: 'Complexes', nameAr: 'المجمعات', icon: Building2, href: '/complexes' },
      { name: 'Residents', nameAr: 'المقيمين', icon: Users, href: '/residents' },
      { name: 'Maintenance', nameAr: 'طلبات الصيانة', icon: Wrench, href: '/maintenance' },
      { name: 'Access Control', nameAr: 'إدارة الصلاحيات', icon: UserCog, href: '/housing/access' }
    ]
  },
  { name: 'Local Content', nameAr: 'المحتوى المحلي', icon: Flag, href: '/local-content' },
  { name: 'Approvals', nameAr: 'الموافقات', icon: ClipboardCheck, href: '/approvals' },
  {
    name: 'Projects',
    nameAr: 'المشاريع',
    icon: FolderKanban,
    children: [
      { name: 'Project List', nameAr: 'قائمة المشاريع', icon: ClipboardList, href: '/projects' },
      { name: 'Tasks', nameAr: 'المهام', icon: ClipboardCheck, href: '/projects/tasks' },
      { name: 'Contracts', nameAr: 'العقود', icon: FileText, href: '/projects/contracts' },
      { name: 'Invoices', nameAr: 'الفواتير', icon: DollarSign, href: '/projects/invoices' }
    ]
  },
  { 
    name: 'HR Management',
    nameAr: 'إدارة الموارد البشرية',
    icon: Users,
    children: [
      { name: 'Recruitment', nameAr: 'التوظيف', icon: UserPlus, href: '/hr/recruitment' },
      { name: 'Evaluation', nameAr: 'التقييم', icon: Star, href: '/hr/evaluation' },
      { name: 'Payment Requests', nameAr: 'طلبات الدفع', icon: DollarSign, href: '/hr/payments' },
      { name: 'Resource Management', nameAr: 'إدارة الموارد', icon: Briefcase, href: '/hr/resources' },
      { name: 'Payroll', nameAr: 'مسير الرواتب', icon: DollarSign, href: '/hr/payroll' }
    ]
  },
  {
    name: 'Operations',
    nameAr: 'العمليات',
    icon: Package,
    children: [
      { name: 'Procurement', nameAr: 'المشتريات', icon: ShoppingCart, href: '/operations/procurement' },
      { name: 'Purchase Orders', nameAr: 'أوامر الشراء', icon: FileText, href: '/operations/purchase-orders' },
      { name: 'Invoices', nameAr: 'الفواتير', icon: FileText, href: '/operations/invoices' },
      { name: 'Warehouses', nameAr: 'المستودعات', icon: Warehouse, href: '/operations/warehouses' },
      { name: 'Personal Assets', nameAr: 'العهد الشخصية', icon: BoxesIcon, href: '/operations/personal-assets' },
      { name: 'Inventory', nameAr: 'الجرد السنوي', icon: ClipboardList, href: '/operations/inventory' }
    ]
  },
  { name: 'Settings', nameAr: 'الإعدادات', icon: SettingsIcon, href: '/settings' }
];

export function Layout() {
  const { currentLanguage } = useLanguageStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      <MaintenanceBanner />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="touch-manipulation p-2 -m-2 text-gray-500 hover:text-gray-600"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <img
            src="https://e.top4top.io/p_3231azaak1.png"
            alt="Shiba Al Jazira Contracting Company"
            className="h-12 w-auto object-contain"
          />
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : currentLanguage === 'ar' ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div 
          className={`absolute inset-y-0 ${
            currentLanguage === 'ar' ? 'right-0' : 'left-0'
          } w-72 bg-white transform transition-transform duration-300 ease-in-out`}
          style={{ touchAction: 'pan-y pinch-zoom' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pb-4 pt-16">
              <Navigation items={navigationItems} mobile={true} onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-red-600 hover:bg-red-50 touch-manipulation"
              >
                <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                {currentLanguage === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ${currentLanguage === 'ar' ? 'lg:right-0' : 'lg:left-0'}`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
          <div className="flex h-32 shrink-0 items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center">
              <img
                src="https://e.top4top.io/p_3231azaak1.png"
                alt="Shiba Al Jazira Contracting Company"
                className="h-24 w-auto object-contain"
              />
            </div>
            <LanguageSelector />
          </div>
          <Navigation items={navigationItems} />
          <div className="mt-auto border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
              {currentLanguage === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main 
        className={`flex-1 ${currentLanguage === 'ar' ? 'lg:mr-72' : 'lg:ml-72'} min-h-screen bg-gray-50`}
      >
        <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <Banner />
          <div className="mx-auto max-w-7xl mt-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}