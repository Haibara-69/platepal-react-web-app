import React, { useEffect, useState } from "react";
import { searchRecipes, searchUsers } from "../services/apiService";
import { api } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"recipes" | "users">("recipes");
  const [results, setResults] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const [tagsResponse, categoriesResponse] = await Promise.all([
          api.get("/api/recipes/tags"),
          api.get("/api/recipes/categories"),
        ]);
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching tags and categories:", error);
      }
    };

    fetchTagsAndCategories();
  }, []);

  const handleSearch = async () => {
    try {
      setError(null);
      let data: any[] = [];
      if (type === "recipes") {
        data = await searchRecipes(query, tag, category);
      } else if (type === "users") {
        data = await searchUsers(query, currentUser.id); // Pass current user ID
      }
      setResults(data); // Ensure results include `followers`, `following`, and `isFollowing`
    } catch (err) {
      setError("Failed to fetch search results.");
      console.error(err);
    }
  };
  

  const handleFollow = async (userId: string) => {
    try {
      await api.post("/api/follows", { followerId: currentUser.id, followingId: userId });
      setResults((prevResults) =>
        prevResults.map((user) =>
          user._id === userId 
            ? { ...user, isFollowing: true, followers: (user.followers || 0) + 1 } 
            : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  
  const handleUnfollow = async (userId: string) => {
    try {
      await api.delete("/api/follows", {
        data: { followerId: currentUser.id, followingId: userId },
      });
      setResults((prevResults) =>
        prevResults.map((user) =>
          user._id === userId 
            ? { ...user, isFollowing: false, followers: (user.followers || 1) - 1 } 
            : user
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };  

  return (
    <div className="container">
      <h1>Search</h1>
      <div>
        <label>
          Search for:{" "}
          <select
            className="type-select"
            value={type}
            onChange={(e) => setType(e.target.value as "recipes" | "users")}
          >
            <option value="recipes">Recipes</option>
            <option value="users">Users</option>
          </select>
        </label>
      </div>
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search ${type} by name`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {type === "recipes" && (
          <>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="">Select a tag</option>
              {tags.map((tagOption) => (
                <option key={tagOption} value={tagOption}>
                  {tagOption}
                </option>
              ))}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <br />
      <div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <br />
      <div className="results">
        {type === "recipes" &&
          results.map((recipe) => (
            <div key={recipe._id} className="card">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p>Tags: {recipe.tags?.join(", ")}</p>
              <p>Category: {recipe.cuisine || "N/A"}</p>
            </div>
          ))}
        {type === "users" &&
          results.map((user) => (
            <div key={user._id} className="profile-card">
            <h2>{user.username}</h2>
            <p>
              <span
                className="link"
                onClick={() => navigate(`/followers/${user._id}`)}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              >
                Followers: {user.followers ?? 0} {/* Show counts */}
              </span>
            </p>
            <p>
              <span
                className="link"
                onClick={() => navigate(`/following/${user._id}`)}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              >
                Following: {user.following ?? 0} {/* Show counts */}
              </span>
            </p>
            <br />
            {currentUser.id !== user._id &&
              (currentUser.role === "Cook" || currentUser.role === "Admin") &&
              (user.isFollowing ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleUnfollow(user._id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleFollow(user._id)}
                >
                  Follow
                </button>
              )
            )}
          </div>
          ))}
      </div>
    </div>
  );
};

export default Search;