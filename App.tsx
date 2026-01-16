import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { OrderEntryScreen } from './OrderEntryScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { KDSScreen } from './components/KDSScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginScreen } from './components/LoginScreen';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Entry Point */}
        <Route path="/" element={<LoginScreen />} />
        
        {/* Super Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Tenant/Restaurant Routes */}
        {/* We use :tenantId parameter to scope data in a real app */}
        <Route path="/pos/:tenantId" element={<DashboardScreen />} />
        <Route path="/pos/:tenantId/order" element={<OrderEntryScreen />} />
        <Route path="/pos/:tenantId/kds" element={<KDSScreen />} />
      </Routes>
    </HashRouter>
  );
};

export default App;