import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CoverUpload from '../../components/CoverUpload';
import ProfileEdit from '../../components/ProfileEdit';
import { getProfile } from '../../services/api';
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const [data, setData] = useState(null);
    const [cover, setCover] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const response = await getProfile();
        console.log('Profile Data aa rahy..>', response.data);
        //alert(' > ' + response.data.cover_image);
        // alert(JSON.stringify(response.data));
        if (response.data) {
            setData(response.data.data);
        }
        
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
            return;
        }
        fetchProfile()
    }, [])
    return (
        <div className="layout">
            <div className="content-main">
                <Header />
                <CoverUpload setCover={setCover} image={data?.cover_image} />
                <ProfileEdit data={data} cover={cover} image={data?.profile_image} />
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;
