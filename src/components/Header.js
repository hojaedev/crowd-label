import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, handleLogin, getShortAddress, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
    if (!isLoggedIn) setDropdownOpen(false);
  }, [isLoggedIn]);

  useEffect(() => {}, [isLoggedIn, handleLogin, getShortAddress]);

  return (
    <nav className="bg-black border-gray-200 px-28 py-2.5 w-screen z-10 sticky">
      <div className="flex flex-wrap justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img
            src="/logo.svg"
            className="mr-3 h-6 sm:h-9 brightness-75	"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Crowd Label
          </span>
        </Link>
        {isLoggedIn && (
          <div className="flex flex-row space-x-10 list-none">
            <li>
              <Link
                to="/upload"
                className='"block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"'
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/label"
                className='"block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"'
              >
                Label
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className='"block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"'
              >
                Browse
              </Link>
            </li>
          </div>
        )}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => {
                if (!isLoggedIn) {
                  handleLogin();
                } else {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              {isLoggedIn ? getShortAddress() : "Connect Wallet"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
              onClick={handleLogout}
            >
              <div className="py-1" role="none">
                <Link
                  to={"/"}
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  Disconnect Wallet
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
