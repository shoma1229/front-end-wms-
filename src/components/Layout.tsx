import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  TruckIcon, 
  BarChart2, 
  LogOut, 
  Bell,
  PackageCheck,
  PackagePlus,
  Map,
  ClipboardList,
  Boxes,
  Users,
  LineChart,
  Activity,
  ChevronLeft,
  Menu,
  FileSpreadsheet
} from 'lucide-react';

const adminNavItems = [
  { path: '/', icon: LayoutDashboard, label: 'ダッシュボード' },
  { path: '/users', icon: Users, label: 'ユーザー管理' },
  { path: '/analytics', icon: LineChart, label: '入出庫分析' },
  { path: '/performance', icon: Activity, label: '生産性管理' },
];

const clientNavItems = [
  { path: '/', icon: LayoutDashboard, label: '概要' },
  { path: '/products', icon: FileSpreadsheet, label: '商品管理' },
  { path: '/inventory', icon: Package, label: '在庫管理' },
  { path: '/shipments', icon: TruckIcon, label: '出荷管理' },
  { path: '/reports', icon: BarChart2, label: 'レポート' },
];

const warehouseNavItems = [
  { path: '/', icon: LayoutDashboard, label: '概要' },
  { path: '/products', icon: Package, label: '商品マスター' },
  { path: '/inbound', icon: PackagePlus, label: '入庫管理' },
  { path: '/outbound', icon: PackageCheck, label: '出庫管理' },
  { path: '/locations', icon: Map, label: 'ロケーション' },
  { path: '/inventory', icon: Boxes, label: '在庫管理' },
  { path: '/picking', icon: ClipboardList, label: 'ピッキング' },
  { path: '/tasks', icon: Package, label: '作業一覧' },
];

const Layout = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  
  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminNavItems;
      case 'warehouse':
        return warehouseNavItems;
      default:
        return clientNavItems;
    }
  };

  const getTitle = () => {
    switch (user?.role) {
      case 'admin':
        return 'EviRich 管理者';
      case 'warehouse':
        return 'EviRich 倉庫管理';
      default:
        return 'EviRich クライアント';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isMenuCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          {!isMenuCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">{getTitle()}</h1>
          )}
          <button
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            {isMenuCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="p-4">
          {getNavItems().map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg ${
                location.pathname === path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={isMenuCollapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 min-w-[20px]" />
              {!isMenuCollapsed && <span className="font-medium ml-3">{label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-end h-full px-6">
            <button className="p-2 mr-4 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              {!isMenuCollapsed && <span className="mr-2">{user?.name}</span>}
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;