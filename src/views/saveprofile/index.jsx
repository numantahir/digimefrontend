import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SaveSection from '../../components/SaveSection';
import { useNavigate } from 'react-router-dom';

const SaveProfile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
            return;
        }
    }, []);

    return (
        <div className="layout">
            <div className="content-main">
                <Header />
                <SaveSection />
            </div>
            <Footer />
        </div>
    );
}

export default SaveProfile;
