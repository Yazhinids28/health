import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../styles/ResultHom.css";

const ResultHom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resultRef = useRef();
  const result = state?.result;

  const weekDays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleDownload = () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    element.classList.add("pdf-mode"); // optional: add pdf-specific styling

    const options = {
      margin: 0.5,
      filename: "Homeopathy_Result.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save().then(() => {
      element.classList.remove("pdf-mode");
    });
  };

  if (!result) {
    return (
      <div className="result-container">
        <h2>No result available. Please try again.</h2>
        <button onClick={() => navigate("/homoeopathy")} className="btn">
          🔙 Back to Homeopathy
        </button>
      </div>
    );
  }

  return (
    <div className="result-container" ref={resultRef}>
      <div id="pdf-content">
        <h2>🔍 Homeopathy Result</h2>

        <div className="info-cards">
          <div className="info-card condition">
            <h4>🩺 Predicted Condition</h4>
            <p>{result.predicted_condition}</p>
          </div>

          <div className="info-card remedy">
            <h4>🌱 Herbal Remedy</h4>
            <p>{result.herbal}</p>
          </div>

          <div className="info-card lifestyle">
            <h4>💡 Lifestyle Advice</h4>
            {Array.isArray(result.lifestyle) ? (
              <ul>
                {result.lifestyle.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{result.lifestyle}</p>
            )}
          </div>
        </div>

        <h3>📅 Weekly Meal Plan</h3>
        <table className="meal-plan-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Meal</th>
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: (result.weekly_meal[day] || "Not available")
                      .replace(/Morning/g, "<strong>Morning</strong>")
                      .replace(/Afternoon/g, "<br/><strong>Afternoon</strong>")
                      .replace(/Evening/g, "<br/><strong>Evening</strong>")
                      .replace(/Night/g, "<br/><strong>Night</strong>")
                  }}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button onClick={() => navigate("/homeopathy")} className="btn">
          🔄 Try Again
        </button>
        <button onClick={handleDownload} className="btn download-btn">
          📄 Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResultHom;
