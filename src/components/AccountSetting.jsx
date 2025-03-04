import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import {  getProfile, updatePassword } from "../services/api";

const AccountSetting = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({ userName: '', email: '' });
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const response = await getProfile();
        console.log(response.data);
        if (response.data) {
            setUserData(response.data);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
            return;
        }
        fetchProfile();
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const payload = {
                password: data.password
            };
            const response = await updatePassword(payload);
            if (response.status === 200) {
                toast.success("Password updated successfully!");
                setTimeout(() => {
                    navigate("/profile-view");
                }, 1500);
            } else {
                toast.error("Failed to update password.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="accounts-settings">
            <Container>
                <div className="section-settings">
                    <h2>Account Settings</h2>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3 row-bottom'>
                        {/* <Col lg={6} md={12} sm={12} xs={12}>
                            <Form.Group controlId="userName">
                                <Form.Label className="label-form">User Name</Form.Label>
                                <Form.Control
                                    className="input-edit"
                                    type="text"
                                    value={userData.userName}
                                    readOnly
                                />
                            </Form.Group>
                        </Col> */}
                        <Col lg={6} md={12} sm={12} xs={12}>
                            <Form.Group controlId="email">
                                <Form.Label className="label-form">Email Address</Form.Label>
                                <Form.Control
                                    className="input-edit"
                                    type="email"
                                    value={userData.email}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12} xs={12}>
                            <Form.Group controlId="password">
                                <Form.Label className="label-form">New Password</Form.Label>
                                <Form.Control
                                    className="input-edit"
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                    type="password"
                                    placeholder="Enter new password"
                                />
                            
                            </Form.Group>
                            {errors.password && <small className="text-danger">{errors.password.message}</small>}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-3 align-items-center margin-btns">
                        <Button variant="" disabled={loading} className="cancel-btn">Cancel</Button>
                        <Button variant="" className="save-btn d-flex justify-content-center align-items-center gap-2" type="submit" disabled={loading}>
                            Update Password
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

export default AccountSetting;
