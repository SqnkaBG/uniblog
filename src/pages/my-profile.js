import "./my-profile.css";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../App";

function AccountPage() {
  const { userId } = useContext(LoginContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleOpenMenu = () => {
    setName(profile.name || "");
    setUsername(profile.username || "");
    setBio(profile.bio || "");
    setMenuOpen(true);
    setError(false);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setError(false);
  };

  const fetchProfile = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3002/profile/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setProfile(data);

        if (Object.keys(data).length <= 1) {
          setMenuOpen(true);
        }
      } else if (response.status === 404) {
        setMenuOpen(true);
        setProfile({ id: userId });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Something went wrong, please try again later.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const submitData = async (data) => {
    if (!data.name.trim() || !data.username.trim() || !data.bio.trim()) {
      setError(true);
      return;
    }

    try {
      let response = await fetch(`http://localhost:3002/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        response = await fetch(`http://localhost:3002/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setMenuOpen(false);
        setError(false);
        alert("Profile saved successfully!");
      } else {
        alert("Failed to save profile. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong, please try again later. " + error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      id: userId,
      name: name,
      username: username,
      bio: bio,
      posts: profile.posts || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
    };
    submitData(jsonData);
  };

  return (
    <div className="account-container">
      <div className="profile-card">
        <div className="card-cover"></div>

        <div className="avatar-wrapper">
          <div className="avatar-circle">👤</div>
        </div>

        <div className="profile-info">
          <h2 className="profile-name">{profile?.name || "No name set"}</h2>
          <p className="profile-username">@{profile?.username || "username"}</p>
          <p className="profile-bio">{profile?.bio || "No bio yet"}</p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">{profile?.posts || 0}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profile?.followers || 0}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profile?.following || 0}</div>
              <div className="stat-label">Following</div>
            </div>
          </div>

          <div className="button-wrapper">
            <button className="edit-btn" onClick={handleOpenMenu}>
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="modal-overlay" onClick={handleCloseMenu}>
          <form
            className="modal-container"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Edit Profile</h2>

            <label className="modal-label">Name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              value={name}
              type="text"
              name="name"
              className="modal-input"
              placeholder="John Doe"
            />

            <label className="modal-label">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              value={username}
              type="text"
              name="username"
              className="modal-input"
              placeholder="johndoe"
            />

            <label className="modal-label">Bio</label>
            <textarea
              onChange={(e) => {
                setBio(e.target.value);
                setError(false);
              }}
              value={bio}
              name="bio"
              className="modal-textarea"
              rows="3"
              placeholder="Tell something about yourself"
            />

            {error && (
              <p
                style={{
                  color: "red",
                  marginTop: "-15px",
                  marginBottom: "10px",
                }}
              >
                All fields cannot be empty
              </p>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={handleCloseMenu}
              >
                Cancel
              </button>
              <button type="submit" className="modal-save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
