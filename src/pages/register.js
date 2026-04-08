import "./register.css";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordRepeat, SetPasswordRepeat] = useState("");

  const [validEmail, setvalidEmail] = useState(false);
  const [validPass, setvalidPass] = useState(false);
  const [validPassRepeat, setvalidPassRepeat] = useState(false);

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
    e.preventDefault();

    if (validEmail && validPass && validPassRepeat) {
      //submit form and pass the input values so user can register
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>email</label>
      <input onChange={handleEmail} value={email}></input>
      {!validEmail &&
        email && ( //if the email is invalid and something was typed in then it shows the invalid text
          <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>
            Invalid email format
          </p>
        )}
      <label>password</label>
      <input onChange={handlePass} input type="password"></input>
      {!validPass && password && (
        <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>
          Password should be at least 8 characters long and contain one capital
          letter and special symbol
        </p>
      )}
      <label>Enter your password again</label>
      <input input type="password" onChange={RepeatPass}></input>
      {!validPassRepeat && passwordRepeat && (
        <p style={{ color: "red", marginTop: "-20px", marginBottom: "10px" }}>
          Passwords do not match
        </p>
      )}
      <button>Register</button>
    </form>
  );
};
export default RegisterPage;
