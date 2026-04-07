import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>UniBlog</div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          Register
        </Link>
        <Link
          to="/my-profile"
          style={{ color: "white", textDecoration: "none" }}
        >
          My profile
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
