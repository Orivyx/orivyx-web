import { Link, useLocation } from "react-router-dom";

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

  return (
    <aside className="w-[15%] h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto font-onest flex flex-col items-center">
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
    </aside>
  );
}
