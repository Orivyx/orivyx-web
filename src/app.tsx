import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/landing";
import { Leads } from "./pages/leads";
import Admin from "./pages/admin";
import { AdminLeads } from "./pages/admin/leads";
import { AdminOverlord, AdminUserDetail } from "./pages/admin/overlord/page";
import { UsersProvider } from "./pages/admin/overlord/context";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { GoogleTag } from "./components/GoogleTag";

export function App() {
  return (
    <UsersProvider>
      <GoogleTag />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forms" element={<Leads />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/overlord"
          element={
            <ProtectedRoute>
              <AdminOverlord />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/overlord/:userId"
          element={
            <ProtectedRoute>
              <AdminUserDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UsersProvider>
  );
}
