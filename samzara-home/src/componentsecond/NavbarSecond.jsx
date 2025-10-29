import React, { useState, useRef, useEffect } from "react";
import logo from "../Image/LOGO.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const NavbarSecond = () => {
  const navigate = useNavigate();
  const { logout ,user} = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL
  
   const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/user/logOut`, {
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
          <img src={logo} alt="Logo" className="w-full "loading="lazy"/>
        </div>

      

        {/* Links (desktop) */}
        <div className=" md:flex items-center space-x-6">
         
          <div className="flex justify-center items-center gap-3 font-medium">
             <li
              onClick={!loading ? handleLogout : undefined}
              className={`flex items-center justify-center gap-2 bg-indigo-900 text-white text-[13px] px-[16px] py-1 rounded-full transition 
                ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:bg-indigo-800"}`}
            >
             {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging out..." : "Log Out"}
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSecond;