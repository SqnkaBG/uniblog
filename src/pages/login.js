import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const [error, serError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/register")
      .then((res) => res.json()) //convert from json to array
      .then((data) => setUsers(data));
  }, []); //empty array at the end so it runs only once when it loads
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      const validUser = users.find(
        (element) => email === element.email && password === element.password,
      );

      if (validUser) {
        setIsLoggedIn(true);
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
      <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>
        {error ? "Wrong email or password" : ""}
      </p>
      <button>OK</button>
    </form>
  );
};
export default LoginPage;
