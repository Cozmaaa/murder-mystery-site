"use client";

import { useState } from "react";



function SuspectsContent({ suspects }) {
  return (
    <div style={styles.suspectsContainer}>
      <h2>Suspects</h2>
      <ul style={styles.suspectsList}>
        {suspects.map((suspect) => (
          <li key={suspect.name} style={styles.suspectsListItem}>
            <h3>{suspect.name}</h3>
            <img src={suspect.imageUrl} alt={suspect.name} style={styles.suspectsListImg} />
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
      justifyContent:"center",
    },
    suspectsListItem: {
      flex: "1 1 100px", 
      textAlign: "center",
    },
    suspectsListImg: {
      maxWidth: "200px",
      height: "auto",
      borderRadius: "8px", 
    },
  };

export default SuspectsContent;