/**
 * ProtectedRoute.tsx
 * -------------------
 * Wraps any route that requires an authenticated session.
 * - While loading: renders a centered spinner.
 * - If no session: redirects to /auth (preserving the intended destination).
 * - If session exists: renders children.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    // Pass current path as `from` so Auth.tsx can redirect back after sign-in
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
