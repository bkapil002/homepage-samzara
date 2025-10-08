import React, { useState, useRef, useEffect } from "react";
import logo from "../Image/LOGO.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const NavbarSecond = () => {
  const navigate = useNavigate();
  const { logout ,user} = useContext(AuthContext); 

   const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/logOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        logout();
        navigate("/");
         window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="shadow-lg bg-white">
      <div className="flex items-center justify-between py-4 px-4 sm:px-8 md:px-19 lg:px-16">
        <div className="flex w-[120px] md:w-[153px]">
          <img src={logo} alt="Logo" className="w-full"/>
        </div>

      

        {/* Links (desktop) */}
        <div className=" md:flex items-center space-x-6">
         
          <div className="flex justify-center items-center gap-3 font-medium">
            <li
              onClick={handleLogout}
              className="bg-indigo-900 text-white text-[13px] px-[16px] py-1 cursor-pointer rounded-full"
            >
              Log Out
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSecond;