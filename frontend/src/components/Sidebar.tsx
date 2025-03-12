import { useNavigate } from "react-router-dom";
import { SIDE_NAV_ITEMS } from "../constants";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r transition-transform duration-300 ease-in-out z-40
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        ${isSidebarOpen ? "w-64" : "lg:w-16"}`}
    >
      <div className="flex flex-col gap-2 p-2">
        {SIDE_NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg text-gray-700"
          >
            <item.icon className="w-6 h-6 min-w-[24px]" />
            {isSidebarOpen && (
              <span className="text-sm truncate">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
