import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Articles from "./pages/articles/Articles";
import SearchArticles from "./components/articleUtils/SearchArticles";
import About from "./pages/about/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyArticles from "./components/myArticles/MyArticles";
import WriteArticle from "./components/articleUtils/WriteArticle";
import ArticleDetails from "./components/articleUtils/ArticleDetails";
import EditArticle from "./components/articleUtils/EditArticle";
import Settings from "./components/dashboard/Settings";
import Profile from "./components/dashboard/Profile";
import NotFound from "./pages/notFound/NotFound";
import "./styles/App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    return (
        <React.StrictMode>
            <Router>
                <div className="app-container">
                    <Navbar isAuthenticated={isAuthenticated} />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login login={login} />} />
                        <Route path="/register" element={<Register login={login} />} />
                        <Route path="/article/:id" element={<ArticleDetails />} />
                        <Route path="/edit-article/:articleId" element={<EditArticle />} />
                        <Route path="/search" element={<SearchArticles />} />

                        {/* Restricted Routes */}
                        <Route
                            path="/write-article"
                            element={isAuthenticated ? <WriteArticle /> : <Navigate to="/login" replace />}
                        />
                        <Route
                            path="/dashboard/*"
                            element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/login" replace />}
                        >
                            <Route index element={<Navigate to="profile" replace />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="my-articles" element={<MyArticles />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>

                        {/* Catch-All Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </React.StrictMode>
    );
}

export default App;
