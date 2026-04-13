import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordRepeat, SetPasswordRepeat] = useState("");

  const [validUsername, setvalidUsername] = useState(false);
  const [validEmail, setvalidEmail] = useState(false);
  const [validPass, setvalidPass] = useState(false);
  const [validPassRepeat, setvalidPassRepeat] = useState(false);

  const [formIsVisible, setformIsVisible] = useState(true);
  const [sameEmail, setsameEmail] = useState(false);

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.length <= 3 || value.length >= 11) {
      setvalidUsername(false);
    } else setvalidUsername(true);
  };
  const handleEmail = (e) => {
    setsameEmail(false);
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(value);

    setvalidEmail(valid);
  };

  const handlePass = (e) => {
    const value = e.target.value;
    SetPassword(value);

    const passRegex =
      /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const valid = passRegex.test(value);

    setvalidPass(valid);
  };

  const RepeatPass = (e) => {
    const value = e.target.value;
    SetPasswordRepeat(value);

    let valid = false;
    if (password === value) valid = true;
    setvalidPassRepeat(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refresh

    if (validEmail) {
      const emails = await getEmails();
      const emailExists = emails.includes(email); //check if current email is in the emails array(returns true/false)

      if (emailExists) {
        setsameEmail(true);

        return;
      }
    }

    if (
      validUsername &&
      validEmail &&
      validPass &&
      validPassRepeat &&
      !sameEmail
    ) {
      const jsonData = {
        email: email,
        password: password,
        username: username,
        avatar: "👤",
        bio: "",
        posts: [],
      };
      submitData(jsonData);
    }
  };

  const submitData = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await response.json();
      if (response.ok) {
        setformIsVisible(false);
      }
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  const getEmails = async () => {
    try {
      const response = await fetch("http://localhost:3002/users");
      const data = await response.json();

      const emailArray = data.map((user) => user.email); // creates a copy of array of with just the user emails

      return emailArray;
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <div>
      {formIsVisible ? (
        <form onSubmit={handleSubmit}>
          <label>username</label>
          <input onChange={handleUsername} value={username}></input>
          {!validUsername &&
            username && ( //if the username is invalid and something was typed in then it shows the invalid text
              <p className="error">
                Username should be more than 3 symbols and less than 11 symbols
              </p>
            )}
          <label>email</label>
          <input onChange={handleEmail} value={email}></input>
          {!validEmail && email && (
            <p className="error">Invalid email format</p>
          )}

          {sameEmail && email && (
            <p className="error">Please choose another email</p>
          )}
          <label>password</label>
          <input onChange={handlePass} type="password"></input>
          {!validPass && password && (
            <p className="error">
              Password should be at least 8 characters long and contain one
              capital letter and special symbol
            </p>
          )}
          <label>Enter your password again</label>
          <input type="password" onChange={RepeatPass}></input>
          {!validPassRepeat && passwordRepeat && (
            <p className="error">Passwords do not match</p>
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
