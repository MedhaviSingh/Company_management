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
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "manager", "employee"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="manager"
            element={
              <PrivateRoute allowedRoles={["manager"]}>
                <ManagerPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="employee"
            element={
              <PrivateRoute allowedRoles={["employee"]}>
                <EmployeePanel />
              </PrivateRoute>
            }
          />
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
