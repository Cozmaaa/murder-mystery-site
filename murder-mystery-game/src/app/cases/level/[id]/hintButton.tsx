"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface HintsButtonProps {
    level: number;
}

const HintsButton: React.FC<HintsButtonProps> = ({ level }) => {
    const [hints, setHints] = useState<string[]>([]);
    const [seconds, setSeconds] = useState(10);
    const [numberOfHintsVisible, setNumberOfHintsVisible] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchHints = async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/case/getCase`,
                    {
                        level,
                    },
                    {
                        withCredentials: true,
                    }
                );
                setHints(response.data.hints || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHints();
    }, [level]);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Cleanup the interval on component unmount or when `seconds` changes
        return () => clearInterval(timer);
    }, [seconds]); // Run effect only when `seconds` changes


    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleShowHints = () => {
        setNumberOfHintsVisible((prev) => {
            if (prev < hints.length && seconds <= 0) {

                setSeconds(10);
                return prev + 1;
            }
            return prev;
        });
    };

    return (
        <div >
            {/* Button and Hints Modal in Bottom-Left */}
            <div className="fixed bottom-4 left-4 flex flex-col items-start space-y-2">
                {/* Open Hints Button */}
                <button
                    onClick={openModal}
                    className="bg-red-800 text-white px-4 py-2 rounded-lg border border-red-600 shadow-lg hover:bg-red-700 hover:shadow-red-500 transition duration-300">
                    Open Hints Menu
                </button>

                {/* Hints Modal */}
                {isModalOpen && (
                    <div className="bg-gray-800 w-80 p-4 rounded-lg shadow-xl border border-gray-600 text-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-red-500 tracking-wide uppercase">
                                Hints
                            </h2>
                            <p className="text-sm text-gray-400">{formatTime(seconds)}</p>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Press the button to reveal hints or check the list below.
                        </p>
                        <button
                            onClick={handleShowHints}
                            className="bg-red-700 text-white px-4 py-2 shadow-lg rounded-lg border border-red-600 hover:bg-red-600 hover:shadow-md transition duration-300 mb-4">
                            Reveal Hints
                        </button>
                        <ul className="list-disc pl-6 space-y-2">
                            {hints.slice(0, numberOfHintsVisible).map((hint, index) => (
                                <li key={index} className="text-gray-300">
                                    {hint}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={openModal}
                            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-600 hover:shadow-md transition duration-300">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HintsButton;
