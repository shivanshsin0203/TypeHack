"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import getWords from "@/lib/LetterArray";
import "@/components/cursorBlink.css";

// Register the necessary components for the chart
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function Home() {
  const [letterArray, setLetterArray] = useState<string[]>([]);
  const [typedArray, setTypedArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [allowType, setAllowType] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showGraphs, setShowGraphs] = useState(false);
  const [wpmData, setWpmData] = useState<number[]>([]);
  const [mistakesData, setMistakesData] = useState<number[]>([]);

  useEffect(() => {
    async function fetchWords() {
      const words = await getWords();
      setLetterArray(words);
    }

    fetchWords();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showGraphs) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setShowGraphs(true);
    }
  }, [timeLeft, showGraphs]);

  function handleKeyPresses(e: any) {
    const charTyped = e.key;
    if (!showGraphs) {
      if (charTyped === "Escape") {
        setTypedArray([]);
        setCurrentIndex(0);
        setMistakes(0);
        setAllowType(true);
        setTimeLeft(15);
        
        return;
      }

      if (charTyped === "Backspace" && !allowType) {
        if (currentIndex > 0) {
          setTypedArray(typedArray.slice(0, -1));
          setAllowType(true);
        }
        return;
      }

      if (allowType) {
        if (charTyped.length === 1) {
          const updatedTypedArray = [...typedArray, charTyped];

          if (charTyped === letterArray[currentIndex]) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setMistakes(mistakes + 1);
            setAllowType(false);
          }

          setTypedArray(updatedTypedArray);
        }
      }
    }
  }

  useEffect(() => {
    if (!showGraphs) {
      const wordsTyped = typedArray.length / 5;
      const minutesElapsed = (15 - timeLeft) / 60;
      const wpm = minutesElapsed > 0 ? (wordsTyped / minutesElapsed) : 0;
      setWpmData([...wpmData, wpm]);
      setMistakesData([...mistakesData, mistakes]);
    }
  }, [typedArray]);

  const calculateWPM = () => {
    const wordsTyped = typedArray.length / 5;
    const minutesElapsed = 0.25; // 15 seconds
    return (wordsTyped / minutesElapsed).toFixed(2);
  };

  const calculateAccuracy = () => {
    const correctChars = currentIndex - mistakes;
    const totalTyped = typedArray.length;
    return ((correctChars / totalTyped) * 100).toFixed(2);
  };

  const wpmGraphData = {
    labels: Array.from({ length: wpmData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'WPM',
        data: wpmData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const mistakesGraphData = {
    labels: Array.from({ length: mistakesData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Mistakes',
        data: mistakesData,
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1,
      },
    ],
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

      {!showGraphs ? (
        <div className="flex justify-center items-center flex-col h-[60vh]">
          <div className="text-[30px] relative w-[80vw] text-center text-[#646669]">
            {letterArray.map((letter, index) => (
              <span
                key={index}
                className={`transition-all duration-200 relative ${
                  index === currentIndex
                    ? allowType
                      ? "text-yellow-500"
                      : "text-red-500"
                    : ""
                } ${index < currentIndex ? "text-white" : ""}`}
              >
                {index === currentIndex && (
                  <span className="absolute top-2 cursor-blink">_</span>
                )}
                {letter}
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
          <div className="mt-6 text-center text-white">
            <p>Time Left: {timeLeft}s</p>
          </div>
        </div>
      ) : (
        <div className="w-[80%] ml-[10%] mt-6">
          <div className=" mb-4 flex justify-between">
            <div>
              <p className="text-[#696669]">WPM</p>
              <p className="text-yellow-500 text-lg font-bold">{calculateWPM()}</p>
              <p className="text-[#696669]">Accuracy</p>
              <p className="text-yellow-500 text-lg font-bold">{calculateAccuracy()}%</p>
              
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-[80%]">
              <Line data={wpmGraphData} />
            </div>
            <div className="w-[80%]">
              <Line data={mistakesGraphData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
