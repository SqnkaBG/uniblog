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
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    const hasProfileData = Object.keys(profile).length > 1;

    if (hasProfileData) {
      setMenuOpen(false);
    } else {
      if (
        name.trim().length !== 0 &&
        username.trim().length !== 0 &&
        bio.trim().length !== 0
      ) {
        setMenuOpen(false);
      } else {
        setError(true);
      }
    }
  };
  useEffect(() => {
    try {
      fetch(`http://localhost:3002/profile/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);

          if (Object.keys(data).length === 1) {
            setMenuOpen(true);
          }
        });
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  }, [userId]);

  const submitData = async (data) => {
    try {
      const response = await fetch(`http://localhost:3002/profile/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      await response.json();

      if (response.ok) {
        setMenuOpen(false);

        window.location.reload();
      } else {
        const response = await fetch(`http://localhost:3002/profile`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        await response.json();

        if (response.ok) {
          setMenuOpen(false);

          window.location.reload();
        }
      }
    } catch (error) {
      alert("Something went wrong, please try again later." + error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonData = { id: userId, name: name, username: username, bio: bio };
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
          <h2 className="profile-name">{profile?.name}</h2>
          <p className="profile-username">@{profile.username}</p>
          <p className="profile-bio">{profile.bio}</p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">{profile.posts}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profile.followers}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profile.following}</div>
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
              name="bio"
              className="modal-textarea"
              rows="3"
              placeholder="Tell something about yourself"
            />
            {error ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-15px",
                  marginBottom: "10px",
                }}
              >
                Fields cannot be empty
              </p>
            ) : (
              ""
            )}
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={handleCloseMenu}>
                Cancel
              </button>
              <button className="modal-save-btn">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
