import { useState } from 'react';
import {
  Truck,
  Package,
  Users,
  Bell,
  BarChart3,
  Menu,
  X,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';

// Components
import SideBar from './components/SideBar';
import StockManagement from './components/StockManagement';
import DispatchPlanning from './components/DispatchPlanning';
import RealTimeTracking from './components/RealTimeTracking';
import AlertsReports from './components/AlertsReports';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import { Toaster } from 'sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Render active component based on tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stock':
        return <StockManagement />;
      case 'dispatch':
        return <DispatchPlanning />;
      case 'tracking':
        return <RealTimeTracking />;
      case 'alerts':
        return <AlertsReports />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-primary text-primary-foreground"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-40 w-64 h-full`}>
        <SideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navItems={[
            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
            { id: 'stock', label: 'Stock Management', icon: <Package size={20} /> },
            { id: 'dispatch', label: 'Dispatch Planning', icon: <Truck size={20} /> },
            { id: 'tracking', label: 'Real-Time Tracking', icon: <Truck size={20} /> },
            { id: 'alerts', label: 'Alerts & Reports', icon: <Bell size={20} /> },
            { id: 'users', label: 'User Management', icon: <Users size={20} /> },
          ]}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Warehouse Management System</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-accent"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                JD
              </div>
              <span className="hidden md:inline">John Doe</span>
            </div>
            <button className="p-2 rounded-md hover:bg-accent">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {renderActiveComponent()}
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;