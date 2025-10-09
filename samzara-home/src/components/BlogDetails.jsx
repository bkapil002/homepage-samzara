import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2 } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Scroll to top when the page opens
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/blog/${id}`
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
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading post...
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
      {/* ✅ Banner Section */}
      {post.mainImage && (
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[420px] overflow-hidden mb-8">
          {/* Banner Image */}
          <img
            src={post.mainImage}
            alt="Main"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Title Box */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
            <div className="relative bg-gray-900/70 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg w-full sm:w-auto max-w-3xl flex items-center justify-between">
              {/* Title */}
              <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-snug flex-1 text-center sm:text-left">
                {post.title}
              </h1>

              {/* Share Icon (Hidden on very small screens) */}
              <button
                onClick={() =>
                  navigator.share({
                    title: post.title,
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
