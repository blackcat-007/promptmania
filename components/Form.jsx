"use client";
import Link from "next/link";
import { useState } from "react";
import { Cloud } from "lucide-react"; // cloud icon from lucide-react (lightweight & clean)
const categoriesList = ["fun", "art", "ai images", "ai videos", "coding", "json"];
const platformsList = ["ChatGPT", "Gemini", "Perplexity", "Veo", "Grok"];

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [loading, setLoading] = useState(false);

  const toggleCategory = (cat) => {
    setPost({
      ...post,
      categories: post.categories.includes(cat)
        ? post.categories.filter((c) => c !== cat)
        : [...post.categories, cat],
    });
  };

  const togglePlatform = (plat) => {
    setPost({
      ...post,
      platforms: post.platforms.includes(plat)
        ? post.platforms.filter((p) => p !== plat)
        : [...post.platforms, plat],
    });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world
      </p>

      {/* Warning Section */}
      <div className="border-l-4 mt-2 border-red-500 bg-red-50 dark:bg-red-950 p-4 rounded-md">
        <h3 className="text-red-700 font-semibold flex items-center gap-2">
          ⚠️ Warning!
        </h3>
        <p className="mt-2 text-red-600">
          Your prompt must follow our community guidelines.{" "}
          <strong>No violent, offensive, or inappropriate content.</strong>
        </p>
        <ul className="mt-2 ml-4 list-disc text-red-600">
          <li>First violation → Prompt deleted</li>
          <li>Repeated violations → Account blocked</li>
        </ul>
        <p className="mt-2 text-red-700 font-medium">Create responsibly! 🚀</p>
        <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          <Link href="/community-guidelines">
            Read the full Community Guidelines
          </Link>
        </p>
      </div>

      {/* Instructions Section */}
      <div className="border-l-4 mt-6 border-blue-500 bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
        <h3 className="text-blue-700 font-semibold flex items-center gap-2">
          📝 How to Create a Great Prompt
        </h3>
        <ul className="mt-2 ml-4 list-disc text-blue-600 space-y-1">
          <li>
            <strong>Write a clear heading:</strong> Be descriptive.
          </li>
          <li>
            <strong>Write the prompt text:</strong> Keep it specific.
          </li>
          <li>
            <strong>Select categories and platforms:</strong> Help users find it.
          </li>
          <li>
            <strong>Add tags/subcategories:</strong> Improve search.
          </li>
          <li>
            <strong>Upload Demo:</strong> Add generated images/videos.
          </li>
          <li>
            <strong>Privacy:</strong> Public = everyone sees, Private = only you.
          </li>
        </ul>
        <p className="mt-2 text-blue-700 font-medium">
          Create responsibly and make your prompt shine! ✨
        </p>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Heading */}
        <label>
          <span className="font-semibold">Heading</span>
          <input
            value={post.heading}
            onChange={(e) => setPost({ ...post, heading: e.target.value })}
            placeholder="Enter heading"
            required
            className="form_input"
          />
        </label>

        {/* Prompt */}
        <label>
          <span className="font-semibold">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            required
            className="form_textarea"
          />
        </label>

        {/* Categories */}
        <label>
          <span className="font-semibold">Categories</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoriesList.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm ${
                  post.categories.includes(cat)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </label>

        {/* Tag */}
        <label>
          <span className="font-semibold">Tags/Subcategories</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#tags for better search"
            required
            className="form_input"
          />
        </label>

        {/* Platforms */}
        <label>
          <span className="font-semibold">Platforms</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {platformsList.map((plat) => (
              <button
                type="button"
                key={plat}
                onClick={() => togglePlatform(plat)}
                className={`px-3 py-1 rounded-full text-sm ${
                  post.platforms.includes(plat)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-slate-600"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </label>

        {/* Media Upload */}
        <label>
          <span className="font-semibold">Upload Image/Video</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              try {
                setLoading(true); // show loader
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                if (data.url) {
                  setPost({
                    ...post,
                    mediaUrl: data.url,
                    mediaPublicId: data.public_id,
                  });
                }
              } catch (err) {
                console.error("Upload failed", err);
              } finally {
                setLoading(false); // hide loader
              }
            }}
            className="form_input"
          />

          {/* Loader */}
          {loading && (
            <div className="mt-3 flex flex-col items-center justify-center text-orange-600">
              <Cloud className="w-12 h-12 text-orange-500 animate-pulse" />
              <p className="mt-2 font-medium">Please wait, media is uploading...</p>
            </div>
          )}

          {/* Preview */}
          {!loading && post.mediaUrl && (
            <div className="mt-3">
              {post.mediaUrl.includes("video") ? (
                <video src={post.mediaUrl} controls className="max-h-64 rounded-lg" />
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="Preview"
                  className="max-h-64 rounded-lg"
                />
              )}
            </div>
          )}
        </label>

        {/* Public/Private */}
        <label className="flex items-center gap-3">
          <span className="font-semibold">Make Public?</span>
          <input
            type="checkbox"
            checked={post.isPublic}
            onChange={(e) => setPost({ ...post, isPublic: e.target.checked })}
            className="toggle-checkbox"
          />
        </label>

        {/* Buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
