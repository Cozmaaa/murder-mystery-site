"use client";

import SuspectsContent from "./suspectsContent";
import SuspectArrestContent from "./SuspectArrestContent";
import { useState } from "react";

interface SuspectsModalProps {
  suspects: any[];
  onClose: () => void;
  currentContent: string;
  suspectChatHistories?: any;
  setSuspectChatHistories?: any;
}

const SuspectsModal:React.FC<SuspectsModalProps> = ({ onClose, suspects,suspectChatHistories,setSuspectChatHistories,currentContent }) => {

  const renderModal = ()=>{
    switch(currentContent){
      case "chatting":
        return(<SuspectsContent suspects={suspects} suspectChatHistories={suspectChatHistories} setSuspectChatHistories={setSuspectChatHistories}></SuspectsContent>);
      case 'arrest':
        return(<SuspectArrestContent suspects={suspects}></SuspectArrestContent>);
    }
  }

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
        {renderModal()}
      </div>
    </div>
  );
};

const modalOverlayStyles:React.CSSProperties = {
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

const modalContentStyles:React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
  position: "relative", // Ensure close button positions correctly
};

const closeButtonStyle:React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default SuspectsModal;
