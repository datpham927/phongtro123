import NavigateComponent from "../../components/NavigateComponent";
import { Link, Outlet } from "react-router-dom";
import SidebarComponent from "../../components/SidebarComponent";

function System() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex bg-blue-custom  ">
        <Link
          to="/"
          className="flex justify-center items-center mr-5 ml-4 text-white font-semibold"
        >
          phongtro123.com
        </Link>
        <NavigateComponent />
      </div>
      <div className="flex h-full">
        <div className="w-1/6 bg-primary-bg h-auto">
          <SidebarComponent />
        </div>
        <div className="w-5/6 h-full overflow-scroll py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default System;
