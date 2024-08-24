"use client";
import { useEffect, useState } from "react";
import getWords from "@/lib/LetterArray"; // Import the function instead
import "@/components/cursorBlink.css";

export default function Home() {
  const [letterArray, setLetterArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedArray, setTypedArray] = useState<string[]>([]); // Track the typed letters
  const [mistakes, setMistakes] = useState<number>(0); // Track the number of mistakes

  useEffect(() => {
    async function fetchWords() {
      const words = await getWords();
      setLetterArray(words); // Update state with fetched words
    }

    fetchWords();
  }, []);

  function handleKeyPresses(e: any) {
    const charTyped = e.key;

    // Handle Backspace
    if (charTyped === "Backspace") {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setTypedArray(typedArray.slice(0, -1));
      }
      return;
    }

    
    if (charTyped.length === 1) {
      const updatedTypedArray = [...typedArray, charTyped];

      
      if (charTyped === letterArray[currentIndex]) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setMistakes(mistakes + 1);
      }

      setTypedArray(updatedTypedArray);
    }
  }

  
  const calculateWPM = () => {
    const wordsTyped = typedArray.length / 5;
    const minutesElapsed = 1; // For example, change this to the actual elapsed time
    return (wordsTyped / minutesElapsed).toFixed(2);
  };

  const calculateAccuracy = () => {
    const correctChars = currentIndex;
    const totalTyped = typedArray.length;
    return ((correctChars / totalTyped) * 100).toFixed(2);
  };

  return (
    <div className="w-screen h-screen bg-[#323437]">
      <div className="pl-3 pr-3 items-center text-gray-400 space-x-3 flex w-[60%] bg-[#2C2E31] rounded-lg h-10 mt-6 ml-[20%] justify-between cursor-pointer">
        <p className="text-yellow-400 hover:text-slate-100 hover:scale-110">@ punctuation</p>
        <p className="hover:text-slate-100 hover:scale-110"># numbers</p>
        <div className="border-2 border-gray-500 h-4"></div>
        <div className="space-x-2 text-yellow-400 flex flex-row items-center hover:text-slate-100 hover:scale-110">
          <span>time</span>
        </div>
        <div className="space-x-2 flex flex-row items-center hover:text-slate-100 hover:scale-110">
          <span>words</span>
        </div>
        <div className="border-2 border-gray-500 h-4"></div>
        <p className="text-yellow-400 hover:text-slate-100 hover:scale-110">15</p>
        <p className="hover:text-slate-100 hover:scale-110">30</p>
        <p className="hover:text-slate-100 hover:scale-110">60</p>
        <p className="hover:text-slate-100 hover:scale-110">100</p>
        <p className="hover:text-slate-100 hover:scale-110">120</p>
      </div>

      <div className="flex justify-center items-center flex-col h-[60vh]">
        <div className="text-[30px] relative w-[80vw] text-center text-[#646669]">
          {letterArray.map((word, index) => (
            <span
              key={index}
              className={`transition-all duration-200 relative ${
                index === currentIndex ? "text-yellow-500" : ""
              } ${
                index < currentIndex
                  ? typedArray[index] === word
                    ? "text-white"
                    : "text-red-500"
                  : ""
              }`}
            >
              {index === currentIndex && (
                <span className="absolute top-2 cursor-blink">_</span>
              )}
              {word}
            </span>
          ))}
        </div>
        <input
          autoFocus
          type="text"
          placeholder=""
          onKeyDown={handleKeyPresses}
          className="mt-4 p-2 border-0 rounded absolute opacity-0 w-[80vw] text-[30px] text-center"
        />
      </div>

      <div className="mt-6 text-center text-white">
        <p>WPM: {calculateWPM()}</p>
        <p>Accuracy: {calculateAccuracy()}%</p>
      </div>
    </div>
  );
}
