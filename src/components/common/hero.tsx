"use client";

import React, { useEffect, useState } from "react";

const words = [
  "React",
  "TypeScript",
  "Docker",
  "Nest.js",
  "AI",
];
const colors = [
  "text-blue-500",
  "text-purple-600",
  "text-cyan-600",
  "text-red-600",
  "text-pink-500",
];

export default function IntroHero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => {
        if (i === words.length - 1 && direction === 1) {
          setDirection(-1);
          return i - 1;
        } else if (i === 0 && direction === -1) {
          setDirection(1);
          return i + 1;
        } else {
          return i + direction;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="text-6xl mt-20 flex items-center justify-start flex-wrap text-left"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="font-bold mr-4 mb-2">Your personalized <span className="whitespace-nowrap">path to</span></span>{" "}
      <span className="italic font-black inline-block relative h-[1.2em] w-[9ch] overflow-hidden align-bottom">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${index * 1.2}em)`,
            willChange: "transform",
          }}
        >
          {words.map((word, i) => (
            <div
              key={word}
              className={`${colors[i]} h-[1.2em] leading-[1.2em] select-none`}
              aria-hidden={index !== i}
            >
              {word}
            </div>
          ))}
        </div>
      </span>
    </div>
  );
}