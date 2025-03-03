import React from "react";
import MainRoute from "./routes";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <MainRoute />
    </>
  );
}

export default App;
