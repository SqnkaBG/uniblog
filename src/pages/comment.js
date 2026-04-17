import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../App";
import "./comment.css";

const Comment = ({
  post = {},
  author = {},
  allUsers = [],
  myProfile = {},
  onClose,
}) => {
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const { isLoggedIn, userId } = useContext(LoginContext);

  useEffect(() => {
    if (post.id) {
      fetchComments();
    }
  }, [post.id]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3002/comments?postId=${post.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setAllComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isLoggedIn) return;

    setSubmitting(true);
    try {
      const commentData = {
        postId: post.id,
        userId: userId,
        body: newComment.trim(),
        date: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3002/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setAllComments([...allComments, savedComment]);
        setNewComment("");

        await updatePostComments(post.id, [
          ...(post.comments || []),
          savedComment.id,
        ]);

        await updateUserComments(userId, savedComment.id);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updatePostComments = async (postId, commentIds) => {
    try {
      await fetch(`http://localhost:3002/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: commentIds }),
      });
    } catch (error) {
      console.error("Error updating post comments:", error);
    }
  };

  const updateUserComments = async (userId, commentId) => {
    try {
      const userResponse = await fetch(`http://localhost:3002/users/${userId}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const updatedComments = [...(userData.comments || []), commentId];

        await fetch(`http://localhost:3002/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        });
      }
    } catch (error) {
      console.error("Error updating user comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const response = await fetch(
        `http://localhost:3002/comments/${commentId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setAllComments(allComments.filter((c) => c.id !== commentId));

        const updatedPostComments = (post.comments || []).filter(
          (id) => id !== commentId,
        );
        await updatePostComments(post.id, updatedPostComments);

        await removeCommentFromUser(userId, commentId);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };

  const removeCommentFromUser = async (userId, commentId) => {
    try {
      const userResponse = await fetch(`http://localhost:3002/users/${userId}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const updatedComments = (userData.comments || []).filter(
          (id) => id !== commentId,
        );

        await fetch(`http://localhost:3002/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        });
      }
    } catch (error) {
      console.error("Error removing comment from user:", error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.body);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:3002/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: editText.trim(),
            edited: true,
            editDate: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        const updatedComment = await response.json();
        setAllComments(
          allComments.map((c) => (c.id === commentId ? updatedComment : c)),
        );
        setEditingCommentId(null);
        setEditText("");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";

    return new Date(dateString).toLocaleDateString("en-BG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getCommentAuthor = (commentUserId) => {
    if (commentUserId === author.id) {
      return author;
    }
    return (
      allUsers.find((user) => user.id === commentUserId) || {
        username: "User",
        avatar: "👤",
      }
    );
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>
          <i className="far fa-comments"></i> Comments ({allComments.length})
        </h3>
        <button className="close-comments-btn" onClick={onClose}>
          X
        </button>
      </div>

      {isLoggedIn ? (
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-input-wrapper">
            <div className="comment-avatar">{myProfile.avatar || "👤"}</div>
            <input
              type="text"
              className="comment-input"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
          </div>
          <div className="comment-form-actions">
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!newComment.trim() || submitting}
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-prompt">
          <p>
            <i className="fas fa-lock"></i> Please log in to leave a comment.
          </p>
        </div>
      )}

      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">
            <div className="spinner-small"></div>
            <p>Loading comments...</p>
          </div>
        ) : allComments.length === 0 ? (
          <div className="no-comments">
            <i className="far fa-comment-dots"></i>
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          allComments.map((comment) => {
            const commentAuthor = getCommentAuthor(comment.userId);
            const isEditing = editingCommentId === comment.id;

            return (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  {commentAuthor?.avatar || "👤"}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">
                      {commentAuthor?.username || "User"}
                    </span>
                    <span className="comment-time">
                      {formatDate(comment.date)}
                      {comment.edited && (
                        <span className="edited-badge"> (edited)</span>
                      )}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="comment-edit-mode">
                      <textarea
                        className="comment-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows="2"
                      />
                      <div className="comment-edit-actions">
                        <button
                          className="comment-save-btn"
                          onClick={() => handleSaveEdit(comment.id)}
                        >
                          Save
                        </button>
                        <button
                          className="comment-cancel-btn"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="comment-body">{comment.body}</p>
                  )}

                  {!isEditing && (
                    <div className="comment-actions">
                      {userId === comment.userId && (
                        <>
                          <button
                            className="comment-edit-btn"
                            onClick={() => handleEditComment(comment)}
                          >
                            <i className="far fa-edit"></i> Edit
                          </button>
                          <button
                            className="comment-delete-btn"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <i className="far fa-trash-alt"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comment;
