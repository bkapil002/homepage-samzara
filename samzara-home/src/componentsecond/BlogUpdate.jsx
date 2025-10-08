import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Trash2, Pencil, X } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogUpdate = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [mainImageName, setMainImageName] = useState("");
  const fileInputRef = useRef();

  // Save button loading state
  const [saving, setSaving] = useState(false);

  // Utility to extract image URLs from HTML
  const extractImageUrls = (html) => {
    const doc = new window.DOMParser().parseFromString(html, "text/html");
    const imgs = Array.from(doc.querySelectorAll("img"));
    return imgs.map((img) => img.src);
  };

  // Check if image src is a data URL
  const isDataUrl = (url) => url.startsWith("data:image");

  // Upload a base64 image to server and get back its URL
  const uploadBase64Image = async (dataUrl) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], "embedded.jpg", { type: blob.type });
    const formData = new FormData();
    formData.append("mainImage", file);
    const uploadRes = await axios.post(
      "http://localhost:5000/api/posts/upload-image",
      formData
    );
    return uploadRes.data.url;
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/posts/all-posts");
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/posts/delete-posts/${id}`
        );
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setMainImagePreview(post.mainImage);
    setMainImageName(post.mainImage ? "Current Image" : "");
    setMainImageFile(null);
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImageName(file.name);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  // Save/update post, uploading embedded images only when saving
  const handleUpdate = async () => {
    setSaving(true);
    try {
      let mainImageUrl = mainImagePreview;

      // If a new main image is selected, upload it
      if (mainImageFile) {
        const formData = new FormData();
        formData.append("mainImage", mainImageFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/posts/upload-image",
          formData
        );

        mainImageUrl = uploadRes.data.url;
      }

      // Find all images in content
      let html = content;
      let imageUrls = extractImageUrls(html);

      // Upload any data URLs, replace in HTML
      for (let src of imageUrls) {
        if (isDataUrl(src)) {
          const uploadedUrl = await uploadBase64Image(src);
          html = html.replace(src, uploadedUrl);
        }
      }

      // Get final image URLs
      imageUrls = extractImageUrls(html);

      // Update the post
      await axios.put(
        `http://localhost:5000/api/posts/update-post/${editId}`,
        {
          title,
          content: html,
          mainImage: mainImageUrl,
          embeddedImages: imageUrls,
        }
      );

      alert("✅ Post updated successfully!");
      setIsEditing(false);
      fetchPosts();
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update post.");
    } finally {
      setSaving(false);
    }
  };

  // Quill toolbar configuration
  const quillRef = useRef();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "size",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "align",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Blog Posts
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 truncate w-3/4">
                  {post.title}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Post"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    title="Delete Post"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] md:w-[70%] lg:w-[60%] max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              ✏️ Edit Blog Post
            </h2>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Heading"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-semibold border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Main Image Upload */}
            <div className="p-4 border rounded-md mb-6 bg-gray-50">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md border"
              >
                Background Image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {mainImageName && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Uploaded: <span className="font-medium">{mainImageName}</span>
                  </p>
                  {mainImagePreview && (
                    <img
                      src={mainImagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border"
                    />
                  )}
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded mt-2"
                    onClick={() => {
                      setMainImageName("");
                      setMainImagePreview(null);
                      setMainImageFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div className="rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Write Your Content
              </h3>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Start writing your content..."
                className="h-64 mb-8"
              />
            </div>

            {/* Save Button with loading indicator */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={saving}
                className={`px-6 py-3 mt-15 font-semibold rounded-lg shadow-md transition ${
                  saving
                    ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogUpdate;