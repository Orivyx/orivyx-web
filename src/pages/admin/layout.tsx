import { ReactNode } from "react";
import { Sidebar } from "./components";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className="flex min-h-screen w-full text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-admin.png')" }}
    >
      <Sidebar />

      {/* Main content - responsive margins */}
      <main className="w-full lg:ml-[15%] lg:w-[85%] p-4 lg:p-8 font-onest pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
