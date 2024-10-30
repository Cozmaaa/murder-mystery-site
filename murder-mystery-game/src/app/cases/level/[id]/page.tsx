/* 
This is the main file for the page and it includes the Suspects button that opens the suspectsModal
And it also contains DocumentsTable which is every report/document that is stored in th DB
*/


"use client";
import { useRouter, useParams } from "next/navigation";
import DocumentsTable from "./DocumentTable";
import Draggable from "react-draggable";
import SuspectsButton from "./SuspectsButton";
import SuspectsArrestButton from "./SuspectsArrestButton";

const LevelPage:React.FC = () => {
  const params = useParams();
  const { id } = params;

  if (!id||Array.isArray(id)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={pageStyle}>
      <SuspectsButton level={parseInt(id)}></SuspectsButton>
      <DocumentsTable level={parseInt(id)} />
      <SuspectsArrestButton level={parseInt(id)}></SuspectsArrestButton>
    </div>
  );
};

const pageStyle= {
  backgroundImage: "url(/1.webp)",
  backgroundSize:"cover",
  backgroundPosition:"center",
}

export default LevelPage;
