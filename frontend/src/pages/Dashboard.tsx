// import { useState } from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/AuthStore";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

// const Dashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const { user } = useAuthStore();

//   if (!user) return <Navigate to={"/signin"} replace />;

//   return (
//     <div className="h-screen flex flex-col bg-white">
//       <Navbar setSidebarOpen={setSidebarOpen} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar isSidebarOpen={isSidebarOpen} />
//         <main
//           className={`flex-1 mt-16 h-[calc(100vh-4rem)] overflow-auto transition-all duration-300 ${
//             isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
//           }`}
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
// import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuthStore();

  if (!user) return <Navigate to={"/signin"} replace />;

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      // Assuming lg breakpoint is 1024px
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* <Navbar setSidebarOpen={setSidebarOpen} /> */}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main
          className={`flex-1 mt-16 h-[calc(100vh-4rem)] overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
