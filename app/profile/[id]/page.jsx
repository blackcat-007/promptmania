"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import Loader from "@components/loader";
import Refresh from "@components/refresh";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    if (!params?.id) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/users/${params.id}/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      let data = await response.json();
      if (!Array.isArray(data)) data = []; // fallback if API fails
      setUserPosts(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [params.id]);

  if (loading) return <Loader />; // show loader while fetching
  if (error) return <Refresh onClick={fetchPosts} />; // show refresh button on error

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
