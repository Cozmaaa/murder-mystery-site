/*
This file contain the ChatWindow component that represents the chat window where the user can talk to the suspect
And it also contains the clicking on a suspect's image and opening the chat 
Also it does the logic for the user 
 */

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface ChatWindowProps {
    suspect: { name: string };
    chatHistory: any[];
    inputText: string;
    setInputText: (text: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

// ChatWindow Component
const ChatWindow: React.FC<ChatWindowProps> = ({
    suspect,
    chatHistory,
    inputText,
    setInputText,
    handleSubmit,
    onClose,
}) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-2/3 max-w-lg h-3/4 flex flex-col">
                <h3 className="text-xl font-bold mb-4">Chat with {suspect.name}</h3>
                <div className="flex-1 mb-4 overflow-y-auto bg-gray-700 p-4 rounded">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-3 rounded-lg ${message.role === "user"
                                ? "bg-green-700 self-end text-right"
                                : "bg-red-700 self-start text-left"
                                }`}
                        >
                            <strong>{message.role === "user" ? "You" : suspect.name}:</strong>{" "}
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 p-2 rounded-l-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none self-end"
                >
                    Close Chat
                </button>
            </div>
        </div>
    );
};

interface Suspect {
    name: string;
    prompt: string;
    imageUrl: string;
}

interface SuspectsContentProps {
    suspects: Suspect[];
    suspectChatHistories: Record<string, any[]>;
    setSuspectChatHistories: React.Dispatch<
        React.SetStateAction<Record<string, any[]>>
    >;
}

// SuspectsContent Component
const SuspectsContent: React.FC<SuspectsContentProps> = ({
    suspects,
    suspectChatHistories,
    setSuspectChatHistories,
}) => {
    const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
    const [inputText, setInputText] = useState<string>("");

    const handleSuspectClick = (suspect: Suspect) => {
        setSelectedSuspect(suspect);
    };

    const closeChat = () => {
        setSelectedSuspect(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSuspect) return;
        const currentHistory = suspectChatHistories[selectedSuspect.name] || [];

        const newMessage = { role: "user", content: inputText };
        const updatedHistory = [...currentHistory, newMessage];

        setSuspectChatHistories((prev) => ({
            ...prev,
            [selectedSuspect.name]: updatedHistory,
        }));

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/response/generate-suspect-response`,
                {
                    userId: "test",
                    suspectName: selectedSuspect.name,
                    text: inputText,
                    prompt: selectedSuspect.prompt,
                }
            );

            const assistantResponse = {
                role: "assistant",
                content: response.data.response,
            };

            setSuspectChatHistories((prev) => ({
                ...prev,
                [selectedSuspect.name]: [
                    ...prev[selectedSuspect.name],
                    assistantResponse,
                ],
            }));

            setInputText("");
        } catch (error) {
            console.error("Error generating suspect response:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
                Suspects
            </h2>
            <ul className="flex flex-wrap justify-center gap-6">
                {suspects.map((suspect) => (
                    <li
                        key={suspect.name}
                        className="text-center cursor-pointer transform hover:scale-105 transition duration-300"
                        onClick={() => handleSuspectClick(suspect)}
                    >
                        <h3 className="text-lg font-semibold mb-2 text-white">
                            {suspect.name}
                        </h3>
                        <img
                            src={suspect.imageUrl}
                            alt={suspect.name}
                            className="w-52 h-auto rounded-lg shadow-lg"
                        />
                    </li>
                ))}
            </ul>

            {selectedSuspect && (
                <ChatWindow
                    suspect={selectedSuspect}
                    chatHistory={suspectChatHistories[selectedSuspect.name] || []}
                    inputText={inputText}
                    setInputText={setInputText}
                    handleSubmit={handleSubmit}
                    onClose={closeChat}
                />
            )}
        </div>
    );
};

export default SuspectsContent;
