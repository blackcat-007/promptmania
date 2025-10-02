"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "@components/PromptCard";
import Loader from "@components/loader";
import Refresh from "@components/refresh";

const SavedPage = () => {
  const { data: session } = useSession();
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSaved = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/saved/${session.user.id}`);
      if (!res.ok) throw new Error("Failed to fetch saved prompts");
      const data = await res.json();
      setSavedPrompts(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, [session]);

  if (loading) return <Loader />; // Show loader while fetching
  if (error) return <Refresh onClick={fetchSaved} />; // Show refresh button on error

  return (
    <section className="w-full">
      <h1 className="head_text">Saved Prompts</h1>
      <div className="mt-10 prompt_layout">
        {savedPrompts.map((save) => (
          <PromptCard key={save._id} post={save.promptId} />
        ))}
      </div>
    </section>
  );
};

export default SavedPage;
