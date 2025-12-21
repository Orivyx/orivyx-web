import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/landing";
import Admin from "./pages/admin";
import { ProtectedRoute } from "./auth/ProtectedRoute";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
