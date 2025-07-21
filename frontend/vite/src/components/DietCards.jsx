import React, { useState } from "react";
import "../styles/dietCards.css"; // Ensure this CSS file exists

import bgImage from "../assets/back.png"; // Import background image

const dietPlans = [
  {
    title: "Ayurveda",
    description: "A holistic approach to diet with natural herbs and balanced meals.",
    moreInfo: "Ayurveda focuses on balancing bodily systems using diet, herbal treatment, and yogic breathing.",
    image: "https://static.vecteezy.com/system/resources/previews/035/978/179/non_2x/ai-generated-indian-ayurveda-herbal-medicine-free-photo.jpg",
  },
  {
    title: "Siddha",
    description: "Ancient Tamil medicine-based diet for longevity and well-being.",
    moreInfo: "Siddha medicine emphasizes herbal remedies, detoxification, and yogic practices for optimal health.",
    image: "https://media.istockphoto.com/id/855014602/photo/turmeric-powder-turmeric-in-mortar-grinder-drugs-and-ingredient-herbs-on-wooden-background.jpg?s=612x612&w=0&k=20&c=LOJOCwVBgl96mq7bx6FoCIN3WHO4N1QoBgYWX-7ZlFE=",
  },
  {
    title: "Homeopathy",
    description: "Gentle and natural dietary principles aligned with homeopathic remedies.",
    moreInfo: "Homeopathy uses highly diluted substances to stimulate the body's natural healing process.",
    image: "https://t4.ftcdn.net/jpg/01/98/32/81/360_F_198328178_kDJbPcp0gXgT2vdvQZeLTyLXuxF2Jitt.jpg",
  },
];

const DietCards = () => {
  // State to track which card is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    // If the same card is clicked again, collapse it
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="diet-heading">Our Special Plans</h1>

      {/* Parallax Background Section */}
      <div
        className="diet-cards-section"
        style={{
          background: `url(${bgImage}) no-repeat center center/cover`,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
          backgroundAttachment: "fixed",
          padding: "50px 20px",
        }}
      >
	
        <div className="diet-cards-container">
          {dietPlans.map((diet, index) => (
            <div className="diet-card" key={index}>
              <img src={diet.image} alt={diet.title} className="diet-image" />
              <div className="diet-content">
                <h3>{diet.title}</h3>
                <p>{diet.description}</p>

                {/* Show additional content if expanded */}
                {expandedIndex === index && <p className="more-info">{diet.moreInfo}</p>}

                {/* Toggle button */}
                <button className="explore-btn" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietCards;
