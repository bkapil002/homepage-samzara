import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = import.meta.env.VITE_API_URL
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/posts/blog/${id}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className=" animate-pulse mx-auto mb-20 space-y-8">

        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[420px] bg-gray-300 rounded-xl shimmer overflow-hidden">
          <div className="absolute animate-pulse  inset-0 flex items-center justify-center px-4 sm:px-8">
            <div className="bg-gray-400/60 rounded-lg w-full max-w-3xl px-6 py-4 shadow-lg overflow-hidden">
          
              <div className="h-6 sm:h-8 bg-gray-500 rounded w-3/4 mx-auto mb-3"></div>
              <div className="h-5 sm:h-8 bg-gray-500 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>


        <div className="space-y-3 animate-pulse  px-4 sm:px-8 md:px-19 lg:px-16 max-w-6xl">
          <div className="h-8 bg-gray-300 rounded w-5/6 mx-auto shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto shimmer"></div>
        </div>


        <div className="space-y-3 max-w-6xl px-4 sm:px-8 md:px-19 lg:px-16 mx-auto mt-6">
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6 shimmer"></div>
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
        </div>

 
        <div className="space-y-1 mx-auto px-4 sm:px-8 md:px-19 lg:px-16 max-w-6xl">
          <div className="h-8 bg-gray-300 rounded shimmer mx-auto"></div>
        </div>


        <div className="space-y-2 max-w-6xl mx-auto px-4 sm:px-8 md:px-19 lg:px-16">
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 mt-10">Post not found 😞</div>
    );
  }

  return (
    <div className="mx-auto">
      <Helmet>
        <title>{post.title || post.heading}</title>
        <meta
          name="description"
          content={post.description || post.content.slice(0, 160)}
        />
      </Helmet>
      {post.mainImage && (
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[420px] overflow-hidden mb-8">
          {/* Banner Image */}
          <img
            src={post.mainImage}
            loading="lazy"
            alt="Main"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* heading Box */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            <div className="relative bg-gray-900/70 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg w-full sm:w-auto max-w-3xl flex items-center justify-between">
              {/* heading */}
              <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-snug flex-1 text-center sm:text-left">
                {post.heading}
              </h1>

              {/* Share Icon (Hidden on very small screens) */}
              <button
                onClick={() =>
                  navigator.share({
                    heading: post.heading,
                    url: window.location.href,
                  })
                }
                className="ml-4 cursor-pointer p-2 rounded-md transition duration-200 hover:bg-white/10 flex items-center justify-center"
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Blog Content Section */}
      <div
        className="prose custom-content  px-4 sm:px-8 md:px-19 lg:px-16    max-w-none mb-8  "
        style={{
          color: "#3C3C3C",
          fontSize: "14px",
          lineHeight: "1.7",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogDetails;
