import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CoverImage from '../../components/CoverImage';
import PreviewSection from '../../components/PreviewSection';
import Footer from '../../components/Footer';
import { getProfile } from '../../services/api';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const response = await getProfile();
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
                <CoverImage src={data?.cover_image} />
                <PreviewSection data={data} />
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
