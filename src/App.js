import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NavigationBar from "./components/navbar";
import MyProfile from "./pages/my-profile";
import Footer from "./components/footer";
import HomePage from "./pages/home";
import SampleHomePage from "./pages/sample-home";

//start json server - json-server --watch src/db/profiles.json --port 3002

export const LoginContext = createContext(); //global varaible to keep track if user is logged in or not

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //since it's a const change it's value with state
  return (
    //make it a parent to everything so every page can access it
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sample-home" element={<SampleHomePage />} />
        <Route
          path="/"
          element={isLoggedIn ? <RegisterPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;
