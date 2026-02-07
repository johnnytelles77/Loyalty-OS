'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

import AppLayout from '../components/layouts/AppLayout';

import AddPoints from '../components/AddPoints';
import History from './history';
import DashboardHome from '../components/DashboardHome';
import Clients from '../components/Clients';
import PromotionsList from '../components/PromotionsList';

type MenuOption = 'home' | 'addPoints' | 'history' | 'clients' | 'promotions';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuOption>('home');
  const { logout, business } = useAuth();
  const router = useRouter();

  const renderContent = () => {
    switch (activeMenu) {
      case 'addPoints':
        return <AddPoints />;
      case 'history':
        return <History />;
      case 'clients':
        return <Clients />;
      case 'promotions':
        return <PromotionsList />;
      default:
        return <DashboardHome />;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AppLayout
      businessName={business?.nombre}
      onLogout={handleLogout}
      onSelectPage={(page: MenuOption) => setActiveMenu(page)}
    >
      {renderContent()}
    </AppLayout>
  );
}