import React, { useState } from "react";
import { cities, rehabs } from "./RehabsData";

export default function TopRehabs() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 4;

  // Filtering logic
  const filteredRehabs = rehabs.filter((rehab) => {
    const cityMatch =
      selectedCity === "All" ||
      rehab.location.toLowerCase().includes(selectedCity.toLowerCase());
    return cityMatch;
  });

  const paginated = filteredRehabs.slice(
    page * perPage,
    page * perPage + perPage
  );

  return (
    <div className="bg-white flex flex-col items-center mt-9 w-full px-4 sm:px-8 md:px-19 lg:px-16">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl text-center sm:text-4xl md:text-[50px] md:text-left text-[#2A2A72] mb-3">
            Top Rehabs near You
          </h1>
          <p className="text-gray-600 text-center mb-4 md:mb-8 text-sm sm:text-base">
            Most Brilliant reasons SamZara should be your one-stop-shop!
          </p>
        </div>

        {/* Filters */}
        <div className="flex  sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Custom Dropdown */}
          <div className="relative w-full sm:w-44">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center  justify-between border border-[#2A2A72] rounded-full py-2 px-4 text-[#2A2A72] font-medium outline-1 outline-gray-300 focus:outline-2 focus:outline-[#2A2A72] transition-all"
            >
             <p className=" line-clamp-1">{selectedCity}</p> 
              {isOpen ? (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsOpen(false);
                      setPage(0);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Buttons */}
          <div className="flex flex-row gap-2 justify-start sm:justify-center  sm:mt-0">
            <button
              className="bg-green-600 rounded-full p-2 hover:bg-green-700 transition-colors disabled:opacity-40"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous"
            >
              <svg width="24" height="24" fill="white">
                <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <button
              className="bg-green-600 rounded-full p-2 hover:bg-green-700 transition-colors disabled:opacity-40"
              onClick={() => setPage(page + 1)}
              disabled={(page + 1) * perPage >= filteredRehabs.length}
              aria-label="Next"
            >
              <svg width="24" height="24" fill="white">
                <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {paginated.map((rehab, i) => (
            <RehabCard key={i} {...rehab} featured={i === 0 && page === 0} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No rehabs found.</p>
      )}
    </div>
  );
}

// Card Component
function RehabCard({ name, location, image, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg group h-56 sm:h-60 w-full flex flex-col justify-end transform hover:scale-105 transition duration-300 cursor-pointer"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all" />
        <div className="relative z-10 p-3 sm:p-4">
          <div className="text-white text-base sm:text-lg font-semibold drop-shadow-md">
            {name}
          </div>
          <div className="text-gray-200 text-xs sm:text-sm">{location}</div>
        </div>
      </div>
    </a>
  );
}