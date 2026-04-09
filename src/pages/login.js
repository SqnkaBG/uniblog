import { useState, useEffect } from "react";

const LoginPage = () => {
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

    let loginSuccessful = false;

    if (email.trim() !== "" && password.trim() !== "") {
      const validUser = users.find(
        (element) => email === element.email && password === element.password,
      );

      if (validUser) {
        loginSuccessful = true;
      }
    }

    if (loginSuccessful) {
      alert("Login successful");
    } else {
      alert("Wrong email or password");
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
      <button>OK</button>
    </form>
  );
};
export default LoginPage;
