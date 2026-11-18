import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/fetures/admin/components/AdminSidebar';

const AdminLaout = () => {
  const handleLogout = () => {
    // Call POST /api/admin/auth/logout and clear local storage/cookies
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white ">
      <AdminSidebar onLogout={handleLogout} />
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLaout