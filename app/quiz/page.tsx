import React from "react";
// If you have the '@' alias set in tsconfig, use the first import.
// Otherwise use the relative import shown below it.

// import Quiz from "@/components/Quiz";
import Quiz from "../../components/Quiz";

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <Quiz />
    </main>
  );
}
