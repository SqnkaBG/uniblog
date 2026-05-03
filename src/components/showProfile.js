// ShowProfile.jsx
import "./showProfile.css";

const ShowProfile = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="profile-popup-overlay" onClick={onClose}>
      <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
        <button className="profile-popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="profile-popup-avatar">{profile.avatar || "👤"}</div>

        <h2 className="profile-popup-username">
          @{profile.username || "username"}
        </h2>

        <p className="profile-popup-bio">{profile.bio || "No bio yet"}</p>

        <div className="profile-popup-stats">
          <div className="profile-popup-stat">
            <span className="stat-number">{profile.posts?.length || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
