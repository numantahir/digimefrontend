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
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const response = await sharedProfile(username);

            if (response?.data?.status) {
                setData(response.data.data);
            } else {
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                navigate("/");
            } else {
                console.error("Error fetching profile:", error);
            }
        }
    };

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div className="layout">
            <div className="content-main">
                <HeaderTwo data={data} />
                <CoverImage src={data?.cover_image} />
                <PublicSection data={data} />
            </div>
            <Footer />
        </div>
    );
}

export default SharedProfile;
