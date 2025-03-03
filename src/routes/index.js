import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./public";
import ScrollToTop from "../components/ScrollToTop";

export default function MainRoute() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {PublicRoutes?.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </Router>
  );
}
