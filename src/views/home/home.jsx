import React from 'react';
import "./../../assets/css/page.css";
import HeaderHome from '../../components/HeaderHome';
import HeroSection from '../../components/HeroSection';
import HowItWorks from '../../components/HowItWorks';
import FeatureSection from '../../components/FeatureSection';
import LiveDemo from '../../components/LiveDemo';
import CTASection from '../../components/CTASection';
import FooterLanding from '../../components/FooterLanding';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
    return (
        <>
            <div className="home-container">
                <HeaderHome />
                <HeroSection />
                <HowItWorks />
                <FeatureSection />
                <LiveDemo />
                <CTASection />
                <FooterLanding />
            </div>
        </>
    );
}

export default Home;
