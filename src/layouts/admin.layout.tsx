import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { data: signInCheckResult, hasEmitted, status } = useSigninCheck();

  if (status == "loading" || !hasEmitted) {
    return <div>Loading ...</div>;
  }

  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense>
      <AuthenticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({ suspense: true });
  return (
    <div className="h-screen min-h-screen overflow-hidden flex flex-col">
      <Navbar/>
      <div className="flex-1 overflow-auto">
         <Outlet />
      </div>      
    </div>
  );
};
