import "./home.css";
import { useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    tags: "",
  });

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              likedByUser: !post.likedByUser,
            }
          : post,
      ),
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      alert("Please fill both title and content!");
    }
    const post = {
      id: Date.now().toString(),
      author: "Valio Dimitrov",
      authorUsername: "Valio",
      avatarEmoji: "🧑‍🎓",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      title: newPost.title.trim(),
      body: newPost.body.trim(),
      likes: 0,
      comments: 0,
      likedByUser: false,
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost({ title: "", body: "", tags: "" });
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>What's new</h2>
        </div>
        <button onClick={() => setShowModal(true)} className="create-post-btn">
          <i className="fas fa-pen-fancy"></i> Make a post
        </button>
      </div>

      <div className="posts-feed">
        {posts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-newspaper"></i>
            <h3>No posts yet</h3>
            <p>Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => <div key={post.id} className="post-card"></div>)
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>
              <i className="fas fa-feather-alt"></i> Create new post
            </h3>
            <input
              type="text"
              name="title"
              placeholder="Post title"
              value={newPost.title}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              rows="4"
              placeholder="Place your post text here"
              value={newPost.body}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="submit-btn" onClick={handleCreatePost}>
                Publish post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
