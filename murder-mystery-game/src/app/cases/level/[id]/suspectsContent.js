"use client";

import { useState } from "react";
import axios from "axios";

// ChatWindow Component
const ChatWindow = ({ suspect, chatHistory, inputText, setInputText, handleSubmit, onClose }) => (
  <div style={styles.chatWindow}>
    <h3>Chat with {suspect.name}</h3>
    <div style={styles.chatMessages}>
      {chatHistory.map((message, index) => (
        <div key={index} style={message.role === 'user' ? styles.userMessage : styles.assistantMessage}>
          <strong>{message.role === 'user' ? 'You' : suspect.name}:</strong> {message.content}
        </div>
      ))}
    </div>
    <form onSubmit={handleSubmit} style={styles.chatForm}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={styles.chatInput}
        placeholder="Type a message..."
      />
      <button type="submit" style={styles.chatButton}>Send</button>
    </form>
    <button onClick={onClose} style={styles.closeChatButton}>Close Chat</button>
  </div>
);

// SuspectsContent Component
function SuspectsContent({ suspects }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null); // Track selected suspect
  const [inputText, setInputText] = useState(""); // Track user input
  const [chatHistory, setChatHistory] = useState([]); // Track chat history

  // Handle clicking on suspect to open chat
  const handleSuspectClick = (suspect) => {
    setSelectedSuspect(suspect);
    console.log(suspect);
  };

  // Handle closing chat
  const closeChat = () => {
    setSelectedSuspect(null);
  };

  // Handle form submission to send message
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the user's message to the chat history
    const newChatHistory = [...chatHistory, { role: "user", content: inputText }];
    setChatHistory(newChatHistory);

    try {
      const response = await axios.post('http://localhost:5000/api/response/generate-suspect-response', {
        userId: 'test',
        suspectName: selectedSuspect.name,
        text: inputText,
        prompt: selectedSuspect.prompt,
      });

      // Add assistant's response to the chat history
      const assistantResponse = response.data.response;
      setChatHistory([...newChatHistory, { role: "assistant", content: assistantResponse }]);
      setInputText(""); // Clear input after sending
    } catch (error) {
      console.error("Error generating suspect response:", error);
    }
  };

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

      {/* Render the chat window if a suspect is selected */}
      {selectedSuspect && (
        <ChatWindow
          suspect={selectedSuspect}
          chatHistory={chatHistory}
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
          onClose={closeChat}
        />
      )}
    </div>
  );
}

// Example styles
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
    bottom: "10px",
    right: "10px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    zIndex: 100,
  },
  chatMessages: {
    minHeight: "150px",
    marginBottom: "10px",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderRadius: "5px",
    overflowY: "auto",
    maxHeight: "200px",
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
    backgroundColor: "#dc3545",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SuspectsContent;
