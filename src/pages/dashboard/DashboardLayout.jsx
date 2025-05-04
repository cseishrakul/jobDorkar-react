import React, { useContext, useState } from "react";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/sideBar/Sidebar";
import Profile from "../../components/dashboard/profile/Profile";
import Main from "../../ui/Main";
import Content from "../../ui/content/Content";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        toogleSidebar={toogleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} darkMode={darkMode} />
      <Main darkMode={darkMode}>
        <Content>
          <Outlet />
        </Content>
        <Profile darkMode={darkMode} user={userData} />
      </Main>
    </div>
  );
};

export default DashboardLayout;
