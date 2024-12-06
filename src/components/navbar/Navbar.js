import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUser, FaFileAlt, FaPen, FaCog, FaSignOutAlt, FaSearch } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = ({ isAuthenticated }) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
      setQuery(""); // Clear the search input
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dropdownMenuItems = [
    { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
    { name: "My Articles", path: "/dashboard/my-articles", icon: <FaFileAlt /> },
    { name: "Write Article", path: "/write-article", icon: <FaPen /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo}>
        Anony
      </NavLink>

      {/* Search Bar */}
      <form className={styles["search-container"]} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search articles..."
          className={styles["search-input"]}
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles["search-button"]}>
          <FaSearch />
        </button>
      </form>

      {/* Navigation Links */}
      <div className={styles["nav-links"]}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Articles
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          About
        </NavLink>

        {/* Dashboard and Dropdown Menu */}
        {isAuthenticated && (
          <div
            className={styles.dashboardContainer}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Dashboard
            </NavLink>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {dropdownMenuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={styles.dropdownItem}
                  >
                    {item.icon}
                    <span className={styles.linkText}>{item.name}</span>
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className={`${styles.dropdownItem} ${styles.logoutButton}`}
                >
                  <FaSignOutAlt />
                  <span className={styles.linkText}>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Login/Register Links */}
        {!isAuthenticated && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
