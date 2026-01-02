import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/landing";
import { Leads } from "./pages/leads";
import { Privacy } from "./pages/privacy";
import Admin from "./pages/admin";
import { AdminLeads } from "./pages/admin/leads";
import { AdminOverlord, AdminUserDetail } from "./pages/admin/overlord/page";
import { UsersProvider } from "./pages/admin/overlord/context";
import { ProtectedRoute } from "./auth/protectedRoute";
import { GoogleTag } from "./components/googleTag";
import { CookieConsent } from "./components/cookieConsent";
import { ScrollToTop } from "./components/scrollToTop";

export function App() {
  return (
    <UsersProvider>
      <ScrollToTop />
      <GoogleTag />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/ads" element={<Landing />} />
        <Route path="/forms" element={<Leads />} />
        <Route path="/privacy" element={<Privacy />} />

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
