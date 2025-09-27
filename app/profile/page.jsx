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
      if (!session?.user.id) return;
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data); // All posts
    };
    fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt/${post._id}`);
  };

  const handleDelete = async (post) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    try {
      const response = await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setMyPosts(myPosts.filter(p => p._id !== post._id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts!"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      userId={session?.user.id}
    />
  );
};

export default MyProfile;
