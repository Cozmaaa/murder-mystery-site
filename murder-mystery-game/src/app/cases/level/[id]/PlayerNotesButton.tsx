// PlayerNotesButton.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerNotes from "./PlayerNotes";

interface PlayerNotesButtonProps {
  caseLevel: number;
}

const PlayerNotesButton: React.FC<PlayerNotesButtonProps> = ({ caseLevel }) => {
  const [isNotesOpened, setIsNotesOpened] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPlayerNoteContent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/userNote/getUserNote",
          { caseLevel },
          { withCredentials: true }
        );
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching player note content:", error);
      }
    };
    fetchPlayerNoteContent();
  }, [caseLevel]);



  const handleOpenModal = () => {
    setIsNotesOpened(true);
  };



  const handleCloseModal = async () => {
    // Save the content when the modal closes
    try {
      await axios.post(
        "http://localhost:5000/api/userNote/editUserNote",
        {
          caseLevel,
          content,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error editing player note:", error);
    }
    setIsNotesOpened(false);
  };



  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };


  const handleOnMouseOver=()=>{
    console.log('Mouse over');
  }


  return (
    <div>
      {/* White square button in the bottom-right corner */}
      <div
        onClick={handleOpenModal}
        style={{
          position: "fixed",
          bottom: "-5px",
          right: "-5px",
          width: "100px",
          height: "100px",
          backgroundColor: "white",
          cursor: "pointer",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "lighter",
          zIndex: 1000, // Ensure the button stays above other elements
          transition: "transform 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
      </div>

      {/* Modal */}
      {isNotesOpened && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999, // Place the modal below the button
          }}
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width:'40vw',
              height:'50vh',
              maxWidth: "80vw",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <PlayerNotes
              caseLevel={caseLevel}
              content={content}
              onContentChange={handleContentChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerNotesButton;
