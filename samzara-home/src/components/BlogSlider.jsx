import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation ,Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft ,ChevronRight  } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const BlogSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/posts/all-posts"); 
        console.log("Fetched posts:", res.data); // Debug log
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">No blogs found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 md:px-19 lg:px-16 max-w-7xl mx-auto py-8 ">
      
      <Swiper
        modules={[Navigation,Autoplay]}
        navigation={{
          nextEl: ".custom-next-button",
          prevEl: ".custom-prev-button",
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={posts.length > 3}
         autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <div onClick={() => navigate(`/blog/${post._id}`)}  className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-lg h-full flex flex-col hover:shadow-xl transition-shadow">
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
                <div className="text-2xl font-bold text-gray-800">
                  {new Date(post.createdAt).getDate()}
                </div>
                <div className="text-xs text-gray-600 uppercase">
                  {new Date(post.createdAt).toLocaleString('en', { month: 'short' })}
                </div>
              </div>
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={post.mainImage || "https://findrehabcentres.com/wp-content/uploads/2025/10/Taking-the-First-Step-Toward-Healing.jpg" }
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 hover:text-[#2C2D5B] transition-colors cursor-pointer">
                  {post.title}
                </h3>        
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <button className="custom-prev-button w-12 h-12  cursor-pointer flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all text-2xl font-bold text-gray-700">
          <ChevronLeft />
        </button>
        <button className="custom-next-button w-12 h-12 cursor-pointer flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all text-2xl font-bold text-gray-700">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BlogSlider;