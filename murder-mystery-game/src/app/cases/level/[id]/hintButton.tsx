"use client";
//TODO: FIX THIS THING NOT FETCHIGN RIGHT
import { useEffect, useState } from "react";
import axios from "axios";
interface HintsButtonProps {
  level: number;
}

const HintsButton: React.FC<HintsButtonProps> = ({ level }) => {
  const [hints, setHints] = useState<string[]>([]);

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

  return (
    <div>
      <h2>Hints for level {level}</h2>
      <ul>
        {hints.map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>
    </div>
  );
};
export default HintsButton;
