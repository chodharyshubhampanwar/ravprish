import Nav from "@/components/Nav";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
