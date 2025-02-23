"use client";
import { useEffect, useState, useRef } from "react";
import { getAccessToken, logout } from "@/utils/auth";
import LoginPopup from "../auth/LoginPop";
import RegisterPopup from "../auth/RegisterPop";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accessToken = getAccessToken() || null;
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileSidebarOpen(false);
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-primary/10">
        <div className="max-w-[1200px] mx-auto">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-24 px-4">
            {/* Logo and Search Section */}
            <div className="flex items-center flex-1 max-w-2xl">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations, activities..."
                    className="w-full py-2.5 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {token ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-primary font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsRegisterOpen(true);
                    }}
                    className="px-4 py-2 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary-light/10 rounded-full transition-colors"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-2 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between h-18 px-4">
            <button
              className="p-2 -ml-2"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <MenuIcon className="h-8 w-8 text-primary" />
            </button>

            <button onClick={() => setIsLoginOpen(true)} className="p-2 -mr-2">
              {token ? (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
              ) : (
                <span className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 text-white font-medium">
                  Login
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Login & Register Popups */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        setIsLoginOpen={setIsLoginOpen}
      />
    </header>
  );
};

export default Header;
