import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";
import { useAuth } from "../hooks/useAuth";
import ArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`nav-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="nav-header">
        {!isCollapsed && (
          <div className="nav-title">
            <Link to="/" className="home-link">
              Expense Tracker
            </Link>
          </div>
        )}
        <button className="nav-toggle" onClick={toggleCollapse}>
          {isCollapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </button>
      </div>
      {isAuthenticated && (
        <ul className="nav-list">
          <li>
            <Link
              to="/expenses"
              className={`nav-link ${
                location.pathname === "/expenses" ? "active" : ""
              }`}
            >
              Expenses
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className={`nav-link ${
                location.pathname === "/categories" ? "active" : ""
              }`}
            >
              Categories
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
