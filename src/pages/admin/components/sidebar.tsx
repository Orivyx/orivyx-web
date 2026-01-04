import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Server Monitor", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Overlord", href: "/admin/overlord" },
  { label: "Network", href: "/admin/network" },
  { label: "Security", href: "/admin/security" },
  { label: "Settings", href: "/admin/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <aside className="w-[15%] h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto font-onest flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <Link to="/admin">
          <img src="/logo.png" className="w-24 h-auto mb-10" alt="Logo" />
        </Link>

        <nav className="space-y-4 text-xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`block transition ${
                  isActive ? "text-pink" : "text-white/80 hover:text-pink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User info and logout */}
      <div className="w-full mt-8 pt-6 border-t border-white/10">
        {user && (
          <div className="text-center mb-4">
            <p className="text-sm text-white/60 truncate">{user.name || user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
