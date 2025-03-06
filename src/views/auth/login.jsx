import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { login } from "../../services/api";
import { Goggle, logo } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { username: "", password: "" };

    // Email validation
    if (!formData.username.trim()) {
      newErrors.username = "Please enter your email address";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      handleLogin();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login({
        email: formData.username,
        password: formData.password,
      });

      // console.log("login response ", response.data.token);
      if (response) {
        localStorage.setItem("authToken", true);
        localStorage.setItem("usertoken", response.data.token);
        if (formData.rememberMe) {
          localStorage.setItem("isRemembered", true);
        }
        toast.success("Login Successful");
        navigate("/profile-view");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMe = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      rememberMe: checked,
    });
  };

  return (
    <Container fluid className="main-wrapper">
      <Row className="wrapper-row">
        <Col
          lg={6}
          md={12}
          sm={12}
          className="digital-banner d-flex align-items-start justify-content-center flex-column"
        >
          <Link to="/">
            <img src={logo} alt="logo" className="logo-default" />
          </Link>
          <h1 className="main-heading">
            Log in to access your <span>personalized</span> profile, connect with others. <span>Your network, your way!</span>
          </h1>
        </Col>
        <Col lg={6} md={12} sm={12} className="user-transformation d-flex align-items-center justify-content-center flex-column ">
          <div className="create-account">
            <h1 className="main-form mb-0 mt-1">Welcome back</h1>
            <Form className="mt-4 login-form" onSubmit={handleSubmit}>
              <div className="form-group d-flex flex-column gap-2">
                <label className="label-text">Email Address*</label>
                <input
                  className="form-input"
                  placeholder="Enter your email address"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="error-message secondary-text mb-0">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="form-group formlabel-input d-flex flex-column gap-2 mt-3">
                <label className="label-text">Password</label>
                <div className="position-relative form-input d-flex align-items-center">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="password-toggle-icon" onClick={handleTogglePassword}>
                    {showPassword ? <FaRegEye size={22} className="eye-icon" /> : <FaRegEyeSlash size={22} className="eye-icon" />}
                  </span>
                </div>
                {errors.password && (
                  <p className="error-message secondary-text mb-0">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4 formlabel-input">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-box"
                    onChange={handleRememberMe}
                  />
                  <p className="checkbox-desc mb-0 remember-text mb-0">
                    Remember me
                  </p>
                </div>
                <Link to="/resetpassword" className="checkbox-desc mb-0 check-hover">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="primary-btn d-flex justify-content-center align-items-center gap-2"
                disabled={loading}
              >
                Login
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : null}
              </button>

              <p className="or-desc">Or Login With</p>

              <div className="text-center">
                <img src={Goggle} alt="google" />
              </div>

              <p className="go-signin mb-0">
                Don’t have an account ?
                <Link to="/signup" className="secondary-text">
                  &nbsp;Signup
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
