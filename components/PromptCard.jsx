"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const highlightText = (text, search) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-yellow-300 dark:bg-yellow-600 animate-pulse-highlight"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, searchText }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedCount, setCopiedCount] = useState(post.copiedCount || 0);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (!session?.user?.id) return;

      const res = await fetch(`/api/saved/check`, {
        method: "POST",
        body: JSON.stringify({ promptId: post._id, userId: session.user.id }),
      });

      const data = await res.json();
      setIsSaved(data.isSaved);
    };

    checkSaved();
  }, [session?.user?.id, post._id]);

  const handleSave = async () => {
    if (!session?.user?.id) return alert("Please login to save prompts");

    if (isSaved) {
      await fetch("/api/saved", {
        method: "DELETE",
        body: JSON.stringify({ promptId: post._id, userId: session.user.id }),
      });
      setIsSaved(false);
    } else {
      await fetch("/api/saved", {
        method: "POST",
        body: JSON.stringify({ promptId: post._id, userId: session.user.id }),
      });
      setIsSaved(true);
    }
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = async () => {
    if (!session?.user?.id) return alert("Login to copy prompts");

    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);

    try {
      const res = await fetch(`/api/prompt/${post._id}/copy`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.id }),
      });

      const data = await res.json();
      setCopiedCount(data.copiedCount);
    } catch (err) {
      console.error("Failed to update copied count", err);
    }
  };

  return (
    <div className="prompt_card p-4 w-96 rounded-xl shadow-md bg-white dark:bg-gray-900">
      {/* Top section */}
       {/* Profile Section */}
 

  {/* Floating Action Buttons */}
  <div className="absolute top-4 right-4 flex gap-2 ">
    {/* Copy */}
    <button
      onClick={handleCopy}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition"
    >
      <Image
        src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
        alt={copied ? "tick_icon" : "copy_icon"}
        width={22}
        height={22}
      />
    </button>

    {/* Save */}
    <button
      onClick={handleSave}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-400 hover:scale-110 transition"
    >
      <Image
        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
        alt="save_icon"
        width={22}
        height={22}
      />
    </button>
      </div>
<div className="mt-9">
      {/* Media */}
      {post.mediaUrl && (
        <div className="mt-4">
          {post.mediaUrl.endsWith(".mp4") || post.mediaUrl.includes("youtube") ? (
            <video src={post.mediaUrl} controls loop className="w-full rounded-lg" />
          ) : (
            <img
              src={post.mediaUrl}
              alt="demo"
              width={500}
              height={300}
              className="w-full rounded-lg object-cover"
            />
          )}
        </div>
      )}

      {/* Heading */}
      {post.heading && (
        <h2 className="mt-3 font-satoshi text-lg font-bold text-gray-800 dark:text-white">
           {highlightText(
            showFullPrompt ? post.heading : post.heading.slice(0, 150) + (post.heading.length > 100 ? "..." : ""),
            searchText
          )}
          {post.heading.length > 100 && (
            <button
              className="ml-2 text-blue-500 dark:text-blue-300 text-xs underline"
              onClick={() => setShowFullPrompt(!showFullPrompt)}
            >
              {showFullPrompt ? "Show less" : "Show more"}
            </button>
          )}
        </h2>
      )}

      {/* Prompt (truncate with show more/less) */}
      {post.prompt && (
        <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-slate-400">
          {highlightText(
            showFullPrompt ? post.prompt : post.prompt.slice(0, 150) + (post.prompt.length > 150 ? "..." : ""),
            searchText
          )}
          {post.prompt.length > 150 && (
            <button
              className="ml-2 text-blue-500 dark:text-blue-300 text-xs underline"
              onClick={() => setShowFullPrompt(!showFullPrompt)}
            >
              {showFullPrompt ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      )}
   <div
    className="flex items-center gap-3 cursor-pointer"
    onClick={handleProfileClick}
  >
    <Image
      src={post.creator.image}
      alt="user_image"
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
    <div className="flex flex-col">
      <h3 className="font-satoshi font-semibold truncate text-gray-900 dark:text-white">
        {highlightText(post.creator.username, searchText)}
      </h3>
      
    </div>
  </div>
      {/* Copied Count */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Used by {copiedCount} {copiedCount === 1 ? "user" : "users"}
      </p>

      {/* Categories */}
      {post.categories?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.categories.map((cat, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {highlightText(cat, searchText)}
            </span>
          ))}
        </div>
      )}

      {/* Tag */}
      {post.tag && (
        <p
          className="mt-2 font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick?.(post.tag)}
        >
          #{highlightText(post.tag, searchText)}
        </p>
      )}

      {/* Platforms */}
      {post.platforms?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.platforms.map((plat, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-md bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
            >
              {highlightText(plat, searchText)}
            </span>
          ))}
        </div>
      )}

      {/* Timestamp */}
      {post.createdAt && (
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      )}
</div>
      {/* Edit/Delete */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex gap-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit?.(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete?.(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
