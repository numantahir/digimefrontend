import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import { logout } from '../utils';

const HeaderHome = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem('authToken');
    const isTokenValid = token && token !== '';

    return (
        <header className='header-landing'>
            <Container>
                <nav className="navbar">
                    <div className="navbar-left">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DigiMe-vJgzyR08F0tBXeqoZOpjjtZ5gizS66.svg"
                            alt="DigiMe Logo"
                            className="dignol-logo"
                        />
                        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                            <a href="#features" className="nav-item">Features</a>
                            <a href="#pricing" className="nav-item">Pricing</a>
                            <a href="#about" className="nav-item">About</a>
                            <a href="#contact" className="nav-item">Contact</a>
                            <div className='mobile-links'>

                                {isTokenValid ? (
                                    <Link to="/profile-view" className="btn gradient">My profile</Link>

                                ) : (
                                    <>
                                        <Link to="/login" className="simple-btn">Sign In</Link>
                                        <Link to="/signup" className="btn gradient">Get Started</Link>
                                    </>
                                )}
                            </div>


                            {/* <div className='mobile-links'>
                                <Link to="/login" className="simple-btn">Sign In</Link>
                                <Link to="/signup" className="btn gradient">Get Started</Link>
                            </div> */}
                        </div>
                    </div>
                    <div className="navbar-right">
                        <div className="auth-links">
                            {isTokenValid ? (
                                <div className='d-flex align-items-center gap-3'>
                                    <Link to="/profile-view" className="btn gradient">My profile</Link>
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
                            ) : (
                                <>
                                    <Link to="/login" className="simple-btn">Sign In</Link>
                                    <Link to="/signup" className="btn gradient">Get Started</Link>
                                </>
                            )}
                        </div>
                        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <BiX className="menu-icon" /> : <BiMenu className="menu-icon" />}
                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default HeaderHome;
