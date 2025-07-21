import React from 'react';
import '../styles/Lifestyle.css';

const Lifestyle = () => {
  return (
    <section className="lifestyle fade-in">
      <h2 className="page-title slide-down">We Grow</h2>

      {/* Website Overview */}
      <div className="section-card zoom-in delay-0">
        <h3>About the Website</h3>
        <p>
          Welcome to <strong>ASH</strong> — an integrated system that blends <strong>Ayurveda, Siddha, and Homeopathy</strong> 
          to provide personalized wellness guidance. Our platform uses AI-powered insights and traditional knowledge 
          to recommend holistic health solutions tailored to your unique needs.
        </p>
      </div>

      {/* Lifestyle Benefits */}
      <h2 className="page-title slide-down">Special Editions</h2>
      <div className="section-card glow-card zoom-in delay-1">
        <h3>Why Healthy Living Matters</h3>
        <p><span className="check">✔</span> Improved physical health and immunity</p>
        <p><span className="check">✔</span> Better mental clarity and emotional balance</p>
        <p><span className="check">✔</span> Supports holistic well-being through ASH (Ayurveda, Siddha, Homeopathy)</p>
        <p><span className="check">✔</span> Personalized Diet & Lifestyle plans</p>
        <p><span className="check">✔</span> Herbal remedies tailored to your body type</p>
      </div>

      {/* Floating emojis and yoga themed icons */}
      <div className="floating-icon one">🍃</div>
      <div className="floating-icon two">💧</div>
      <div className="floating-icon three">🧘‍♀️</div>
      <div className="floating-icon four">🌞</div>
      
      {/* Diet Plan Feature */}
      <div className="section-card border-gradient zoom-in delay-2">
        <h3>Personalized Diet Plans</h3>
        <p>
          We offer diet plans that align with your predicted health condition. These plans are curated by 
          combining traditional dietary principles and your lifestyle habits for maximum benefit.
        </p>
      </div>

      {/* Herbal Remedies Feature */}
      <div className="section-card border-gradient zoom-in delay-3">
        <h3>Herbal Remedies (ASH)</h3>
        <p>
          Based on your symptoms and inputs, the system suggests <strong>herbal formulations</strong> rooted in Ayurveda, 
          Siddha, and Homeopathy to address imbalances, boost immunity, and improve healing — all backed by classical texts.
        </p>
      </div>

      {/* Lifestyle Recommendation Feature */}
      <div className="section-card glow-card zoom-in delay-4">
        <h3>Lifestyle Recommendations</h3>
        <p>
          From sleep routines to stress management and daily habits, our AI-based suggestions help you adopt 
          a lifestyle that supports your wellness goals and healing journey.
        </p>
      </div>
    </section>
  );
};

export default Lifestyle;
