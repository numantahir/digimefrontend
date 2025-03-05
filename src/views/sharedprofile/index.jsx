import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CoverImage from '../../components/CoverImage';
import PreviewSection from '../../components/PreviewSection';
import Footer from '../../components/Footer';
import { sharedProfile } from '../../services/api';
import { useParams, useNavigate } from "react-router-dom";
import PublicSection from '../../components/PublicSection';
import HeaderTwo from '../../components/HeaderTwo';

const SharedProfile = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await sharedProfile(username);
    
            if (response && response.data) {
                setData(response.data.data);
            } else {
                console.error("No data received");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (username) fetchProfile();
    }, [username]);
    
    if (loading) return <p>Loading...</p>;
    

    return (
        <div className="layout">
            <div className="content-main">
                <HeaderTwo data={data} />
                <CoverImage src={data.cover_image} />
                <PublicSection data={data} />
            </div>
            <Footer />
        </div>
    );
}

export default SharedProfile;
