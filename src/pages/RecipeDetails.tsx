import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipes, deleteRecipe, addLike, removeLike, hasLikedRecipe, 
  countLikesByRecipe, fetchComments, addComment, updateComment, deleteComment } from '../services/apiService';
import { Recipe } from '../types/types';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeDetails: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); 
  const [editingText, setEditingText] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeID || recipeID.length !== 24) {
      console.error('Invalid recipe ID:', recipeID);
      alert('Invalid recipe ID');
      return;
    }

    const loadRecipe = async () => {
      try {
        const recipes = await fetchRecipes();
        const selectedRecipe = recipes.find((r: any) => r._id === recipeID) || null;
        setRecipe(selectedRecipe);
        const commentsData = await fetchComments(recipeID);
        setComments(commentsData);
        const likesCount = await countLikesByRecipe(recipeID);
        setLikes(likesCount);
        const likedStatus = await hasLikedRecipe(currentUser.id, recipeID);
        setIsLiked(likedStatus.hasLiked);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    loadRecipe();
  }, [recipeID]);

  const handleLikeToggle = async () => {
    if (currentUser.role !== "Cook" && currentUser.role !== "Admin") {
      alert("Only registered user can like recipes.");
      return;
    }
    try {
      if (isLiked) {
        await removeLike(currentUser.id, recipeID!);
        setLikes((prev) => prev - 1);
      } else {
        await addLike(currentUser.id, recipeID!);
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
      const addedComment = await addComment(currentUser.id, recipeID!, newComment, currentUser.role);
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = (commentId: string, text: string) => {
    setEditingCommentId(commentId); 
    setEditingText(text); 
  };

  const handleSaveEditedComment = async () => {
    if (!editingText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
      const updatedComment = await updateComment(editingCommentId!, currentUser.id, editingText);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === editingCommentId ? { ...comment, text: updatedComment.text } : comment
        )
      );
      setEditingCommentId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId, currentUser.id, currentUser.role);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!recipe) return <p>Recipe not found.</p>;

  const handleDelete = async () => {
    if (!recipeID || recipeID.trim() === '' || recipeID.length !== 24) {
      alert('Invalid recipe ID');
      return;
    }
    try {
      await deleteRecipe(recipeID);
      alert('Recipe deleted successfully');
      navigate('/');
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert('Failed to delete the recipe. Please try again.');
    }
  };

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{recipe.title}</h1>
        {currentUser?.id === recipe.createdBy?._id && (
          <div>
            <button className='btn btn-success' 
              onClick={() => {
                if (!recipe._id || recipe._id.length !== 24) {
                  alert('Invalid recipe ID');
                  return;
                }
                navigate(`/edit-recipe/${recipe._id}`);
              }}
              style={{ marginRight: '10px'}}
            >
              Edit Recipe
            </button>
            <button className='btn btn-danger' onClick={handleDelete} style={{ color: 'white' }}>
              Delete Recipe
            </button>
          </div>
        )}
      </div>
      <p>{recipe.description}</p>
      <img
        //src={`http://localhost:8080${recipe.image}`}
        src={`${process.env.REACT_APP_API_URL || "http://localhost:8080"}${recipe.image}`}
        className="card-img-top"
        alt={recipe.title}
        style={{ maxWidth: '50%', height: 'auto', marginBottom: '10px' }}
      />
      <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      <h2>Steps</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      <h2>Cuisine</h2>
        <p>{recipe.cuisine}</p>
      <h2>Tags</h2>
        <p>{recipe.tags.join(', ')}</p>
      <hr />

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div>
          {isLiked ? (
            <FaHeart color="red" size={24} onClick={handleLikeToggle} style={{ cursor: "pointer" }} />
          ) : (
            <FaRegHeart size={24} onClick={handleLikeToggle} style={{ cursor: "pointer" }} />
          )}
        </div>
        <p style={{ margin: 0}}>{likes} Likes</p>
      </div>
      <br />
      <h3>Comments</h3>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {editingCommentId === comment._id ? (
              <div style={{ width: "100%" }}>
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ width: "80%" }}
                />
                <br />
                <div>
                <button className="btn btn-primary btn-sm" style={{ marginRight: "5px" }} onClick={handleSaveEditedComment}>
                  Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingCommentId(null)}>
                  Cancel
                </button>
                </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>{comment.commentedBy?.username}:</strong> {comment.text}
                </p>
                {comment.commentedBy?._id === currentUser.id && (
                  <div>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: "5px" }} 
                      onClick={() => handleEditComment(comment._id, comment.text)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {editingCommentId ? (
        <p>You are editing a comment. Complete your edit before posting a new comment.</p>
      ) : (
        currentUser.role === "Cook" || currentUser.role === "Admin" ? (
          <div style={{ width: "100%" }}>
            <textarea
              placeholder="Say something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ width: "80%", marginBottom: "10px" }}
            />
            <br />
            <button className="btn btn-primary" onClick={handleAddComment}>
              Post Comment
            </button>
          </div>
        ) : (
        <p>Only registered user can leave comments.</p>
        )
      )}
    </div>
  );
};

export default RecipeDetails;