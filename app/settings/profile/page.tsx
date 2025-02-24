"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileSettings() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const updateProfile = async () => {
    const { error } = await supabase
      .from("users")
      .update({ username, avatar_url: avatar })
      .eq("id", (await supabase.auth.getUser()).data?.user?.id);

    if (error) console.error("Error updating profile:", error.message);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button onClick={updateProfile}>Save</button>
      </div>
    </div>
  );
}
