import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Container } from 'react-bootstrap';

const FooterLanding = () => {
    return (
        <footer className="footer-landing">
            <Container>
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="#" className="footer-link">
                            Privacy Policy
                        </a>
                        <a href="#" className="footer-link">
                            Terms of Service
                        </a>
                        <a href="#" className="footer-link">
                            Contact Support
                        </a>
                    </div>
                    <div className="footer-social">
                        <a href="#" className="social-icon">
                            <Facebook />
                        </a>
                        <a href="#" className="social-icon">
                            <Twitter />
                        </a>
                        <a href="#" className="social-icon">
                            <Instagram />
                        </a>
                        <a href="#" className="social-icon">
                            <Linkedin />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default FooterLanding;
