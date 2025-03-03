import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <Container>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Create & Share Your Digital Business Card Instantly
                        </h1>
                        <p className="hero-description">
                            Sign up once, get your permanent QR code, and connect effortlessly.
                        </p>
                        <Link to="/signup" className="btn gradient">
                            Get Started for Free
                        </Link>
                    </div>
                    <div className="hero-image">
                        <img
                            src="https://cdn.prod.website-files.com/5e26302469ca1d0fbae4a601/67339fd91583cac79bf19c15_electronic-business-cards.webp.webp"
                            alt="Electronic Business Cards"
                            className="image"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default HeroSection;
