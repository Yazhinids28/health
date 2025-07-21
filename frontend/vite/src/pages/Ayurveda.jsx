import React, { useState } from "react";
import axios from "axios";
import "../styles/ayurdec.css";
import { useNavigate } from "react-router-dom";

const Ayurveda = () => {
  const [formData, setFormData] = useState({
    age: "",
    Height: "",
    Weight: "",
    "Water Intake": "",
    "Sleep Duration": "",
    Stress: "",
    diet_preference: "",
    symptom_severity: "",
    Gender: "",
    Symptoms: ""
  });

  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/predict", formData);
      navigate("/result-ayurveda", { state: { result: res.data } });
    } catch (err) {
      setError("Error fetching prediction. Please check your input.");
    }
  };

  const stressLevels = ["1", "2", "3", "4", "5"];
  const symptomSeverities = ["Mild", "Moderate", "Severe"];
  const dietPreferences = ["Vegan", "Vegetarian", "Non-Vegetarian", "Keto", "Pescatarian"];
  const genders = ["Male", "Female"];

  return (
    <div className={`ayurveda-container ${darkMode ? "dark" : ""}`}>
      <div className="form-card">
        <h2 className="form-title">
          <span>🌿</span> Ayurveda Health Predictor
        </h2>

        <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          {/* Row 1: Age, Height, Weight */}
          <div className="form-row">
            {["age", "Height", "Weight"].map((field) => (
              <div key={field} className="form-group">
                <label>{field} <span role="img" aria-label="field-icon">🎯</span></label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          {/* Row 2: Stress Level, Symptom Severity, Diet Preference */}
          <div className="form-row">
            <div className="form-group">
              <label>Stress Level <span role="img" aria-label="stress-icon">💥</span></label>
              <div className="radio-options">
                {stressLevels.map((level) => (
                  <label key={level} className="radio-item">
                    <input
                      type="radio"
                      name="Stress"
                      value={level}
                      checked={formData.Stress === level}
                      onChange={handleChange}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Symptom Severity <span role="img" aria-label="severity-icon">⚖️</span></label>
              <div className="radio-options">
                {symptomSeverities.map((severity) => (
                  <label key={severity} className="radio-item">
                    <input
                      type="radio"
                      name="symptom_severity"
                      value={severity}
                      checked={formData.symptom_severity === severity}
                      onChange={handleChange}
                    />
                    {severity}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Diet Preference <span role="img" aria-label="diet-icon">🥗</span></label>
              <div className="radio-options">
                {dietPreferences.map((diet) => (
                  <label key={diet} className="radio-item">
                    <input
                      type="radio"
                      name="diet_preference"
                      value={diet}
                      checked={formData.diet_preference === diet}
                      onChange={handleChange}
                    />
                    {diet}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Water Intake, Sleep Duration, Symptoms */}
          <div className="form-row">
            {["Water Intake", "Sleep Duration"].map((field) => (
              <div key={field} className="form-group">
                <label>{field} <span role="img" aria-label="water-icon">💧</span></label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="form-group">
              <label>Symptoms <span role="img" aria-label="symptoms-icon">🩺</span></label>
              <input
                type="text"
                name="Symptoms"
                value={formData.Symptoms}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 4: Gender and Predict Button */}
          <div className="form-row">
            <div className="form-group">
              <label>Gender <span role="img" aria-label="gender-icon">🚻</span></label>
              <div className="radio-options">
                {genders.map((gender) => (
                  <label key={gender} className="radio-item">
                    <input
                      type="radio"
                      name="Gender"
                      value={gender}
                      checked={formData.Gender === gender}
                      onChange={handleChange}
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
              <button type="submit" className="predict-btn">
                Predict
              </button>
            </div>
          </div>

          {error && <p className="error-message mt-4">{error}</p>}
        </form>

        {/* Live Preview Card */}
        <div className="live-preview">
          <h3>Live Preview</h3>
          <ul>
            <li><strong>Age:</strong> {formData.age}</li>
            <li><strong>Height:</strong> {formData.Height}</li>
            <li><strong>Weight:</strong> {formData.Weight}</li>
            <li><strong>Stress Level:</strong> {formData.Stress}</li>
            <li><strong>Symptom Severity:</strong> {formData.symptom_severity}</li>
            <li><strong>Diet Preference:</strong> {formData.diet_preference}</li>
            <li><strong>Symptoms:</strong> {formData.Symptoms}</li>
            <li><strong>Gender:</strong> {formData.Gender}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ayurveda;
