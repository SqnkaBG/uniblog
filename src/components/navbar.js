import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { useContext } from "react";
import Cookies from "js-cookie";

function NavigationBar() {
  const { isLoggedIn, setIsLoggedIn, userId, setUserId } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("isLoggedIn", { path: "/" });
    Cookies.remove("userID", { path: "/" });
    Cookies.remove("username", { path: "/" });
    setUserId("");
    navigate("/");
  };

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
        {!isLoggedIn && userId.length < 1 ? (
          <>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/my-profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              My profile
            </Link>
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Log out
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
