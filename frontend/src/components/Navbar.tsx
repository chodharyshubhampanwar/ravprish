import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { Menu, Search, BellRing } from "lucide-react";

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
  const { user, signOut, loading, signInWithGoogle } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Create a ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(() => {
        navigate("/home");
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(() => navigate("/signin"));
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-50">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <img
        src="https://res.cloudinary.com/melenqli/image/upload/v1739880250/dah78d9kmslgswfbawht.svg"
        alt="Logo"
        className="h-6 ml-4 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 rounded-full py-2 pl-4 pr-10 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-3 top-2">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BellRing className="w-6 h-6 text-gray-700" />
        </button>

        {user ? (
          // Wrap the button and dropdown in a container with the ref.
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            >
              <img
                src={user.avatar || "/default-avatar.png"}
                className="w-8 h-8 rounded-full"
                alt="User Avatar"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      className="w-10 h-10 rounded-full"
                      alt="User Avatar"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
                    Help
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
                    Settings
                  </button>
                </div>
                <div className="p-2 border-t">
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
