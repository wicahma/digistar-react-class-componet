import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie.jsx";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [window]);

  useEffect(() => {
    const root = document.getElementById("root");
    root.classList.add("transition-all", "duration-300");
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className="app">
      <div className="container mx-auto">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<Movie />}
                  isAuthenticated={isLoggedIn}
                />
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
