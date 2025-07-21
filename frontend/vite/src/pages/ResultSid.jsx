import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/ResultSid.css";

const ResultSidda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const resultRef = useRef(null);

  const weekDays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const downloadAsPDF = () => {
    const input = resultRef.current;
    if (!input) return;
    input.classList.add("pdf-mode");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add extra pages if needed
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("siddha_result.pdf");
      input.classList.remove("pdf-mode");
    });
  };

  if (!result) {
    return (
      <div className="result-container">
        <h2>No result available. Please submit the form first.</h2>
        <button onClick={() => navigate("/sidda")} className="btn">
          Back to Siddha
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div ref={resultRef} id="pdf-content">
        <h2>🧘 Siddha Result</h2>

        <div className="info-cards">
          <div className="info-card condition">
            <h4>🏥 Predicted Condition</h4>
            <p>{result.predicted_condition}</p>
          </div>

          <div className="info-card remedy">
            <h4>🌿 Herbal Remedy</h4>
            <p>{result.herbal}</p>
          </div>

          <div className="info-card lifestyle">
            <h4>💡 Lifestyle Advice</h4>
            {/* Handle bullet points if lifestyle advice is in list form */}
            {Array.isArray(result.lifestyle) ? (
              <ul>
                {result.lifestyle.map((advice, idx) => (
                  <li key={idx}>{advice}</li>
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
                      .replace(/Morning/g, '<strong>Morning</strong>')
                      .replace(/Afternoon/g, '<br/><strong>Afternoon</strong>')
                      .replace(/Evening/g, '<br/><strong>Evening</strong>')
                      .replace(/Night/g, '<br/><strong>Night</strong>')
                  }}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-row">
        <button onClick={() => navigate("/sidda")} className="btn">
          🔄 Try Again
        </button>
        <button onClick={downloadAsPDF} className="btn download">
          📄 Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResultSidda;
