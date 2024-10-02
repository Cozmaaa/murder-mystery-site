"use client";
import { useRouter, useParams } from "next/navigation";
import DocumentsTable from "./DocumentTable";
import Draggable from "react-draggable";
import SuspectsButton from "./SuspectsButton";

const LevelPage = () => {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div style={pageStyle}>
      <SuspectsButton level={parseInt(id)}></SuspectsButton>
      <DocumentsTable level={parseInt(id)} />
    </div>
  );
};

const pageStyle= {
  backgroundImage: "url('/background.jpg')",
  backgroundSize:"cover",
  backgroundPosition:"center",
}

export default LevelPage;
