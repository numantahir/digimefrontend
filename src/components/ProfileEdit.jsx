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

const ProfileEdit = ({ data, cover }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [platforms, setPlatforms] = useState([]);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        user_profile_url: '',
        bio: '',
        website: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch social media platforms
    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await getPlatforms();
                console.log('SP area----------->',response);
                setPlatforms(response.data.data || []);
            } catch (error) {
                console.error("Error fetching platforms", error);
            }
        };

        fetchPlatforms();
    }, []);

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            profileName: data?.first_name ?? "",
            websiteUrl: data?.website ?? "",
            bio: data?.bio ?? "",
            phoneNumber: data?.phone ?? "",
            email: data?.email ?? "",
            socialLinks: {} ?? "",
            customProfileUrl: data?.user_profile_url ?? ""
        }
    });

    useEffect(() => {
        if (data) {
            console.log("Received API Data:", data);
    
            const formattedSocialLinks = data.social_links?.reduce((acc, item) => {
                acc[item?.social_platform?.social_name] = item.social_link || "";
                return acc;
            }, {}) || {};
    
            reset({
                profileName: data.first_name || "",
                websiteUrl: data.website || "",
                bio: data.bio || "",
                phoneNumber: data.phone || "",
                email: data.email || "",
                socialLinks: formattedSocialLinks,
                customProfileUrl: data.user_profile_url || ""
            });
    
            setImage(data.profile_image || null);
            setFormData({
                id: data.id || '',
                first_name: data.first_name || '',
                last_name: data.last_name || '',
                email: data.email || '',
                user_profile_url: data.user_profile_url || '',
                bio: data.bio || '',
                website: data.website || '',
                phone: data.phone || ''
            });
        }
    }, [data, reset]);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile();
            console.log('Full API Response:', response);
            
            if (response?.status === true && response?.data) {
                const profileData = response.data;
                console.log('Profile Data:', profileData);

                // Format social links into an object using the correct platform key
                const formattedSocialLinks = profileData.social_links?.reduce((acc, item) => {
                    if (item.platform) {  // Changed from social_platform to platform
                        acc[item.platform.social_name] = item.social_link || "";
                    }
                    return acc;
                }, {}) || {};

                console.log('Formatted Social Links:', formattedSocialLinks);

                // Create a complete form data object
                const completeFormData = {
                    id: profileData.id || '',
                    profileName: profileData.first_name || '',
                    websiteUrl: profileData.website || '',
                    bio: profileData.bio || '',
                    phoneNumber: profileData.phone || '',
                    email: profileData.email || '',
                    customProfileUrl: profileData.user_profile_url || '',
                    socialLinks: formattedSocialLinks
                };

                console.log('Setting form values:', completeFormData);

                // Set all form values at once
                reset(completeFormData);

                setImage(profileData.profile_image || null);
                setFormData({
                    id: profileData.id || '',
                    first_name: profileData.first_name || '',
                    last_name: profileData.last_name || '',
                    email: profileData.email || '',
                    user_profile_url: profileData.user_profile_url || '',
                    bio: profileData.bio || '',
                    website: profileData.website || '',
                    phone: profileData.phone || ''
                });
            }
        } catch (err) {
            console.error('Error loading profile:', err);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    // Debug: Log formData changes
    useEffect(() => {
        console.log('Current formData state:', formData);
    }, [formData]);

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const formattedSocialLinks = platforms
                .map(platform => ({
                    social_type_id: platform.id,
                    social_link: formData?.socialLinks[platform.social_name] || ""
                }))
                .filter(item => item.social_link.trim() !== "");

            const payload = {
                id: formData.id,
                first_name: formData.profileName,
                last_name: formData.profileName,
                bio: formData.bio,
                user_profile_url: formData.customProfileUrl,
                phone: formData.phoneNumber,
                website: formData.websiteUrl,
                social_links: formattedSocialLinks,
                profile_image: image,
                cover_image: cover
            };
            console.log("Submitting form data:", payload);
            const response = await updateProfile(payload);

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    navigate("/profile-view");
                }, 1500);
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        setLoading(true);
        
        // Log the data being submitted
        console.log('Submitting form data:', formData);

        updateProfile(formData)
            .then(response => {
                console.log('Update response:', response);
                if (response?.status) {
                    setSuccessMessage('Profile updated successfully!');
                    return loadProfile();
                } else {
                    throw new Error(response?.message || 'Update failed');
                }
            })
            .catch(err => {
                console.error('Update error:', err);
                setError(err.message || 'Failed to update profile');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Show loading state
    if (loading) {
        return <div className="text-center mt-5">Loading profile data...</div>;
    }

    // Debug: Log render
    console.log('Rendering with formData:', formData);

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
