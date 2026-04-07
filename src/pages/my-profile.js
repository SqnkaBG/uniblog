function AccountPage() {
  const { username } = "Valio";

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "120px",
            backgroundColor: "#667eea",
          }}
        ></div>

        <div style={{ textAlign: "center", marginTop: "-50px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            👤
          </div>
        </div>

        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 5px" }}>John Doe</h2>
          <p style={{ color: "#666", margin: "0 0 15px" }}>
            @{username || "johndoe"}
          </p>

          <p style={{ color: "#555", marginBottom: "20px" }}>
            Full-stack developer. React enthusiast. Coffee lover ☕
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "15px 0",
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>24</div>
              <div style={{ color: "#666", fontSize: "12px" }}>Posts</div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>156</div>
              <div style={{ color: "#666", fontSize: "12px" }}>Followers</div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>89</div>
              <div style={{ color: "#666", fontSize: "12px" }}>Following</div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
