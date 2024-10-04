/* 
This is the main file for the page and it includes the Suspects button that opens the suspectsModal
And it also contains DocumentsTable which is every report/document that is stored in th DB
*/


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
