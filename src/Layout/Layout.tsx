import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
