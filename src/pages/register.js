import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";

//starts json server - json-server --watch src/db/profiles.json --port 3002

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordRepeat, SetPasswordRepeat] = useState("");

  const [validEmail, setvalidEmail] = useState(false);
  const [validPass, setvalidPass] = useState(false);
  const [validPassRepeat, setvalidPassRepeat] = useState(false);

  const [formIsVisible, setformIsVisible] = useState(true);

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);

    setvalidEmail(valid);
  };

  const handlePass = (e) => {
    const value = e.target.value;
    SetPassword(value);

    const passRegex =
      /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const valid = passRegex.test(password);

    setvalidPass(valid);
  };

  const RepeatPass = (e) => {
    const value = e.target.value;
    SetPasswordRepeat(value);

    let valid = false;
    if (password === value) valid = true;
    setvalidPassRepeat(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent refresh

    if (validEmail && validPass && validPassRepeat) {
      const jsonData = { email: email, password: password };
      submitData(jsonData);
    }
  };

  const submitData = async (data) => {
    const response = await fetch("http://localhost:3002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await response.json();
    if (response.ok) {
      setformIsVisible(false);
    }
  };

  return (
    <div>
      {formIsVisible ? (
        <form onSubmit={handleSubmit}>
          <label>email</label>
          <input onChange={handleEmail} value={email}></input>
          {!validEmail &&
            email && ( //if the email is invalid and something was typed in then it shows the invalid text
              <p
                style={{
                  color: "red",
                  marginTop: "-20px",
                  marginBottom: "10px",
                }}
              >
                Invalid email format
              </p>
            )}
          <label>password</label>
          <input onChange={handlePass} type="password"></input>
          {!validPass && password && (
            <p
              style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}
            >
              Password should be at least 8 characters long and contain one
              capital letter and special symbol
            </p>
          )}
          <label>Enter your password again</label>
          <input type="password" onChange={RepeatPass}></input>
          {!validPassRepeat && passwordRepeat && (
            <p
              style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}
            >
              Passwords do not match
            </p>
          )}
          <button>Register</button>
        </form>
      ) : (
        <div id="register_success">
          <h1>You have registered successfully</h1>
          <Link to="/login">
            <button>Go to login page</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default RegisterPage;
