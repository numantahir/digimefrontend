import { CheckCircle, QrCode, Share2, UserPlus } from 'lucide-react';
import React from 'react';
import { FaUserPlus, FaQrcode, FaShareAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {

    const steps = [
        {
            icon: <UserPlus className="icon text-[#B306A7]" />,
            title: "Sign Up & Create Your Profile",
            description: "Enter your business details and social links",
        },
        {
            icon: <QrCode className="icon text-[#B306A7]" />,
            title: "Get One QR Code",
            description: "Auto-generated and permanent",
        },
        {
            icon: <Share2 className="icon text-[#B306A7]" />,
            title: "Share Your Code",
            description: "Via QR Code or Direct Profile Link",
        },
        {
            icon: <CheckCircle className="icon text-[#B306A7]" />,
            title: "Others Save Your Contact",
            description: "Logged-in users can scan and save",
        },
    ];

    return (
        <section className="how-it-works">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div className="grid-container">
                    {steps.map((step, index) => (
                        <div key={index} className="card">
                            <div className="card-content">
                                {step.icon}
                                <h3 className="card-title">{step.title}</h3>
                                <p className="card-description">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;

