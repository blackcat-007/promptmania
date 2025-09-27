"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = ({ params }) => {
  const router = useRouter();
  const promptId = params.id;

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
  heading: "",
  prompt: "",
  tag: "",
  categories: [],
  platforms: [],
  mediaUrl: "",
  mediaPublicId: "",
  isPublic: true,
});


  // Fetch existing prompt
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error("Failed to fetch prompt");

        const data = await response.json();
        setPost({
  heading: data.heading,
  prompt: data.prompt,
  tag: data.tag,
  categories: data.categories || [],
  platforms: data.platforms || [],
  mediaUrl: data.mediaUrl || "",
  mediaPublicId: data.mediaPublicId || "",
  isPublic: data.isPublic ?? true,
});

      } catch (error) {
        console.error("Error fetching prompt:", error.message);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  // Update handler
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, // ✅ important
        body: JSON.stringify({
  ...post,   // send all fields
}),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update prompt");
      }
    } catch (error) {
      console.error("Error updating prompt:", error.message);
      alert(`Update failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
