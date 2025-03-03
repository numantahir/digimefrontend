import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile();
            // Extract profile data from the nested structure
            if (response.status && response.data) {
                setProfile(response.data);
            } else {
                throw new Error('Invalid profile data structure');
            }
        } catch (err) {
            console.error('Error loading profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profile) return <div>No profile data available</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                {profile.profile_image && (
                    <img 
                        src={profile.profile_image} 
                        alt="Profile" 
                        className="profile-image"
                    />
                )}
                <h1>{`${profile.first_name} ${profile.last_name}`.trim()}</h1>
            </div>

            <div className="profile-details">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Profile URL:</strong> {profile.user_profile_url}</p>
                {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
                {profile.website && <p><strong>Website:</strong> {profile.website}</p>}
                {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
            </div>

            {profile.social_links && profile.social_links.length > 0 && (
                <div className="social-links">
                    <h2>Social Links</h2>
                    <ul>
                        {profile.social_links.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileView; 