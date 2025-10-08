import React, { useState } from "react";
import { LayoutDashboard, Rss , Menu, X } from "lucide-react";

import PostEditor from "./PostEditor";
import BlogUpdate from "./BlogUpdate";

const HomeSecond = () => {
  const [active, setActive] = useState("dataAdded");
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">Admin Section</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                active === "dataAdded"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setActive("dataAdded");
                setIsOpen(false);
              }}
            >
              <Rss size={20} />
              <span>Uploda Blog</span>
            </li>
            <li
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                active === "allData"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setActive("allData");
                setIsOpen(false);
              }}
            >
              <LayoutDashboard size={20} />
              <span>All Blog</span>
            </li>
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <main className="flex-1 p-6 overflow-y-auto w-full">

        <div className="md:hidden mb-4">
          <button
            className="p-2 bg-blue-500 text-white rounded-md shadow"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        {active === "dataAdded" && (
          <div>
            <PostEditor/>
          </div>
        )}

        {active === "allData" && (
          <div>
           <BlogUpdate/>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeSecond;
