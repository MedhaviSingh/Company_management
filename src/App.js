import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ManagerPanel from "./pages/ManagerPanel";
import EmployeePanel from "./pages/EmployeePanel";
import UserInfo from "./pages/UserInfo";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <UserProvider>
        {/* Wrap the application in the UserProvider to provide user context */}
        <Header />
        <Routes>
          {/* Public route for login */}
          <Route path="/" element={<Login />} />

          {/* Private route for the dashboard, accessible to all roles */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "manager", "employee"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Private route for admin panel, accessible to admin role only */}
          <Route
            path="admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Private route for manager panel, accessible to manager role only */}
          <Route
            path="manager"
            element={
              <PrivateRoute allowedRoles={["manager"]}>
                <ManagerPanel />
              </PrivateRoute>
            }
          />

          {/* Private route for employee panel, accessible to employee role only */}
          <Route
            path="employee"
            element={
              <PrivateRoute allowedRoles={["employee"]}>
                <EmployeePanel />
              </PrivateRoute>
            }
          />

          {/* Private route for users, accessible to admin role only */}
          <Route
            path="users"
            element={
              <PrivateRoute allowedRoles={["admin", "manager", "employee"]}>
                <Users />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
