"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loader from "./loader"; // Your loader component
import Refresh from "./refresh"; // Your refresh button component

const categoriesList = ["fun", "art", "ai images", "ai videos", "coding", "json"];
const platformsList = ["ChatGPT", "Gemini", "Perplexity", "Veo", "Grok"];

const PromptCardList = ({ data, handleTagClick, searchText }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        searchText={searchText}
      />
    ))}
  </div>
);

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activePlatform, setActivePlatform] = useState("");
  const [trending, setTrending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/prompt", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch prompts");
      const data = await response.json();
      setAllPosts(data.filter(post => post.isPublic));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- Unified filter function ---
  const filterPrompts = (text = "", category = "", platform = "", isTrending = false) => {
    const regex = new RegExp(text, "i");
    let results = allPosts.filter(post => {
      let matchesSearch = true;
      if (text) {
        matchesSearch =
          regex.test(post.creator.username) ||
          (post.tag && regex.test(post.tag)) ||
          (post.heading && regex.test(post.heading)) ||
          (post.prompt && regex.test(post.prompt)) ||
          (post.categories?.some(cat => regex.test(cat))) ||
          (post.platforms?.some(plat => regex.test(plat)));
      }

      let matchesCategory = true;
      if (category) {
        matchesCategory = post.categories?.some(
          cat => cat.toLowerCase() === category.toLowerCase()
        );
      }

      let matchesPlatform = true;
      if (platform) {
        matchesPlatform = post.platforms?.some(
          plat => plat.toLowerCase() === platform.toLowerCase()
        );
      }

      return matchesSearch && matchesCategory && matchesPlatform;
    });

    if (isTrending) {
      results = results.sort((a, b) => {
        if (b.copiedCount !== a.copiedCount) {
          return b.copiedCount - a.copiedCount;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return results;
  };

  // --- Handlers ---
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setSearchedResults(filterPrompts(text, activeCategory, activePlatform, trending));
  };

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? "" : category;
    setActiveCategory(newCategory);
    setSearchedResults(filterPrompts(searchText, newCategory, activePlatform, trending));
  };

  const handlePlatformClick = (platform) => {
    const newPlatform = activePlatform === platform ? "" : platform;
    setActivePlatform(newPlatform);
    setSearchedResults(filterPrompts(searchText, activeCategory, newPlatform, trending));
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setActiveCategory("");
    setActivePlatform("");
    setSearchedResults(filterPrompts(tagName, "", "", trending));
  };

  const clearFilter = (type) => {
    if (type === "category") {
      setActiveCategory("");
      setSearchedResults(filterPrompts(searchText, "", activePlatform, trending));
    } else if (type === "platform") {
      setActivePlatform("");
      setSearchedResults(filterPrompts(searchText, activeCategory, "", trending));
    }
  };

  const handleTrendingClick = () => {
    const newTrending = !trending;
    setTrending(newTrending);
    setSearchedResults(filterPrompts(searchText, activeCategory, activePlatform, newTrending));
  };

  if (loading) return <Loader />; // Show loader while fetching
  if (error) return <Refresh onClick={fetchPosts} />; // Show refresh button on error

  return (
    <section className="feed">
      {/* Search bar */}
      <form className="relative w-full flex-center mb-4">
        <input
          type="text"
          placeholder="Search by username, tag, category, heading, prompt, or platform"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Quick filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesList.map((cat, i) => (
          <button
            key={i}
            type="button"
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}

        {platformsList.map((plat, i) => (
          <button
            key={i}
            type="button"
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              activePlatform === plat
                ? "bg-green-600 text-white shadow-lg"
                : "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700"
            }`}
            onClick={() => handlePlatformClick(plat)}
          >
            {plat}
          </button>
        ))}

        {/* 🔥 Trending button */}
        <button
          type="button"
          className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            trending
              ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg animate-pulse"
              : "bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-700"
          }`}
          onClick={handleTrendingClick}
        >
          🔥 Trending
        </button>
      </div>

      {/* Active filters display */}
      {(activeCategory || activePlatform || trending) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Filtered by:</span>
          {activeCategory && (
            <span
              className="px-2 py-1 rounded-full bg-blue-600 text-white text-sm cursor-pointer"
              onClick={() => clearFilter("category")}
            >
              {activeCategory} ✕
            </span>
          )}
          {activePlatform && (
            <span
              className="px-2 py-1 rounded-full bg-green-600 text-white text-sm cursor-pointer"
              onClick={() => clearFilter("platform")}
            >
              {activePlatform} ✕
            </span>
          )}
          {trending && (
            <span
              className="px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm cursor-pointer"
              onClick={handleTrendingClick}
            >
              Trending ✕
            </span>
          )}
        </div>
      )}

      {/* Display prompts */}
      <PromptCardList
        data={
          searchText || activeCategory || activePlatform || trending
            ? searchedResults
            : allPosts
        }
        handleTagClick={handleTagClick}
        searchText={searchText}
      />
    </section>
  );
};

export default Feed;
