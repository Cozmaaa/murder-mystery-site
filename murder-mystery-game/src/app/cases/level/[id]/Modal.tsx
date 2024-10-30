/*
This file is the modal of the PDF viewer of the documents
It also contains zoom in and zoom out features for the pdf 
*/

"use client";

import PDFViewer from "./PDFViwer";
import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  fileUrl: string;
  children:React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, fileUrl }) => {
  const [scale, setScale] = useState(1.3);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onZoomIn = (e: React.FormEvent) => {
    e.stopPropagation();
    setScale((prevScale) => prevScale + 0.1);
  };

  const onZoomOut = (e: React.FormEvent) => {
    e.stopPropagation();
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={modalOverlayStyles}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={modalContentStyles}
      >
        <button onClick={onClose} style={closeButtonStyles}>
          Close
        </button>

        <PDFViewer fileUrl={fileUrl} scale={scale} />
      </div>

      {/* Zoom controls fixed to the left of the screen */}
      <div style={zoomControlsContainerStyles}>
        <button
          onClick={onZoomIn}
          style={{
            ...zoomButtonStyles,
            backgroundColor: isHovered ? "#0056b3" : "#fff",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          +
        </button>
        <button
          onClick={onZoomOut}
          style={{
            ...zoomButtonStyles,
            backgroundColor: isHovered ? "#0056b3" : "#fff",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          -
        </button>
      </div>
    </div>
  );
};

// Styles for modal and buttons
const modalOverlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10, // Ensures modal is above other content
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
  position: "relative", // Ensure close button positions correctly
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#f00",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  zIndex: 100,
};

const zoomControlsContainerStyles: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "20px", // Fixed to the left side of the screen
  transform: "translateY(-50%)", // Vertically centered
  display: "flex",
  flexDirection: "column", // Buttons in a vertical column
  gap: "10px",
  zIndex: 100, // Make sure buttons are above other elements
};

const zoomButtonStyles: React.CSSProperties = {
  width: "40px",
  height: "40px",
  background: "#fff",
  border: "2px solid #005bac",
  borderRadius: "50%",
  color: "#005bac",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  zIndex: 100, // Ensure buttons are above modal
};

export default Modal;
