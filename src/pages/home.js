import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../App";
import "./home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const loadData = async () => {
      await fetchAuthors();
      await fetchPosts();
    };
    loadData();
  }, []);

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

  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3002/users");
      if (response.ok) {
        const data = await response.json();
        setAuthors(data);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
      alert("Something went wrong, please try again later.");
    }
  };

  const getAuthorById = (userId) => {
    return authors.find((author) => author.id === userId);
  };

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
          {isLoggedIn && (
            <button
              className="create-post-btn"
              onClick={() => navigate("/addPost")}
            >
              Make a post
            </button>
          )}
        </div>
        <div className="posts-feed">
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Be the first to share something!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>Latest posts</h2>
          <p>Updated whenever someone actually posts something</p>
        </div>
        {isLoggedIn && (
          <button
            className="create-post-btn"
            onClick={() => navigate("/addPost")}
          >
            {" "}
            Make a post
          </button>
        )}
      </div>

      <div className="posts-feed">
        {posts.map((post) => {
          const author = getAuthorById(post.userID);
          return (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="avatar">{`${author.avatar}` || `${"👤"}`}</div>
                <div className="post-author">
                  <span className="post-badge">
                    @{author.username || "nameless"}
                  </span>
                  <span className="post-meta">
                    {" "}
                    {new Date(post.date).toLocaleDateString("en-BG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="post-content">
                <div className="post-title">{post.title}</div>
                <div className="post-text">{post.body}</div>
                <div className="post-tags">
                  {post.tags?.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="post-stats">
                <span> {post.comments || 0} comments</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
