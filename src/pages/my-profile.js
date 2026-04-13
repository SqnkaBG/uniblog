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
  const [avatar, setAvatar] = useState("");

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
      const response = await fetch("http://localhost:3002/users");

      if (response.ok) {
        const data = await response.json();

        const userProfile = data[userId];
        setProfile(
          userProfile || {
            id: userId,
            name: "",
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
    const userData = data[userId];
    if (
      !userData.name.trim() ||
      !userData.username.trim() ||
      !userData.bio.trim()
    ) {
      setError(true);
      return;
    }

    try {
      let response = await fetch("http://localhost:3002/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedProfile = await response.json();

        if (updatedProfile[userId]) setProfile(updatedProfile[userId]);
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
      [userId]: {
        name: name,
        username: username,
        avatar: avatar,
        bio: bio,
        posts: profile.posts || 0,
        followers: profile.followers || 0,
        following: profile.following || 0,
      },
    };
    submitData(jsonData);
  };
  const handleInput = (e) => {
    const input = e.target.value;

    // Keep only emojis, remove all other text
    const emojisOnly = input.match(/\p{Emoji}/gu)?.join("") || "";

    setAvatar(emojisOnly);
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
