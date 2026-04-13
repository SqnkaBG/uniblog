import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../App";
import "./home.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3002/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length < 1) {
    return (
      <div className="home-container">
        <div className="welcome-card">
          <div className="welcome-text">
            <h2>What's new</h2>
            <p>Mostly complaints about everything</p>
          </div>
          <button className="create-post-btn">
            <i className="fas fa-pen-fancy"></i> Make a post
          </button>
        </div>
        <div className="posts-feed">
          <div className="empty-state">
            <i className="fas fa-newspaper"></i>
            <h3>No posts yet</h3>
            <p>Be the first to share something!</p>
          </div>
        </div>
      </div>
    );
  }

  // Show posts
  return (
    <div className="home-container">
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>Latest posts</h2>
          <p>Updated whenever someone actually posts something</p>
        </div>
        {isLoggedIn ? (
          <button className="create-post-btn">
            <i className="fas fa-pen-fancy"></i> Make a post
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="posts-feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="avatar">{post.avatarEmoji}</div>
              <div className="post-author">
                <h4>
                  {post.author}{" "}
                  <span className="post-badge">@{post.authorUsername}</span>
                </h4>
                <div className="post-meta">
                  <span>
                    <i className="far fa-calendar-alt"></i> {post.date}
                  </span>
                </div>
              </div>
            </div>
            <div className="post-content">
              <div className="post-title">{post.title}</div>
              <div className="post-text">{post.body}</div>
              <div className="post-tags">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="post-stats">
              <span className="like-btn">
                <i className="far fa-heart"></i>
                {post.likes} likes
              </span>
              <span>
                <i className="far fa-comment"></i> {post.comments} comments
              </span>
              <span>
                <i className="far fa-bookmark"></i> save
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
