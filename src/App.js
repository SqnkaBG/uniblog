import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NavigationBar from "./components/navbar";
import MyProfile from "./pages/my-profile";
import Footer from "./components/footer";
import HomePage from "./pages/home";
import AddPost from "./pages/addPost";

//install json server: npm install -g json-server
//start json server - json-server --watch src/db/db.json --port 3002

export const LoginContext = createContext(); //global varaible to keep track if user is logged in or not

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //since it's a const change it's value with state
  const [userId, setUserId] = useState("");
  return (
    //make it a parent to everything so every page can access it
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
    >
      <NavigationBar />
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/my-profile"
          element={isLoggedIn ? <MyProfile /> : <Navigate to={"/"} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <HomePage />}
        />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <HomePage />} />
        <Route path="" element={<HomePage />} />
        <Route
          path="/addPost"
          element={isLoggedIn ? <AddPost /> : <Navigate to={"/"} />}
        />
        <Route path="/test" element={<AddPost />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </LoginContext.Provider>
  );
};

export default App;
