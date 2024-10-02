"use client";

import SuspectsContent from "./suspectsContent";
import { useState } from "react";

const SuspectsModal = ({ onClose, suspects }) => {
  return (
    <div
      className="modal-suspects-overlay"
      onClick={onClose}
      style={modalOverlayStyles}
    >
      <div
        className="modal-suspects-content"
        onClick={(e) => e.stopPropagation()}
        style={modalContentStyles}
      >
        <SuspectsContent suspects={suspects}></SuspectsContent>
      </div>
    </div>
  );
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
  zIndex: 10, // Ensures modal is above other content
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
  position: "relative", // Ensure close button positions correctly
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default SuspectsModal;
