import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { logo } from "../../utils";
import { ForgetPassword } from "../../services/api"; // Ensure this is correct

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
// alert('1');
  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(""); // Clear previous errors
    
    // Validate Email
    if (!email.trim()) {
      setErrors("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setErrors("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await ForgetPassword({ email });

      if (response?.success) {
        setSuccess(true);
        toast.success("Reset email sent successfully!");
        setEmail(""); // Clear email field after success
      } else {
        setErrors(response?.message || "Something went wrong.");
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      setErrors(error?.message || "An error occurred.");
      toast.error(error?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="main-wrapper">
      <Row className="wrapper-row">
        <Col lg={6} md={12} sm={12} className="digital-banner d-flex align-items-start justify-content-center flex-column">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-default" />
          </Link>
          <h1 className="main-heading">Reset your password and regain access to your account.</h1>
        </Col>
        <Col lg={6} md={12} sm={12} className="user-transformation d-flex align-items-center justify-content-center flex-column">
          <div className="create-account">
            <h1 className="main-form mb-0 mt-1">No Worries!</h1>
            <Form className="mt-4 login-form" onSubmit={handleSubmit}>
              <div className="form-group d-flex flex-column gap-2">
                <label className="label-text">Please enter your Email Address*</label>
                <input
                  className="form-input"
                  placeholder="Enter your email address"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors && <p className="error-message secondary-text mb-0">{errors}</p>}
              </div>
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Reset Password"}
              </button>
              {success && <p className="success-message mt-3">Reset email sent successfully!</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
