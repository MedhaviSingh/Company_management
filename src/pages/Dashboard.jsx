import React from "react";
import { useUser } from "../contexts/UserContext";
import AdminPanel from "./AdminPanel";
import ManagersPanel from "./ManagerPanel";
import EmployeePanel from "./EmployeePanel";

const Dashboard = () => {
  const {userInfo} = useUser()
  // Determine which panel to render based on the user's role
  const renderPanel = () => {
    if (!userInfo) {
      return <p>Loading user data...</p>; // Handle cases where user data isn't loaded yet
    }

    switch (userInfo.role) {
      case "admin":
        return <AdminPanel />;
      case "manager":
        return <ManagersPanel />;
      case "employee":
        return <EmployeePanel />;
      default:
        return <p>Unauthorized: Role not recognized.</p>;
    }
  };

  return (
    <div>
      {renderPanel()}
    </div>
  );
};

export default Dashboard;