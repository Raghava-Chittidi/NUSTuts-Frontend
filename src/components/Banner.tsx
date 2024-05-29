"use client";
import { useNavigate } from "react-router-dom";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function Banner() {
  const navigate = useNavigate();
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "NUS",
      className: "text-blue-950",
      space: "none",
    },
    {
      text: "TUTS",
      className: "text-amber-600",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start md:justify-center max-h-[40rem] pb-4 md:pb-0">
      <TypewriterEffectSmooth words={words} cursorClassName="bg-amber-600" />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base w-[87.5%] text-justify">
        Centralized platform tailored for Teaching Assistants (TAs) to share
        materials, files and links with Students in their tutorials. Seamlessly
        book consultations with TAs, track attendance and have meaningful
        discussions with one another. Maximise your learning experience by
        joining now!
      </p>
      <div className="flex flex-row items-center space-x-4 mt-10">
        <button onClick={() => navigate("/ta/login")}className="w-32 sm:w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-xs sm:text-sm">
          Login as TA
        </button>
        <button onClick={() => navigate("student/login")} className="w-32 sm:w-40 h-10 rounded-xl bg-white text-black border border-black text-xs sm:text-sm">
          Login as Student
        </button>
      </div>
    </div>
  );
}
