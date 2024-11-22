// LevelPage.tsx
"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentTable";
import SuspectsButton from "./SuspectsButton";
import SuspectsArrestButton from "./SuspectsArrestButton";
import PlayerNotesButton from "./PlayerNotesButton";
import HintsButton from "./hintButton";

const LevelPage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  if (!id || Array.isArray(id)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={pageStyle}>
      <PlayerNotesButton caseLevel={parseInt(id)} />
      <SuspectsButton level={parseInt(id)} />
      <DocumentsTable
        level={parseInt(id)}
        showAllDocuments={showAllDocuments}
        setShowAllDocuments={setShowAllDocuments}
      />
      <HintsButton level={parseInt(id)}></HintsButton>
      <SuspectsArrestButton level={parseInt(id)} />
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  backgroundImage: "url(/1.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  width: "100vw",
  height: "100vh",
};

export default LevelPage;
