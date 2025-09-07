"use client";
import React, { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number; // index into options
};

const QUESTIONS: Question[] = [
  {
    question: "Which statement best describes a low-pass filter?",
    options: ["Blocks low frequencies", "Blocks high frequencies", "Amplifies all signals", "Shifts phase only"],
    answer: 1,
  },
  {
    question: "In a series RLC at resonance, the impedance is…",
    options: ["Maximum", "Minimum", "Purely resistive and minimum", "Infinite"],
    answer: 2,
  },
  {
    question: "Fourier Transform primarily converts…",
    options: [
      "Frequency → Time",
      "Time → Frequency",
      "Voltage → Current",
      "Analog → Digital"
    ],
    answer: 1,
  },
  {
    question: "For a stable LTI system, the impulse response h(t) must be…",
    options: ["Odd", "Even", "Absolutely integrable", "Periodic"],
    answer: 2,
  },
  {
    question: "Cutoff frequency of an RC low-pass is approximately…",
    options: ["1/(2πRC)", "RC", "2πRC", "R/C"],
    answer: 0,
  },
];

const PER_QUESTION_SECONDS = 30;

export default function Quiz() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PER_QUESTION_SECONDS);
  const [done, setDone] = useState(false);

  // countdown
  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) {
      handleNext(); // auto-advance on timeout
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  const handleNext = () => {
    // score current
    if (selected === QUESTIONS[qIdx].answer) setScore((s) => s + 1);

    // next or finish
    const next = qIdx + 1;
    if (next < QUESTIONS.length) {
      setQIdx(next);
      setSelected(null);
      setTimeLeft(PER_QUESTION_SECONDS);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(PER_QUESTION_SECONDS);
    setDone(false);
  };

  if (done) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-2">Quiz Completed 🎉</h1>
        <p className="text-lg">Your Score: <span className="font-semibold">{score}</span> / {QUESTIONS.length}</p>
        <button onClick={restart} className="mt-6 px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700">
          Try Again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[qIdx];
  const progressPct = (timeLeft / PER_QUESTION_SECONDS) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Mini Quiz: Signals & Systems</h1>

      {/* Timer progress bar */}
      <div className="w-full max-w-md mb-2">
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-sm mt-1 text-center">Time left: {timeLeft}s</div>
      </div>

      <div className="w-full max-w-2xl bg-white/60 dark:bg-gray-800/60 border rounded-2xl p-6">
        <div className="text-sm mb-2">Question {qIdx + 1} of {QUESTIONS.length}</div>
        <h2 className="text-xl font-semibold mb-4">{q.question}</h2>

        <div className="grid gap-3">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`text-left px-4 py-3 rounded-xl border transition
                   ${isSelected ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300"}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm opacity-70">Score: {score}</div>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white"
          >
            {qIdx + 1 < QUESTIONS.length ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
