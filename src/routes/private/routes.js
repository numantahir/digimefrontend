import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const Component = props.component;
  const route = props.route;
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const login = localStorage?.getItem("isLoggedIn");
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("usertoken", token);
      localStorage.setItem("isLoggedIn", true);
    }
    if (login || token) {
      React.startTransition(() => {
        setAuthenticated(true);
      });
    } else {
      React.startTransition(() => {
        if (
          window.location.pathname !== "/signup" &&
          window.location.pathname !== "/reset-password" &&
          window.location.pathname !== "/send-email" &&
          window.location.pathname !== "/:token/verify-email" &&
          window.location.pathname !== "/:token/update-password"
        ) {
          setAuthenticated(false);
          navigate("/");
        }
      });
    }
  }, [navigate]);

  return authenticated ? <Component route={route} /> : null;
}
