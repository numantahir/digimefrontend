import React, { useRef } from 'react';
import ProfileUpload from './ProfileUpload';
import { Col, Container, Row } from 'react-bootstrap';
import { email, phone } from '../utils';
import QRCode from 'react-qr-code';
import { IoBookmarkOutline } from 'react-icons/io5';
import { SaveSharedProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PublicSection = ({ data }) => {
    const navigate = useNavigate();
    const qrRef = useRef(null);
    const [loading, setLoading] = React.useState(false);

    const handleSaveProfile = async () => {
        if (!data?.user_profile_url) {
            alert("No profile URL available!");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                user_profile_url: data.user_profile_url
            };
            const response = await SaveSharedProfile(payload);
            if (response.status === 200) {
                toast.success("Profile save successfully!");
                setTimeout(() => {
                    navigate("/save-profile");
                }, 1500);
            } else {
                toast.error("Failed to save profile.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <Container className='position-relative'>
                <ProfileUpload src={data?.profile_image} />
                <Row className='profile-margin'>
                    <Col lg={5} md={12} sm={12} xs={12} className='p-0'>
                        <div>
                            <h1 className='heading-profile'>
                                {data?.first_name ? data?.first_name : ""}
                            </h1>
                            <div className='d-flex gap-2 align-items-center profit-profile'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <g clip-path="url(#clip0_141_8855)">
                                            <path d="M14.25 0.75H3.75C2.7558 0.751191 1.80267 1.14666 1.09966 1.84966C0.396661 2.55267 0.00119089 3.5058 0 4.5L0 13.5C0.00119089 14.4942 0.396661 15.4473 1.09966 16.1503C1.80267 16.8533 2.7558 17.2488 3.75 17.25H14.25C15.2442 17.2488 16.1973 16.8533 16.9003 16.1503C17.6033 15.4473 17.9988 14.4942 18 13.5V4.5C17.9988 3.5058 17.6033 2.55267 16.9003 1.84966C16.1973 1.14666 15.2442 0.751191 14.25 0.75ZM3.75 2.25H14.25C14.8467 2.25 15.419 2.48705 15.841 2.90901C16.2629 3.33097 16.5 3.90326 16.5 4.5V5.25H1.5V4.5C1.5 3.90326 1.73705 3.33097 2.15901 2.90901C2.58097 2.48705 3.15326 2.25 3.75 2.25ZM14.25 15.75H3.75C3.15326 15.75 2.58097 15.5129 2.15901 15.091C1.73705 14.669 1.5 14.0967 1.5 13.5V6.75H16.5V13.5C16.5 14.0967 16.2629 14.669 15.841 15.091C15.419 15.5129 14.8467 15.75 14.25 15.75ZM14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H4.5C4.30109 10.5 4.11032 10.421 3.96967 10.2803C3.82902 10.1397 3.75 9.94891 3.75 9.75C3.75 9.55109 3.82902 9.36032 3.96967 9.21967C4.11032 9.07902 4.30109 9 4.5 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75ZM11.25 12.75C11.25 12.9489 11.171 13.1397 11.0303 13.2803C10.8897 13.421 10.6989 13.5 10.5 13.5H4.5C4.30109 13.5 4.11032 13.421 3.96967 13.2803C3.82902 13.1397 3.75 12.9489 3.75 12.75C3.75 12.5511 3.82902 12.3603 3.96967 12.2197C4.11032 12.079 4.30109 12 4.5 12H10.5C10.6989 12 10.8897 12.079 11.0303 12.2197C11.171 12.3603 11.25 12.5511 11.25 12.75ZM2.25 3.75C2.25 3.60166 2.29399 3.45666 2.3764 3.33332C2.45881 3.20999 2.57594 3.11386 2.71299 3.05709C2.85003 3.00032 3.00083 2.98547 3.14632 3.01441C3.2918 3.04335 3.42544 3.11478 3.53033 3.21967C3.63522 3.32456 3.70665 3.4582 3.73559 3.60368C3.76453 3.74917 3.74968 3.89997 3.69291 4.03701C3.63614 4.17406 3.54001 4.29119 3.41668 4.3736C3.29334 4.45601 3.14834 4.5 3 4.5C2.80109 4.5 2.61032 4.42098 2.46967 4.28033C2.32902 4.13968 2.25 3.94891 2.25 3.75ZM4.5 3.75C4.5 3.60166 4.54399 3.45666 4.6264 3.33332C4.70881 3.20999 4.82594 3.11386 4.96299 3.05709C5.10003 3.00032 5.25083 2.98547 5.39632 3.01441C5.5418 3.04335 5.67544 3.11478 5.78033 3.21967C5.88522 3.32456 5.95665 3.4582 5.98559 3.60368C6.01453 3.74917 5.99968 3.89997 5.94291 4.03701C5.88614 4.17406 5.79001 4.29119 5.66668 4.3736C5.54334 4.45601 5.39834 4.5 5.25 4.5C5.05109 4.5 4.86032 4.42098 4.71967 4.28033C4.57902 4.13968 4.5 3.94891 4.5 3.75ZM6.75 3.75C6.75 3.60166 6.79399 3.45666 6.8764 3.33332C6.95881 3.20999 7.07594 3.11386 7.21299 3.05709C7.35003 3.00032 7.50083 2.98547 7.64632 3.01441C7.7918 3.04335 7.92544 3.11478 8.03033 3.21967C8.13522 3.32456 8.20665 3.4582 8.23559 3.60368C8.26453 3.74917 8.24968 3.89997 8.19291 4.03701C8.13614 4.17406 8.04002 4.29119 7.91668 4.3736C7.79334 4.45601 7.64834 4.5 7.5 4.5C7.30109 4.5 7.11032 4.42098 6.96967 4.28033C6.82902 4.13968 6.75 3.94891 6.75 3.75Z" fill="#888888" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_141_8855">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <p className='mb-0 profile-url'>
                                    {data?.website || "No Website Available"}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7} md={12} sm={12} xs={12} className="d-flex column-center justify-content-end align-items-center">

                    </Col>
                </Row>

                <Row className='margin-selection'>
                    <Col lg={8} md={12} sm={12} xs={12}>
                        <div className='about-section about-margin'>
                            <h1 className='about-heading'>
                                About My Self
                            </h1>
                            <p className='about-description mb-0'>
                                {data?.bio || "No Bio Available"}
                            </p>
                        </div>

                        <Row className='about-margin about-phone'>
                            <Col lg={6} md={12} sm={12} xs={12}>
                                <div className='about-section d-flex align-items-center gap-3'>
                                    <div className='phone-cell'>
                                        <img src={phone} alt="phone" />
                                    </div>
                                    <p className='mb-0 phone-desc'>
                                        {data?.phone ? (
                                            <a href={`tel:${data.phone}`} className="text-decoration-none phone-desc">
                                                {data.phone}
                                            </a>
                                        ) : "N/A"}
                                    </p>
                                </div>
                            </Col>

                            <Col lg={6} md={12} sm={12} xs={12}>
                                <div className='about-section d-flex align-items-center gap-3'>
                                    <div className='phone-cell'>
                                        <img src={email} alt="email" />
                                    </div>
                                    <p className='mb-0 phone-desc'>
                                        {data?.email ? (
                                            <a href={`mailto:${data.email}`} className="text-decoration-none phone-desc">
                                                {data.email}
                                            </a>
                                        ) : "N/A"}
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <div className='about-section'>
                            <h1 className='about-heading'>
                                Social Links
                            </h1>

                            <div className='social-main'>
                                {(data?.social_links || []).map((info, index) => (
                                    <a key={index} href={info?.social_link} target="_blank" className='social-box'>
                                        <img src={info?.social_platform?.social_icon} alt="social-icon" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Col>

                    <Col lg={4} md={12} sm={12} xs={12}>

                        <div className='qr-selection'>
                            {/* <img src={QrSelection} alt="qr" /> */}
                            <div className='qr-mobile-column' style={{ height: "auto", margin: "0 auto", maxWidth: 339, width: "100%" }}>
                                <div ref={qrRef}>
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={data?.user_profile_url ?? 'N/A'}
                                        viewBox={`0 0 256 256`}
                                        fgColor="rgba(84, 84, 84, 0.74)"
                                        bgColor="rgba(255, 255, 255, 0.04)"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mobile-savebtn'>
                            <button
                                className="saved-profile"
                                onClick={handleSaveProfile}
                                disabled={loading}
                            >
                                <IoBookmarkOutline size={18} className="save-icon" />
                                {loading ? "Saving..." : "Save Profile"}
                            </button>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default PublicSection;
