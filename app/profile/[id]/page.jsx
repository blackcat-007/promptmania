"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!params?.id) return;
      const response = await fetch(`/api/users/${params.id}/posts`);
      let data = await response.json();
      if (!Array.isArray(data)) data = []; // fallback if API fails
      setUserPosts(data); // All posts, Profile component will filter isPublic
    };
    fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile. Explore their exceptional prompts!`}
      data={userPosts}
      userId={params?.id} // Pass userId for conditional filtering
    />
  );
};

export default UserProfile;
