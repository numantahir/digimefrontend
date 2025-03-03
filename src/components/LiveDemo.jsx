import React from 'react';

const LiveDemo = () => {
    return (
        <section className="live-demo">
            <div className="container">
                <h2 className="section-title">Live Demo</h2>
                <div className="demo-content">
                    <div className="demo-item">
                        <h3 className="demo-title">Scan This QR Code</h3>
                        <img
                            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/155218223/original/937432033074dc5ee2112ce8bf2b50c37c8ddfa9/make-a-unique-and-stylish-qr-code-on-demand.png"
                            alt="Sample QR Code"
                            className="demo-image"
                        />
                    </div>
                    <div className="demo-item demo-two">
                        <h3 className="demo-title">Preview Profile Page</h3>
                        <img
                            src="https://miro.medium.com/v2/resize:fit:1400/1*bi57aCofdmjMttOvKCWEEg.jpeg"
                            alt="Mock-up of Public Profile"
                            className="demo-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LiveDemo;
