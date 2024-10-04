/*
This is the file where the fetching of suspects is being done and then passed 
for the modal to be rendered for the user
 */

"use client";
import { useEffect, useState } from "react";
import SuspectsModal from "./SuspectsModal"; // Import the modal

const SuspectsButton = ({ level }) => {
  const [suspects, setSuspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suspectChatHistories, setSuspectChatHistories] = useState({});

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
    console.log(suspects);
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
          Open suspect list
        </button>
      </div>

      {isModalOpen && (
        <div>
          <SuspectsModal
            suspects={suspects}
            onClose={closeModal}
            suspectChatHistories={suspectChatHistories}
            setSuspectChatHistories={setSuspectChatHistories}
          />
        </div>
      )}
    </>
  );
};

const suspectsButtonStyles = {
  position: "fixed",
  bottom: "20px", // Button at the bottom
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

const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
};

export default SuspectsButton;
