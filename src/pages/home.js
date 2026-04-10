import "./home.css";

const HomePage = () => {
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
      {/*  
      <div className="modal-overlay">
        <div className="modal-card">
          <h3>
            <i className="fas fa-feather-alt"></i> Create new post
          </h3>
          <input type="text" name="title" placeholder="Post title" />
          <textarea
            name="body"
            rows="4"
            placeholder="Place your post text here"
          />
          <div className="modal-actions">
            <button className="cancel-btn">Cancel</button>
            <button className="submit-btn">Publish post</button>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default HomePage;
