import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { OrderEntryScreen } from './OrderEntryScreen';
import { KDSScreen } from './components/KDSScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginScreen } from './components/LoginScreen';
import { RestaurantAdminDashboard } from "./components/RestaurantAdminDashboard";
import { WaiterDashboard } from './components/WaiterDashboard';
import { ActiveOrdersScreen } from './components/ActiveOrdersScreen';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/restaurant-admin/:tenantId" element={<RestaurantAdminDashboard />} />
        <Route path="/waiter/:tenantId" element={<WaiterDashboard />} />
        <Route path="/waiter/:tenantId/active-orders" element={<ActiveOrdersScreen />} />
        <Route path="/waiter/:tenantId/table/:tableNumber" element={<OrderEntryScreen />} />
        <Route path="/kds/:tenantId" element={<KDSScreen />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
