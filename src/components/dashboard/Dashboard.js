import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

    const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) setIsSidebarOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.body}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div
                    className={`${styles.mainContent} ${
                        isSidebarOpen ? styles.expanded : styles.collapsed
                    }`}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
