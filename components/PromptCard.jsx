"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// --- Helper to highlight search term with animation ---
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

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      {/* Top section */}
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 dark:text-white">
              {highlightText(post.creator.username, searchText)}
            </h3>
            <p className="font-inter text-sm text-gray-500 dark:text-slate-300">
              {highlightText(post.creator.email, searchText)}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Media */}
      {post.mediaUrl && (
        <div className="mt-4">
          {post.mediaUrl.endsWith(".mp4") || post.mediaUrl.includes("youtube") ? (
            <video src={post.mediaUrl} controls className="w-full rounded-lg" />
          ) : (
            <Image
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
          {highlightText(post.heading, searchText)}
        </h2>
      )}

      {/* Prompt */}
      {post.prompt && (
        <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-slate-400">
          {highlightText(post.prompt, searchText)}
        </p>
      )}

      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
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

      {/* Tags */}
      {post.tag && (
        <p
          className="mt-2 font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{highlightText(post.tag, searchText)}
        </p>
      )}

      {/* Platforms */}
      {post.platforms && post.platforms.length > 0 && (
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

      {/* Edit/Delete */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
