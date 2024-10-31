/* 
This is the main file for the page and it includes the Suspects button that opens the suspectsModal
And it also contains DocumentsTable which is every report/document that is stored in th DB
*/

"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentTable";
import Draggable from "react-draggable";
import SuspectsButton from "./SuspectsButton";
import SuspectsArrestButton from "./SuspectsArrestButton";

const LevelPage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  if (!id || Array.isArray(id)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={pageStyle}>
      <SuspectsButton level={parseInt(id)}></SuspectsButton>
      <DocumentsTable
        level={parseInt(id)}
        showAllDocuments={showAllDocuments}
        setShowAllDocuments={setShowAllDocuments}
      />
      <SuspectsArrestButton level={parseInt(id)}></SuspectsArrestButton>
    </div>
  );
};

const pageStyle:React.CSSProperties = {
  backgroundImage: "url(/1.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative", // Ensure that positioned children are relative to this container
  width: "100vw",
  height: "100vh",
};

export default LevelPage;
