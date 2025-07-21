import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./components/HomePage";
import Remedies from "./pages/Remedies";
import Ayurveda from "./pages/Ayurveda";
import Siddha from "./pages/Siddha";
import Homeopathy from "./pages/Homeopathy";
import ResultSid from "./pages/ResultSid";
import ResultAyur from "./pages/ResultAyur";
import ResultHom from "./pages/ResultHom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="remedies" element={<Remedies />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="ayurveda" element={<Ayurveda />} />
        <Route path="siddha" element={<Siddha />} />
        <Route path="homeopathy" element={<Homeopathy />} />
        <Route path="result-sid" element={<ResultSid />} />
        <Route path="result-ayurveda" element={<ResultAyur />} />
        <Route path="result-hom" element={<ResultHom />} />
      </Route>
    </Routes>
  );
}

export default App;
