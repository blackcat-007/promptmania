"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const categoriesList = ["fun", "art", "ai images", "ai videos", "coding", "json"];
const platformsList = ["ChatGPT", "Gemini", "Perplexity", "Veo", "Grok"];

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  return (
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
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activePlatform, setActivePlatform] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { cache: "no-store" });
    const data = await response.json();
    // Only public posts for feed
    setAllPosts(data.filter(post => post.isPublic));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- Unified filter ---
  const filterPrompts = (text = "", category = "", platform = "") => {
    const regex = new RegExp(text, "i");
    return allPosts.filter(post => {
      // Filter by search text
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

      // Filter by category
      let matchesCategory = true;
      if (category) {
        matchesCategory = post.categories?.some(cat => cat.toLowerCase() === category.toLowerCase());
      }

      // Filter by platform
      let matchesPlatform = true;
      if (platform) {
        matchesPlatform = post.platforms?.some(plat => plat.toLowerCase() === platform.toLowerCase());
      }

      return matchesSearch && matchesCategory && matchesPlatform;
    });
  };

  // --- Handlers ---
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setSearchedResults(filterPrompts(text, activeCategory, activePlatform));
  };

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? "" : category;
    setActiveCategory(newCategory);
    setSearchedResults(filterPrompts(searchText, newCategory, activePlatform));
  };

  const handlePlatformClick = (platform) => {
    const newPlatform = activePlatform === platform ? "" : platform;
    setActivePlatform(newPlatform);
    setSearchedResults(filterPrompts(searchText, activeCategory, newPlatform));
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    setActiveCategory("");
    setActivePlatform("");
    setSearchedResults(filterPrompts(tagName, "", ""));
  };

  const clearFilter = (type) => {
    if (type === "category") {
      setActiveCategory("");
      setSearchedResults(filterPrompts(searchText, "", activePlatform));
    } else if (type === "platform") {
      setActivePlatform("");
      setSearchedResults(filterPrompts(searchText, activeCategory, ""));
    }
  };

  return (
    <section className='feed'>
      {/* Search bar */}
      <form className='relative w-full flex-center mb-4'>
        <input
          type='text'
          placeholder='Search by username, tag, category, heading, prompt, or platform'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
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
      </div>

      {/* Active filters display */}
      {(activeCategory || activePlatform) && (
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
        </div>
      )}

      {/* Display prompts */}
      <PromptCardList
        data={searchText || activeCategory || activePlatform ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
        searchText={searchText}
      />
    </section>
  );
};

export default Feed;
