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

      <main className="ml-[15%] w-[85%] p-8 font-onest">{children}</main>
    </div>
  );
}
