type NavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

type SidebarProps = {
  navItems?: NavItem[];
};

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", active: true },
  { label: "VPS Monitor" },
  { label: "Network" },
  { label: "Security" },
  { label: "Settings" },
];

export function Sidebar({ navItems = defaultNavItems }: SidebarProps) {
  return (
    <aside className="w-[20%] h-screen fixed left-0 top-0 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto font-onest">
      <img src="/logo.png" className="w-24 h-auto mb-10" alt="Logo" />

      <nav className="space-y-4 text-xl">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`block transition ${
              item.active ? "text-pink" : "text-white/80 hover:text-pink"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
