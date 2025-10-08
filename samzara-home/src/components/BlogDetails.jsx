import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2 } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams(); // get the blog ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className=" mx-auto ">
      {/* Banner Section */}
      {post.mainImage && (
        <div className="relative w-full h-80 overflow-hidden mb-8 ">
          {/* Main Image */}
          <img
            src={post.mainImage}
            alt="Main"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Centered Title Box */}
          <div className="absolute mt-28 inset-0 flex items-center justify-center">
            <div className="relative bg-gray-900/60 text-white px-6 py-4 max-w-3xl flex items-center justify-between w-full sm:w-auto ">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold leading-snug  flex-1">
                {post.title}
              </h1>

              {/* Share Icon */}
              <button
                onClick={() =>
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  })
                }
                className="ml-4  cursor-pointer p-2 rounded-md transition duration-200"
              >
                <Share2 size={30} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="prose px-4  sm:px-8 md:px-19 lg:px-16 max-w-none mb-6 custom-content"
        style={{
          color: "#3C3C3C",
          fontSize: "14px",
          lineHeight: "1.8",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogDetails;
