import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaPen,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
    { name: "My Articles", path: "/dashboard/my-articles", icon: <FaFileAlt /> },
    { name: "Write Article", path: "/write-article", icon: <FaPen /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getLinkClass = (isActive) =>
    isActive
      ? `${styles.activeLink} ${styles.sidebarLink}`
      : styles.sidebarLink;

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      <ul className={styles.menu} role="menu">
        {menuItems.map((item) => (
          <li key={item.name} className={styles.menuItem} role="menuitem">
            <NavLink to={item.path} className={({ isActive }) => getLinkClass(isActive)}>
              {item.icon}
              {isOpen && <span className={styles.linkText}>{item.name}</span>}
            </NavLink>
          </li>
        ))}
        <li className={styles.menuItem} role="menuitem">
          <button
            onClick={handleLogout}
            className={`${styles.sidebarLink} ${styles.logoutButton}`}
          >
            <FaSignOutAlt />
            {isOpen && <span className={styles.linkText}>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
