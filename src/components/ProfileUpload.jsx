import React from 'react';
import { UserDummy } from '../utils';

const ProfileUpload = ({src}) => {
    return (
        <div className="profile-image-startup">
            <img src={src ?? UserDummy} alt="dummy-user" />
        </div>
    );
}

export default ProfileUpload;
