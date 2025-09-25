"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

 const handleEdit = (post) => {
  router.push(`/update-prompt/${post._id}`);
};


  const handleDelete = async (post) => {
  if (!confirm("Are you sure you want to delete this prompt?")) return;

  try {
    const response = await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to delete");
    }

    setMyPosts(myPosts.filter((item) => item._id !== post._id));
  } catch (error) {
    console.error("Delete failed:", error.message);
    alert(`Delete failed: ${error.message}`);
  }
};

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;