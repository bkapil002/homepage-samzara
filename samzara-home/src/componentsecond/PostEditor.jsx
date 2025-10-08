import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);

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
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "align",
  ];

  // Trigger file input
  const handleAddMediaClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  // Upload a single file to backend (Cloudinary)
  async function uploadImageToServer(file, filename = null) {
    const formData = new FormData();
    const uniqueName = filename || `${Date.now()}_${file.name}`;
    formData.append("mainImage", file, uniqueName);

    const res = await fetch("http://localhost:5000/api/posts/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.url;
  }

  // Upload embedded images in ReactQuill content
  async function uploadEmbeddedImages(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const images = div.querySelectorAll("img");
    let embeddedImages = [];

    for (const img of images) {
      if (img.src.startsWith("data:")) {
        // Convert dataURL to blob
        const arr = img.src.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const blob = new Blob([u8arr], { type: mime });

        // Upload with unique filename
        const uploadedUrl = await uploadImageToServer(blob, `embedded_${Date.now()}_${Math.floor(Math.random() * 1000)}.png`);
        img.src = uploadedUrl;
        embeddedImages.push(uploadedUrl);
      } else {
        embeddedImages.push(img.src);
      }
    }

    return { html: div.innerHTML, embeddedImages };
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please add title and content");
      return;
    }

    setIsPublishing(true);
    try {
      let mainImageUrl = "";
      if (mainImageFile) {
        mainImageUrl = await uploadImageToServer(mainImageFile);
      }

      const { html: contentWithCloudinary, embeddedImages } = await uploadEmbeddedImages(content);

      // Send post data to backend
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: contentWithCloudinary,
          embeddedImages,
          mainImage: mainImageUrl,
        }),
      });

      if (!res.ok) throw new Error("Post creation failed");
      alert("Post published successfully!");

      // Reset form
      setTitle("");
      setContent("");
      setImageName("");
      setImagePreview(null);
      setMainImageFile(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 py-8">
      <input
        type="text"
        placeholder="Heading"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-semibold border border-gray-300 rounded-md p-3"
      />

      <div className="p-4 rounded-md">
        <button
          type="button"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md border mb-3"
          onClick={handleAddMediaClick}
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
        {imageName && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">
              Uploaded: <span className="font-medium">{imageName}</span>
            </p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border border-gray-300"
              />
            )}
            <button
              type="button"
              className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded"
              onClick={() => {
                setImageName("");
                setImagePreview(null);
                setMainImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="rounded-md p-2">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Write Your Content
        </h3>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Start writing your content here..."
          className="h-96"
        />
      </div>

      <button
        type="button"
        onClick={handlePublish}
        disabled={isPublishing}
        className={`px-6 py-3 bg-blue-600 mt-4 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${isPublishing ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
