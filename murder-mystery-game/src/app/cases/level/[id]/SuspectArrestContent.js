

'use client';

import { useState,useEffect } from "react";

const SuspectArrestContent = ({suspects})=>{
    const [gameState, setGameState] = useState(null);
    const handleSuspectClick= (suspect)=>{
        console.log("MIAU");
        if(suspect.isGuilty){
            setGameState('won');
        }
        else{
            setGameState('lose');
        }
    }

    if (gameState === "lose") {
        return (
          <div style={styles.fullScreenMessage}>
            <h1>YOU LOSE</h1>
          </div>
        );
      }

      if (gameState === "won") {
        return (
          <div style={styles.fullScreenMessage}>
            <h1>YOU WON!</h1>
          </div>
        );
      }

    return (
        <div style={styles.suspectsContainer}>
          <h2>Suspects</h2>
          <ul style={styles.suspectsList}>
            {suspects.map((suspect) => (
              <li
                key={suspect.name}
                style={styles.suspectsListItem}
                onClick={() => handleSuspectClick(suspect)} // Handle click on suspect
              >
                <h3>{suspect.name}</h3>
                <img
                  src={suspect.imageUrl}
                  alt={suspect.name}
                  style={styles.suspectsListImg}
                />
              </li>
            ))}
          </ul>
        </div>
      );
}

const styles = {
    suspectsContainer: {
      padding: "20px",
    },
    suspectsList: {
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      padding: "0",
      margin: "0",
      justifyContent: "center",
    },
    suspectsListItem: {
      flex: "1 1 100px",
      textAlign: "center",
      cursor: "pointer",
    },
    suspectsListImg: {
      maxWidth: "200px",
      height: "auto",
      borderRadius: "8px",
    },
    chatWindow: {
      position: "fixed",
      justifyContent: "center",
      alignItems: "center",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "8px",
      width: "55%", // Adjust width as needed
      height: "55%", // Adjust height as needed
      display: "flex",
      flexDirection: "column",
      zIndex: 100,
    },
  
    chatMessages: {
      minHeight: "20%",
      marginBottom: "10px",
      backgroundColor: "#f1f1f1",
      padding: "10px",
      borderRadius: "5px",
      overflowY: "auto",
      maxHeight: "200px",
      width: "60%",
    },
    userMessage: {
      backgroundColor: "#d1e7dd",
      padding: "5px 10px",
      borderRadius: "5px",
      marginBottom: "5px",
    },
    assistantMessage: {
      backgroundColor: "#f8d7da",
      padding: "5px 10px",
      borderRadius: "5px",
      marginBottom: "5px",
    },
    chatForm: {
      display: "flex",
      justifyContent: "space-between",
    },
    chatInput: {
      flex: 1,
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginRight: "10px",
    },
    chatButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    closeChatButton: {
      marginTop: "10px",
      width: "10%",
      backgroundColor: "#dc3545",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    fullScreenMessage: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", // Black background for dramatic effect
        color: "#fff", // White text for contrast
        fontSize: "48px",
        fontWeight: "bold",
        zIndex: 100, // Make sure it's on top of everything else
      },
  };

  export default SuspectArrestContent;