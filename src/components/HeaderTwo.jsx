import React from "react";
import { Container } from "react-bootstrap";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Hamburger, head } from "../utils";
import { SaveSharedProfile } from "../services/api";
import toast from "react-hot-toast";

const HeaderTwo = ({ data }) => {
    // alert(data?.user_profile_url);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleSaveProfile = async () => {
        if (!data?.user_profile_url) {
            alert("No profile URL available!");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                user_profile_url: data.user_profile_url
            };
            const response = await SaveSharedProfile(payload);
            if (response.status === 200) {
                toast.success("Profile save successfully!");
                setTimeout(() => {
                    navigate("/save-profile");
                }, 1500);
            } else {
                toast.error("Failed to save profile.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="header">
            <Container className="d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src={head} alt="logo" className="logo-image" />
                </Link>

                <button className='menu-button' onClick={toggleMobileMenu}>
                    <img src={Hamburger} alt="hamburger" />
                </button>

                {isMobileMenuOpen && (
                    <div className="overlay" onClick={closeMenu}></div>
                )}

                <div className={`menu ${isMobileMenuOpen ? "menu-open" : "menu-closed"}`}>
                    <button 
                        className="saved-profile" 
                        onClick={handleSaveProfile}
                        disabled={loading}
                    >
                        <IoBookmarkOutline size={18} className="save-icon" />
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </Container>
        </header>
    );
};

export default HeaderTwo;
