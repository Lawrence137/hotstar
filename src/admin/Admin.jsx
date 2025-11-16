import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AdminMatches from './pages/AdminMatches';
import AdminMarketplace from './pages/AdminMarketplace';
import AdminGallery from './pages/AdminGallery';
import AdminBlog from './pages/AdminBlog';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { Menu, X } from 'lucide-react';

const Admin = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const showSidebar = location.pathname !== '/admin/login';

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {showSidebar && (
        <>
          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-50 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <Sidebar />
          </div>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <Sidebar />
          </div>
        </>
      )}

      <main className={`flex-1 flex flex-col ${showSidebar ? 'md:pl-64' : ''}`}>
        {showSidebar && (
          <header className="sticky top-0 z-30 flex items-center justify-between md:justify-end px-4 sm:px-6 lg:px-8 h-16 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-lg font-semibold">
              Welcome, Admin!
            </div>
          </header>
        )}
        
        <div className="flex-1 p-4 sm:p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="login" element={<AdminLogin />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="matches"
              element={
                <ProtectedRoute>
                  <AdminMatches />
                </ProtectedRoute>
              }
            />
            <Route
              path="marketplace"
              element={
                <ProtectedRoute>
                  <AdminMarketplace />
                </ProtectedRoute>
              }
            />
            <Route
              path="gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="blog"
              element={
                <ProtectedRoute>
                  <AdminBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Admin;
