"use client";

import { useEffect, useState } from "react";
import SuspectsModal from "./SuspectsModal";

const SuspectsArrestButton = ({ level }) => {
  const [suspects, setSuspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/suspects/${level}`
        );
        const data = await response.json();
        setSuspects(data);
      } catch (error) {
        console.error("Error fetching suspects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuspects();
  }, [level]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Button positioned at the bottom */}
      <div style={suspectsButtonStyles}>
        <button
          style={buttonStyles}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = buttonStyles.backgroundColor)
          }
          onClick={handleClick}
        >
          Arrest
        </button>
      </div>

      {isModalOpen && (
        <div>
          <SuspectsModal
            suspects={suspects}
            onClose={closeModal}
            currentContent={'arrest'}
          />
        </div>
      )}
    </>
  );
};

const suspectsButtonStyles = {
  position: "fixed",
  top: "20px", // Button at the bottom
  left: "50%",
  transform: "translateX(-50%)", // Center horizontally
  zIndex: 9,
};

const buttonStyles = {
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "18px",
  padding: "15px 30px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const buttonHoverStyles = {
    backgroundColor: "#0056b3",
  };
export default SuspectsArrestButton;
