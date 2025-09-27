"use client";

import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, userId }) => {
  const { data: session } = useSession();

  // Filter posts based on ownership
  const filteredPosts =
    session?.user.id === userId
      ? data // Own profile: show all posts
      : data.filter(post => post.isPublic); // Others: show only public posts

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {filteredPosts.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
