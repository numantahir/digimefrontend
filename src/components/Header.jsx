import React from "react";
import { Container } from "react-bootstrap";
import { RiUserLine } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Hamburger, head, logout } from "../utils";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/profile-view">
          <img src={head} alt="logo" className="logo-image" />
        </Link>

        <button className='menu-button' onClick={toggleMobileMenu}>
          <img src={Hamburger} alt="hamburger" />
        </button>

        {isMobileMenuOpen && (
          <div className="overlay" onClick={closeMenu}></div>
        )}

        <div className={`menu ${isMobileMenuOpen ? "menu-open" : "menu-closed"}`}>
          <div className="menu-btnss">
            <Link to="/profile-view" className="not-profile">
              <RiUserLine size={18} />
              My Profile
            </Link>
            <Link to="/save-profile" className="saved-profile">
              <IoBookmarkOutline size={18} className="save-icon" />
              Saved Profiles
            </Link>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            <img src={logout} alt="logout" className="logout-icon" />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
