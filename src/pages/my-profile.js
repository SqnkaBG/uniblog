import "./my-profile.css";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../App";

function AccountPage() {
  const { userId } = useContext(LoginContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [profile, setProfile] = useState({});
  const [error, setError] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleOpenMenu = () => {
    setUsername(profile.username || "");
    setBio(profile.bio || "");
    setAvatar(profile.avatar || "👤");
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
      const response = await fetch("http://localhost:3002/users");

      if (response.ok) {
        const data = await response.json();

        const userProfile = data.find((element) => userId === element.id);

        setProfile(
          userProfile || {
            id: userId,
            username: "",
            avatar: "👤",
            bio: "",
            posts: [],
          },
        );
      } else {
        setMenuOpen(true);
      }
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);
  const submitData = async (data) => {
    if (!data.username.trim() || !data.bio.trim() || !data.avatar.trim()) {
      setError(true);
      return;
    }

    try {
      let response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedProfile = await response.json();

        if (updatedProfile) setProfile(updatedProfile);
        else {
          setProfile({ id: userId });
        }
        setMenuOpen(false);
        setError(false);
      } else {
        alert("Failed to save profile. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      username: username,
      avatar: avatar,
      bio: bio,
      posts: profile.posts || 0,
    };
    submitData(jsonData);
  };

  const handleInput = (e) => {
    const input = e.target.value;

    const firstChar = Array.from(input)[0] || "";

    setAvatar(firstChar);
    setError(false);
  };

  return (
    <div className="account-container">
      <div className="profile-card">
        <div className="card-cover"></div>

        <div className="avatar-wrapper">
          <div className="avatar-circle">{profile.avatar}</div>
        </div>
        <div className="profile-info">
          <p className="profile-name">@{profile?.username || "username"}</p>
          <div className="stat-label">Posts</div>
          <div className="profile-username">
            {profile.posts === undefined ? 0 : profile.posts.length}
          </div>

          <div className="stats-row">
            <div className="stat-item"></div>
            <div className="stat-item">
              <p className="profile-bio">{profile?.bio || "No bio yet"}</p>
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
            <label className="modal-label">Avatar</label>
            <input
              onChange={(e) => {
                handleInput(e);
                setError(false);
              }}
              value={avatar}
              type="text"
              name="avatar"
              className="modal-input"
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
