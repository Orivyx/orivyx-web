import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut, Menu, X, Monitor, Users, Network, Shield, Settings, FileText } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Server Monitor", href: "/admin", icon: <Monitor className="w-5 h-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <FileText className="w-5 h-5" /> },
  { label: "Overlord", href: "/admin/overlord", icon: <Users className="w-5 h-5" /> },
  { label: "Network", href: "/admin/network", icon: <Network className="w-5 h-5" /> },
  { label: "Security", href: "/admin/security", icon: <Shield className="w-5 h-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <img src="/logo.png" className="w-10 h-auto" alt="Logo" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-black/90 lg:bg-black/40 backdrop-blur-xl border-r border-white/10 
          font-onest flex flex-col items-center justify-between z-50 transition-transform duration-300
          
          w-64 lg:w-[15%] p-6
          
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col items-center w-full">
          {/* Logo - hidden on mobile (shown in header) */}
          <Link to="/admin" className="hidden lg:block">
            <img src="/logo.png" className="w-24 h-auto mb-10" alt="Logo" />
          </Link>

          {/* Mobile: add padding for header */}
          <div className="lg:hidden h-16" />

          <nav className="space-y-2 w-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-pink/20 text-pink"
                      : "text-white/80 hover:text-pink hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span className="text-base lg:text-lg">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User info and logout */}
        <div className="w-full mt-8 pt-6 border-t border-white/10">
          {user && (
            <div className="text-center mb-4">
              <p className="text-sm text-white/60 truncate px-2">
                {user.name || user.email}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
