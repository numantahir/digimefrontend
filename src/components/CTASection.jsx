import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


const CTASection = () => {
    return (
        <section className="cta-section">
            <Container>
                <h2 className="cta-title">Start for Free – Get Your Digital Business Card Now!</h2>

                <Link to="/signup" className="cta-button">
                    Sign Up & Generate My QR Code
                    <ArrowRight className="cta-icon" />
                </Link>
            </Container>
        </section>
    );
}

export default CTASection;

