import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/apiService";

const Following = () => {
  const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowingAndUsername = async () => {
      try {
        const [followingResponse, userResponse] = await Promise.all([
          api.get(`/api/follows/following/${userId}`),
          api.get(`/api/users/${userId}`),
        ]);
        setFollowing(followingResponse.data);
        setUsername(userResponse.data.username);
      } catch (err) {
        setError("Failed to fetch following or username.");
        console.error(err);
      }
    };

    fetchFollowingAndUsername();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>{username} is Following</h1>
      <hr />
      {following.length === 0 ? (
        <p>No following found.</p>
      ) : (
        following.map((followee) => (
          <div key={followee._id} className="profile-card">
            <h2>{followee.following?.username || "Unknown User"}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Following;