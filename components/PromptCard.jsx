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

// platforms
const platformUrls = {
  ChatGPT: { prefill: true, url: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}` },
  Perplexity: { prefill: true, url: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}` },
  Gemini: { prefill: false, url: () => `https://gemini.google.com/` },
  "Claude Sonnet 4.5": { prefill: false, url: () => `https://claude.ai/new` },
  "Cursor AI": { prefill: false, url: () => `https://cursor.sh/` },
  "GitHub Copilot": { prefill: false, url: () => `https://github.com/features/copilot` },
  Veo: { prefill: false, url: () => `https://aistudio.google.com/prompts/new_chat` },
  Grok: { prefill: false, url: () => `https://x.ai/` },
  "DALL·E 3": { prefill: false, url: () => `https://openai.com/dall-e-3` },
  Pixlr: { prefill: false, url: () => `https://pixlr.com/` },
  "OpenAI Sora": { prefill: false, url: () => `https://openai.com/sora` },
  "Hailuo AI": { prefill: false, url: () => `https://hailuoai.com/` },
};

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, searchText }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedCount, setCopiedCount] = useState(post.copiedCount || 0);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [tooltip, setTooltip] = useState("");

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

  const updateCopyCount = async () => {
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

  const handleCopy = async () => {
    if (!session?.user?.id) return alert("Login to copy prompts");
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
    updateCopyCount();
  };

  const handlePlatformClick = async (platform) => {
    if (!session?.user?.id) return alert("Login to use this feature");
    await navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    updateCopyCount();

    const platformData = platformUrls[platform];
    if (platformData) {
      const url = platformData.prefill
        ? platformData.url(post.prompt)
        : platformData.url();

      if (!platformData.prefill) {
        setTooltip("Prompt copied ✔️ — paste it in the platform");
        setTimeout(() => setTooltip(""), 3000);
      }

      window.open(url, "_blank");
    } else {
      setTooltip("No link available — prompt copied ✔️");
      setTimeout(() => setTooltip(""), 3000);
    }
  };

  return (
    <div
      className="prompt_card p-3 sm:p-4 xl:w-full w-44   
                 rounded-xl shadow-md bg-white dark:bg-gray-900 relative 
                 transition-transform hover:scale-[1.02]"
    >
      {/* Floating Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full 
                     bg-gray-100 dark:bg-gray-700 hover:scale-110 transition"
        >
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="copy_icon"
            width={20}
            height={20}
          />
        </button>

        <button
          onClick={handleSave}
          className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full 
                     bg-gray-300 dark:bg-gray-400 hover:scale-110 transition"
        >
          <Image
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save_icon"
            width={20}
            height={20}
          />
        </button>
      </div>

      <div className="mt-10">
        {/* Media */}
        {post.mediaUrl && (
          <div className="mt-3">
            {post.mediaUrl.endsWith(".mp4") || post.mediaUrl.includes("youtube") ? (
              <video src={post.mediaUrl} controls loop className="w-full rounded-lg" />
            ) : (
              <img
                src={post.mediaUrl}
                alt="demo"
                className="w-full rounded-lg object-cover max-h-48 sm:max-h-full"
              />
            )}
          </div>
        )}

        {/* Heading */}
        {post.heading && (
          <h2 className="mt-3 font-satoshi text-sm sm:text-lg font-bold text-gray-800 dark:text-white leading-tight">
            {highlightText(
              showFullPrompt
                ? post.heading
                : post.heading.slice(0, 50) + (post.heading.length > 50 ? "..." : ""),
              searchText
            )}
            {post.heading.length > 50 && (
              <button
                className="ml-2 text-blue-500 dark:text-blue-300 text-xs underline"
                onClick={() => setShowFullPrompt(!showFullPrompt)}
              >
                {showFullPrompt ? "Show less" : "Show more"}
              </button>
            )}
          </h2>
        )}

        {/* Prompt */}
        {post.prompt && (
          <p className="my-2 sm:my-4 font-satoshi text-xs sm:text-sm text-gray-700 dark:text-slate-400 leading-snug">
            {highlightText(
              showFullPrompt
                ? post.prompt
                : post.prompt.slice(0, 30) + (post.prompt.length > 30 ? "..." : ""),
              searchText
            )}
            {post.prompt.length > 30 && (
              <button
                className="ml-2 text-blue-500 dark:text-blue-300 text-xs underline"
                onClick={() => setShowFullPrompt(!showFullPrompt)}
              >
                {showFullPrompt ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        )}

        {/* Profile */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer mt-2"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col max-w-[70%] sm:max-w-[80%] overflow-hidden">
  <h3
    className="font-satoshi font-semibold text-xs sm:text-sm 
               truncate overflow-hidden whitespace-nowrap 
               text-gray-900 dark:text-white"
  >
    {highlightText(post.creator.username, searchText)}
  </h3>
</div>

        </div>

        {/* Copied Count */}
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
          Used by {copiedCount} {copiedCount === 1 ? "user" : "users"}
        </p>

        {/* Categories */}
        {post.categories?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
            {post.categories.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                {highlightText(cat, searchText)}
              </span>
            ))}
          </div>
        )}

        {/* Tag */}
        {post.tag && (
          <p
            className="mt-1 font-inter text-xs sm:text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick?.(post.tag)}
          >
            #{highlightText(post.tag, searchText)}
          </p>
        )}

        {/* Platforms */}
        {post.platforms?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.platforms.map((plat, i) => {
              const platformData = platformUrls[plat];
              const needsManual = platformData && !platformData.prefill;

              return (
                <button
                  key={i}
                  onClick={() => handlePlatformClick(plat)}
                  className="relative px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md z-40
                            bg-green-100 dark:bg-green-800 
                            text-green-700 dark:text-green-200 
                            hover:scale-105 transition"
                >
                  <span className="relative group">
                    {highlightText(plat, searchText)}
                    <span
                      className="absolute -top-7 left-1/2 -translate-x-1/2
                                 px-2 py-1 text-[9px] sm:text-[10px] rounded z-50
                                 bg-gray-800 text-white whitespace-nowrap shadow-md
                                 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {needsManual ? "Copy & paste manually" : "Click to open"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Timestamp */}
        {post.createdAt && (
          <p className="mt-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Edit/Delete */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-4 sm:mt-5 flex gap-3 border-t border-gray-100 dark:border-gray-700 pt-2 sm:pt-3">
          <p
            className="font-inter text-xs sm:text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit?.(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-xs sm:text-sm orange_gradient cursor-pointer"
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
