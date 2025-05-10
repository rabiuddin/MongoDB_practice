import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-center items-center px-4">
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/insert"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Insert
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/find"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Find
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/update"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Update
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/delete"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Delete
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/index"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Index
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `hover:underline transition duration-300 px-3 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : ""
                  }`
                }
              >
                Collection
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
