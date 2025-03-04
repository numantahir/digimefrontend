import React, { useEffect } from 'react';
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
    const [profile, setProfile] = React.useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Extract the nested data object
    const profileData = data || {};

    useEffect(() => {
        if (profileData) {
            setProfile(Array.isArray(profileData) ? profileData[0] : profileData);
        }
    }, [profileData]);

    const SaveProfileHandler = async () => {
        
        console.log("Profile Data in Click:", profile);
        console.log("Profile URL in Click:", profile?.user_profile_url);

        if (!profile?.user_profile_url) {
            toast.error("No profile URL available!");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                user_profile_url: profile.user_profile_url
            };
            const response = await SaveSharedProfile(payload);
            console.log('SavedProfile', response);
            if (response.status === 200) {
                toast.success("Profile saved successfully!");
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
                        onClick={SaveProfileHandler}
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
