import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setUserId } = useContext(LoginContext);
  const { setUsername } = useContext(LoginContext);

  const navigate = useNavigate();

  const [error, serError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3002/users");
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      alert("Something went wrong, please try again later.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); //empty array at the end so it runs only once when it loads
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      const validUser = users.find(
        (element) => email === element.email && password === element.password,
      );
      if (validUser) {
        setIsLoggedIn(true);
        setUserId(validUser.id);
        setUsername(validUser.username);

        Cookies.set("isLoggedIn", "true", { expires: 5, path: "/" });
        Cookies.set("userID", validUser.id, { expires: 5, path: "/" });
        Cookies.set("username", validUser.username, { expires: 5, path: "/" });

        setUserId(validUser.id);
        navigate("/my-profile");
      } else {
        serError(true);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>email</label>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <label>password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <p className="error">{error ? "Wrong email or password" : ""}</p>
      <button>OK</button>
    </form>
  );
};
export default LoginPage;
