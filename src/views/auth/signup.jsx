import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Goggle, logo } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { register } from "../../services/api";


const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter a password";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      handleSignUp();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // const handleSignUp = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await register({
  //       first_name: formData.username,
  //       last_name: "", 
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     // console.log("Signup successful:", response.data);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Signup failed:", error.response?.data || error.message);
  //     toast.error(error.response?.data?.message || "Signup failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await register({
        first_name: formData.username,
        last_name: "",
        email: formData.email,
        password: formData.password,
      });

      toast.success("User Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
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

          <h1 className="main-heading ">Just some details to <br /> <span className="not-capitalize">get you in!</span></h1>
        </Col>
        <Col lg={6} md={12} sm={12} className="user-transformation d-flex align-items-center justify-content-center flex-column ">
          <div className="create-account">
            <h1 className="main-form mb-0 mt-1">Sign Up!</h1>
            <Form className="mt-4 login-form" onSubmit={handleSubmit}>
              <div className="form-group d-flex flex-column gap-2">
                <label className="label-text">User Name*</label>
                <input
                  className="form-input"
                  type="text"
                  name="username"
                  placeholder="Enter your user name"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="error-message mb-0">{errors.username}</p>}
              </div>

              <div className="form-group d-flex flex-column gap-2 mt-3">
                <label className="label-text">Email Address*</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-message mb-0">{errors.email}</p>}
              </div>

              <div className="form-group formlabel-input d-flex flex-column gap-2 mt-3">
                <label className="label-text">Password*</label>
                <div className="position-relative form-input d-flex align-items-center">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="password-toggle-icon" onClick={handleTogglePassword}>
                    {showPassword ? <FaRegEye size={22} className="eye-icon" /> : <FaRegEyeSlash size={22} className="eye-icon" />}
                  </span>
                </div>
                {errors.password && <p className="error-message mb-0">{errors.password}</p>}
              </div>

              <button type="submit" className="primary-btn mt-4" disabled={loading}>
                Register Now {loading && <Spinner as="span" animation="border" size="sm" />}
              </button>

              <p className="or-desc">Or Continue With</p>
              <div className="text-center">
                <img src={Goggle} alt="google" />
              </div>

              <p className="go-signin mb-0">
                Already have an account?
                <Link to="/login" className="secondary-text"> &nbsp;Login</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;