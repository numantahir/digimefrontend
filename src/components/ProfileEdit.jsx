import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import CoverUploader from "./CoverUploader";
import { getPlatforms, updateProfile, getProfile } from "../services/api";
import { useNavigate } from 'react-router-dom';

// Validation Schema
const schema = yup.object().shape({
    profileName: yup.string().required("Profile Name is required"),
    websiteUrl: yup.string().url("Invalid URL"),
    bio: yup.string(),
    phoneNumber: yup.string().matches(/^[0-9+-]+$/, "Invalid phone number").required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    // socialLinks: yup.array().of(yup.string().url("Invalid URL")),
    socialLinks: yup.mixed(),
    customProfileUrl: yup.string(),
});

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [platforms, setPlatforms] = useState([]);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch social media platforms
    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await getPlatforms();
                setPlatforms(response.data.data || []);
            } catch (error) {
                console.error("Error fetching platforms", error);
            }
        };

        fetchPlatforms();
    }, []);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile();
            console.log('Full API Response:', response);
            
            // Access the nested data structure
            if (response?.status && response?.data) {
                console.log('Setting form data with:', response.data);
                setFormData(response.data);
            } else {
                throw new Error('Invalid data structure received');
            }
        } catch (err) {
            console.error('Error loading profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Debug useEffect to monitor formData changes
    useEffect(() => {
        console.log('Current formData:', formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            profileName: formData?.first_name,
            websiteUrl: formData?.website,
            bio: formData?.bio,
            phoneNumber: formData?.phone,
            email: formData?.email,
            socialLinks: {} ?? "",
            customProfileUrl: formData?.user_profile_url
        }
    });

    const onSubmit = async (formData) => {
        setError(null);
        setSuccessMessage('');
        setLoading(true);
        try {
            const formattedSocialLinks = platforms
                .map(platform => ({
                    social_type_id: platform.id,
                    social_link: formData?.socialLinks[platform.social_name] || ""
                }))
                .filter(item => item.social_link.trim() !== "");

            const payload = {
                first_name: formData.profileName,
                last_name: formData.profileName,
                bio: formData.bio,
                user_profile_url: formData.customProfileUrl,
                phone: formData.phoneNumber,
                website: formData.websiteUrl,
                social_links: formattedSocialLinks,
                profile_image: image,
                cover_image: image
            };

            const response = await updateProfile(payload);

            if (response.status === 200) {
                setSuccessMessage('Profile updated successfully!');
                await loadProfile();
            } else {
                throw new Error(response.message || 'Update failed');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading profile data...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">Error: {error}</div>;
    }

    if (!formData) {
        return <div className="text-center mt-5">No profile data available</div>;
    }

    return (
        <section className="position-relative">
            <Container>
                <CoverUploader setImage={setImage} image={image} />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="margin-edit">
                        <Col md={5}>
                            <Form.Group controlId="profileName">
                                <Form.Label className="label-form">Profile Name</Form.Label>
                                <Form.Control {...register("profileName")} type="text" placeholder="Enter your profile name" className="input-edit" />
                                <small className="text-danger">{errors.profileName?.message}</small>
                            </Form.Group>
                        </Col>
                        <Col md={7}>
                            <Form.Group controlId="websiteUrl">
                                <Form.Label className="label-form">Website URL</Form.Label>
                                <Form.Control className="input-edit" {...register("websiteUrl")} type="url" placeholder="Enter your website url" />
                                <small className="text-danger">{errors.websiteUrl?.message}</small>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="bio" className="profiles-margin">
                        <Form.Label className="label-form">Bio</Form.Label>
                        <Form.Control className="input-edit bio-edit" {...register("bio")} as="textarea" rows={3} placeholder="Tell something about yourself" />
                    </Form.Group>

                    <Row className="profiles-margin other-profile">
                        <Col md={6}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label className="label-form">Phone Number</Form.Label>
                                <Form.Control className="input-edit" {...register("phoneNumber")} type="tel" placeholder="Enter your phone number" />
                                <small className="text-danger">{errors.phoneNumber?.message}</small>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label className="label-form">Email Address</Form.Label>
                                <Form.Control className="input-edit" readOnly {...register("email")} type="email" placeholder="Enter your email address" />
                                <small className="text-danger">{errors.email?.message}</small>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="profiles-margin row-gap">
                        {platforms && platforms?.map((platform, index) => (
                            <Col md={6} key={platform.id}>
                                <Form.Group controlId={`socialLinks.${platform.social_name}`}>
                                    <Form.Label className="label-form">
                                        <img src={platform.social_icon} alt={platform.social_name} style={{ width: 20, height: 20, marginRight: 5 }} />
                                        {platform.social_name}
                                    </Form.Label>
                                    <Form.Control className="input-edit" {...register(`socialLinks.${platform.social_name}`)} type="url" placeholder={`Enter your ${platform.social_name} link`} />
                                    <small className="text-danger">{errors?.socialLinks?.[platform.social_name]?.message}</small>
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>

                    <Row className="mb-3 customize-url simple-edits">
                        <Col md={6}>
                            <Form.Group controlId="customProfileUrl">
                                <Form.Label className="label-form">Customize Profile URL</Form.Label>
                                <Form.Control className="input-edit" {...register("customProfileUrl")} readOnly type="url" placeholder="Enter your custom URL" />
                                <small className="text-danger">{errors.customProfileUrl?.message}</small>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-3 align-items-center margin-btns">
                        <Button variant="" disabled={loading} className="cancel-btn">Cancel</Button>
                        <Button variant="" className="save-btn d-flex justify-content-center align-items-center gap-2" type="submit" disabled={loading}>
                            Update Profile
                            {loading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </section>
    );
};

export default ProfileEdit;
