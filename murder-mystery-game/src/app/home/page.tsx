"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CaseProps {
  name: string;
  imageName: string;
  level: number;
  description: string;
  imageUrl:string;
}

const MainMenu: React.FC = () => {
  const router = useRouter();
  const [cases, setCases] = useState<CaseProps[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/case/');
        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };
    fetchCases();
  }, []);

  return (
    <div style={mainMenuStyle}>
      <div style={contentStyle}>
        <div style={casesContainerStyle}>
          {cases.map((caseItem, index) => (
            <Link key={index} href={`/cases/level/${caseItem.level}`} passHref>
              <div style={caseStyle}>
                <div style={paperStyle}>
                  <img
                    src={caseItem.imageUrl}
                    alt={caseItem.name}
                    style={imageStyle}
                  />
                  <p style={nameStyle}>{caseItem.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

let mainMenuStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundImage: "url(/MainMenuBackground.webp)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundColor: "black",
  width: "100vw",
  height: "100vh",
  position: "relative",
};

let contentStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  position: "absolute",
  top: "250px", // Adjust this value to move up/down
  left: "800px", // Adjust this value to move left/right
};

let casesContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "20px",
};

let caseStyle: React.CSSProperties = {
  width: "150px",
  cursor: "pointer",
};

let paperStyle: React.CSSProperties = {
  backgroundImage: "url(/paper-texture.jpg)", // Replace with your paper texture image path
  backgroundSize: "cover",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

let imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "5px",
};

let nameStyle: React.CSSProperties = {
  marginTop: "10px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#333",
};

export default MainMenu;
