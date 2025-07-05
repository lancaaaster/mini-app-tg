import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import LoadingSpinner from './LoadingSpinner';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAppStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user?.is_admin) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard; 