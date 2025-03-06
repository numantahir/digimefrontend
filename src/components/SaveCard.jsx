import React from 'react';
import { Eye, Trash2 } from "lucide-react";
import { DummyProfile } from '../utils';

const SaveCard = ({ profile, onDelete }) => {

    const handleViewProfile = () => {
        const profileUrl = process.env.REACT_APP_Frontend_Url + `profile/${profile.user_profile_url}`;
        window.location.href = profileUrl;
    };

    return (
        <div className="profile-card">
            {/* Profile Image */}
            <div className="profile-image">
                <img src={profile.profile_image || DummyProfile} alt="Profile" />
            </div>

            {/* Name and Website Link */}
            <div className="profile-info">
                <h2 className="profile-name">{profile.first_name}</h2>
                <div className='d-flex align-items-center gap-2'>
                    <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link"
                    >
                        {profile.website}
                    </a>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
                <button className="action-button view-button" onClick={handleViewProfile}>
                    <Eye size={18} />
                </button>
                <button className="action-button delete-button" onClick={() => onDelete(profile.id)}>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

export default SaveCard;
