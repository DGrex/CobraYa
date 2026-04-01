import { Route, Routes } from "react-router";
import RootLayout from "./layouts/root.layout";
import PublicLayout from "./layouts/public.layout";
import AdminLayout from "./layouts/admin.layout";
import AuthLayout from "./layouts/auth.layout";
import DashboardPage from "./pages/admin/dashboard.page";
import HomePage from "./pages/public/home.page";
import NotFoundPage from "./pages/public/not-found.page";
import RegisterClientPage from "./pages/admin/register-client.page";
import SalesPage from "./pages/admin/sales.page";
import PaymentsPage from "./pages/admin/payments.page";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout/>}>

        {/* Public Routes */}
        <Route element={<PublicLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>

        {/* Protected Routes */}
        <Route path="admin" element={<AdminLayout/>}>
          <Route index element={<DashboardPage/>}/>
          <Route path="register-client" element={<RegisterClientPage/>}/>
          <Route path="sales" element={<SalesPage/>}/>
          <Route path="payments" element={<PaymentsPage/>}/>
        </Route>

        {/* Authentication Routes */}
        <Route  path="auth" element={<AuthLayout/>}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
