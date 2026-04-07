import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NavigationBar from "./components/navbar";
import MyProfile from "./pages/my-profile";
import Footer from "./components/footer";

function App() {
  const isLoggedIn = false;
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route
          path="/"
          element={isLoggedIn ? <RegisterPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
