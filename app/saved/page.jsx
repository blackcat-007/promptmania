"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "@components/PromptCard";

const SavedPage = () => {
  const { data: session } = useSession();
  const [savedPrompts, setSavedPrompts] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/saved/${session.user.id}`);
      const data = await res.json();
      setSavedPrompts(data);
    };
    fetchSaved();
  }, [session]);

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
