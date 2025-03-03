import { CheckCircle } from 'lucide-react';
import React from 'react';
import { Container } from 'react-bootstrap';

const FeatureSection = () => {

    const features = [
        "One-Time QR Code for Permanent Sharing",
        "Free & Unlimited Profile Access",
        "Share via QR Code or Custom Profile Link",
        "Mobile-Optimized & Easy to Use",
    ];

    return (
        <section className="why-use-digime">
            <Container>
                <h2 className="section-title why-uss">Why Use DigiMe?</h2>
                <div className="content">
                    <div className="card featured-card">
                        <ul className="feature-list">
                            {features.map((feature, index) => (
                                <li key={index} className="feature-item">
                                    <CheckCircle className="check-icon" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="image-container">
                        <img
                            src="https://cdn.prod.website-files.com/61b89302d6c6c1a48f5fd76a/632c3fad60102642967ec6ff_Group%201000001724%20(1).jpg"
                            alt="DigiMe Features"
                            className="feature-image"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default FeatureSection;
