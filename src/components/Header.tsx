import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/Header.css";

const Header: React.FC = () => {
  const { login, logoutUser, user, isAuthenticated, resetPassword } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <nav className="header-actions">
          {isAuthenticated ? (
            <div>
              <span className="username">{user?.name}</span>
              <button className="link-btn" onClick={logoutUser}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <button className="link-btn" onClick={login}>
                Login
              </button>
              <button className="link-btn reset-btn" onClick={resetPassword}>
                Reset Password
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
