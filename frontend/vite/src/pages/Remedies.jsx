import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/diet.png"; // background image
import "./../styles/remedies.css";
import ayurvedaImg from "./../assets/Ayur.jpg";
import siddhaImg from "./../assets/Sid.jpg";
import homeopathyImg from "./../assets/Hom.jpg";

const Remedies = () => {
  const navigate = useNavigate();

  return (
    <section
      className="remedies"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="overlay">
        <h1>Special Diet Plans</h1>
        <p>Explore Ayurveda, Siddha, and Homeopathy.</p>

        <div className="remedy-list">
          {/* Ayurveda */}
          <div className="remedy-item">
            <img src={ayurvedaImg} alt="Ayurveda" />
            <h2>Ayurveda</h2>
            <p>Ancient Indian natural healing methods.</p>
            <button onClick={() => navigate("/ayurveda")}>Explore</button>
          </div>

          {/* Siddha */}
          <div className="remedy-item">
            <img src={siddhaImg} alt="Siddha" />
            <h2>Siddha</h2>
            <p>Traditional Tamil medicinal system.</p>
            <button onClick={() => navigate("/siddha")}>Explore</button>
          </div>

          {/* Homeopathy */}
          <div className="remedy-item">
            <img src={homeopathyImg} alt="Homeopathy" />
            <h2>Homeopathy</h2>
            <p>Alternative medicine using natural substances.</p>
            <button onClick={() => navigate("/homeopathy")}>Explore</button>
          </div>
        </div>

        <button className="btn-back" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Remedies;
