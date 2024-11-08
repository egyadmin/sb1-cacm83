import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Branches } from './pages/Branches';
import { Complexes } from './pages/Complexes';
import { Residents } from './pages/Residents';
import { Approvals } from './pages/Approvals';
import { Settings } from './pages/Settings';
import { Projects } from './pages/projects/Projects';
import { ProjectTasks } from './pages/projects/ProjectTasks';
import { ProjectContracts } from './pages/projects/ProjectContracts';
import { ProjectInvoices } from './pages/projects/ProjectInvoices';
import { Subcontractors } from './pages/operations/Subcontractors';
import { Recruitment } from './pages/hr/Recruitment';
import { Evaluation } from './pages/hr/Evaluation';
import { PaymentRequests } from './pages/hr/PaymentRequests';
import { ResourceManagement } from './pages/hr/ResourceManagement';
import { Procurement } from './pages/operations/Procurement';
import { PurchaseOrders } from './pages/operations/PurchaseOrders';
import { Invoices } from './pages/operations/Invoices';
import { Warehouses } from './pages/operations/Warehouses';
import { PersonalAssets } from './pages/operations/PersonalAssets';
import { Inventory } from './pages/operations/Inventory';
import { Attendance } from './pages/hr/Attendance';
import { Payroll } from './pages/hr/Payroll';
import { MaintenanceRequests } from './pages/maintenance/MaintenanceRequests';
import { LocalContent } from './pages/LocalContent';
import { useAuthStore } from './store/useAuthStore';
import { useMaintenanceStore } from './store/useMaintenanceStore';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isMaintenanceMode = useMaintenanceStore((state) => state.isMaintenanceMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.currentUser?.role === 'admin');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isMaintenanceMode && !isAdmin) {
    return <Navigate to="/maintenance" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="branches" element={
              <ProtectedRoute>
                <Branches />
              </ProtectedRoute>
            } />
            <Route path="complexes" element={
              <ProtectedRoute>
                <Complexes />
              </ProtectedRoute>
            } />
            <Route path="residents" element={
              <ProtectedRoute>
                <Residents />
              </ProtectedRoute>
            } />
            <Route path="approvals" element={
              <ProtectedRoute>
                <Approvals />
              </ProtectedRoute>
            } />
            <Route path="maintenance" element={
              <ProtectedRoute>
                <MaintenanceRequests />
              </ProtectedRoute>
            } />
            <Route path="local-content" element={
              <ProtectedRoute>
                <LocalContent />
              </ProtectedRoute>
            } />
            <Route path="projects">
              <Route index element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="tasks" element={
                <ProtectedRoute>
                  <ProjectTasks />
                </ProtectedRoute>
              } />
              <Route path="contracts" element={
                <ProtectedRoute>
                  <ProjectContracts />
                </ProtectedRoute>
              } />
              <Route path="invoices" element={
                <ProtectedRoute>
                  <ProjectInvoices />
                </ProtectedRoute>
              } />
              <Route path="subcontractors" element={
                <ProtectedRoute>
                  <Subcontractors />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="hr">
              <Route path="recruitment" element={
                <ProtectedRoute>
                  <Recruitment />
                </ProtectedRoute>
              } />
              <Route path="evaluation" element={
                <ProtectedRoute>
                  <Evaluation />
                </ProtectedRoute>
              } />
              <Route path="payments" element={
                <ProtectedRoute>
                  <PaymentRequests />
                </ProtectedRoute>
              } />
              <Route path="resources" element={
                <ProtectedRoute>
                  <ResourceManagement />
                </ProtectedRoute>
              } />
              <Route path="attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />
              <Route path="payroll" element={
                <ProtectedRoute>
                  <Payroll />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="operations">
              <Route path="procurement" element={
                <ProtectedRoute>
                  <Procurement />
                </ProtectedRoute>
              } />
              <Route path="purchase-orders" element={
                <ProtectedRoute>
                  <PurchaseOrders />
                </ProtectedRoute>
              } />
              <Route path="invoices" element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              } />
              <Route path="warehouses" element={
                <ProtectedRoute>
                  <Warehouses />
                </ProtectedRoute>
              } />
              <Route path="personal-assets" element={
                <ProtectedRoute>
                  <PersonalAssets />
                </ProtectedRoute>
              } />
              <Route path="inventory" element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}