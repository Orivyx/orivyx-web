import { AdminLayout } from "./layout";
import { Dashboard } from "./dashboard";

export default function Admin() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
