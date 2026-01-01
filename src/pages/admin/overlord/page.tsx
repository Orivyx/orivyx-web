import { AdminLayout } from "../layout";
import { Overlord } from "./index";
import { UserDetail } from "./UserDetail";

export function AdminOverlord() {
  return (
    <AdminLayout>
      <Overlord />
    </AdminLayout>
  );
}

export function AdminUserDetail() {
  return (
    <AdminLayout>
      <UserDetail />
    </AdminLayout>
  );
}

