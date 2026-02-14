import { memo, useContext } from "react";
import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Menubar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>

          <main
            className="flex-1 mx-4 md:mx-6 lg:mx-8 py-6 pb-12 min-h-[calc(100vh-65px)]"
            role="main"
          >
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default memo(Dashboard);
