import React, { useState, useRef, useEffect } from "react";
import logo from "../Image/LOGO.png";

const Navebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="shadow-lg bg-white">
      <div className="flex items-center justify-between py-4 px-4 sm:px-8 md:px-19 lg:px-16">
        {/* Logo */}
        <a href="/" className="flex w-[120px] md:w-[153px]">
          <img src={logo} alt="Logo" className="w-full"/>
        </a>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="30" className="text-gray-600" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Links (desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="https://findrehabcentres.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#707070] text-[20px] font-semibold"
          >
            Find Rehab
          </a>
          <div className="flex justify-center items-center gap-3 font-medium">
            <a
              href="https://community.samzara.in/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666767] text-[13px]"
            >
              Sign Up
            </a>
            <a
              href="https://community.samzara.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-900 text-white text-[13px] px-[16px] py-1 cursor-pointer rounded-full"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden px-4 pb-4">
          <a
            href="https://findrehabcentres.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#707070]  text-center text-[16px] font-semibold py-1"
          >
            Find Rehab
          </a>
          <div className="flex flex-col gap-1 pt-2">
            <a
              href="https://community.samzara.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-900 text-white text-[14px] px-[16px] py-2 mt-1 cursor-pointer rounded-full text-center"
            >
              Sign Up / Sign In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navebar;