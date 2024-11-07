"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CaseProps {
  name: string;
  imageName: string;
  level: number;
  description: string;
  imageUrl: string;
}

const MainMenu: React.FC = () => {
  const router = useRouter();
  const [cases, setCases] = useState<CaseProps[]>([]);
  const [accesibleCases, setAccesibleCases] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/case/", {
          credentials: "include",
        });
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setCases(data);

        const responseAccesibleCases = await fetch(
          "http://localhost:5000/api/user/getAccesibleCases",
          {
            credentials: "include",
          }
        );
        const dataAccesibleCases = await responseAccesibleCases.json();
        setAccesibleCases(dataAccesibleCases);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div style={mainMenuStyle}>
      <div style={contentStyle}>
        <div style={casesContainerStyle}>
          {cases.map((caseItem, index) => {
            const isAccessible = accesibleCases.includes(caseItem.level);

            const containerStyle: React.CSSProperties = {
              ...caseStyle,
              boxShadow:
                hoveredIndex === index ? "0 0 30px 7px #48abe0" : "none",
              cursor: "pointer",
              position: "relative",
            };

            const handleMouseOver = () => {
              setHoveredIndex(index);
            };

            const handleMouseOut = () => {
              setHoveredIndex(null);
            };

            const caseContent = (
              <div
                style={containerStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                {/* Apply filter to this inner wrapper */}
                <div
                  style={{
                    position: "relative",
                    ...(isAccessible ? {} : { filter: "brightness(50%)" }),
                  }}
                >
                  <div style={paperStyle}>
                    <img
                      src={caseItem.imageUrl}
                      alt={caseItem.name}
                      style={imageStyle}
                    />
                    <p style={nameStyle}>{caseItem.name}</p>
                  </div>
                  {!isAccessible && (
                    <div style={lockOverlayStyle}>
                      <img
                        src="/lock-icon.png"
                        alt="Locked"
                        style={lockIconStyle}
                      />
                    </div>
                  )}
                </div>
                {hoveredIndex === index && (
                  <div style={descriptionStyle}>
                    <p>{caseItem.description}</p>
                  </div>
                )}
              </div>
            );

            return (
              <div key={index}>
                <Link
                  href={
                    isAccessible
                      ? `/cases/level/${caseItem.level}`
                      : `/buy/cases/level/${caseItem.level}`
                  }
                  passHref
                >
                  {caseContent}
                </Link>
              </div>
            );
          })}
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
  top: "250px",
  left: "800px",
};

let casesContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "20px",
};

let caseStyle: React.CSSProperties = {
  width: "150px",
  position: "relative",
  marginBottom: "50px",
};

let paperStyle: React.CSSProperties = {
  backgroundImage: "url(/paper-texture.jpg)",
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

let descriptionStyle: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "rgba(0,0,0,0.7)", // Make background slightly darker for readability
  width: "150px",
  borderRadius: "5px",
  top: "100%",
  left: "0",
  transform: "translateY(10px)",
  padding: "10px",
  boxSizing: "border-box",
  color: "white",
  zIndex: 1, // Ensure it appears above other elements
};

let lockOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

let lockIconStyle: React.CSSProperties = {
  width: "100px",
  height: "80px",
  opacity: 1,
};

export default MainMenu;
