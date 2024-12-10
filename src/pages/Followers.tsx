import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/apiService";

const Followers = () => {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowersAndUsername = async () => {
      try {
        const [followersResponse, userResponse] = await Promise.all([
          api.get(`/api/follows/followers/${userId}`),
          api.get(`/api/users/${userId}`),
        ]);
        setFollowers(followersResponse.data);
        setUsername(userResponse.data.username);
      } catch (err) {
        setError("Failed to fetch followers or username.");
        console.error(err);
      }
    };

    fetchFollowersAndUsername();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Followers of {username}</h1>
      <hr />
      {followers.length === 0 ? (
        <p>No followers found.</p>
      ) : (
        followers.map((follower) => (
          <div key={follower._id} className="profile-card">
            <h2>{follower.follower?.username || "Unknown User"}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Followers;