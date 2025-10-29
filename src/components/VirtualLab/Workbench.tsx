"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WorkbenchProps {
  contents: Array<{ id: string; name: string; color: string }>;
  isStirring: boolean;
  onDropReagent?: (id: string) => void;
}

export default function Workbench({ contents, isStirring, onDropReagent }: WorkbenchProps) {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  
  useEffect(() => {
    if (isStirring) {
      const newBubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        delay: Math.random() * 0.5
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isStirring]);

  const liquidColor = contents.length > 0 
    ? contents[contents.length - 1].color 
    : "transparent";

  return (
    <div
      className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
    >
      {/* Beaker Container */}
      <div
        className="relative w-64 h-96"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("text/plain");
          if (id && onDropReagent) onDropReagent(id);
        }}
      >
        {/* Beaker Glass */}
        <div className="absolute inset-0 beaker-glass">
          <svg viewBox="0 0 200 300" className="w-full h-full">
            {/* Beaker Shape */}
            <path
              d="M 50 20 L 50 200 Q 50 280 100 280 Q 150 280 150 200 L 150 20 Z"
              fill="rgba(255, 255, 255, 0.3)"
              stroke="rgba(100, 150, 255, 0.5)"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            {/* Measurement Lines */}
            {[50, 100, 150, 200, 250].map((y, i) => (
              <line
                key={i}
                x1="55"
                y1={y}
                x2="65"
                y2={y}
                stroke="rgba(100, 150, 255, 0.3)"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Liquid */}
        {contents.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${Math.min(contents.length * 15 + 30, 85)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[55%]"
            style={{
              background: `linear-gradient(to bottom, ${liquidColor}dd, ${liquidColor})`,
              borderRadius: "0 0 40% 40%",
              boxShadow: `0 0 20px ${liquidColor}66, inset 0 -10px 20px rgba(255,255,255,0.3)`
            }}
          >
            {/* Bubbles */}
            {isStirring && bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ bottom: "0%", opacity: 0 }}
                animate={{
                  bottom: "100%",
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: bubble.delay,
                  ease: "linear"
                }}
                className="absolute w-2 h-2 bg-white/60 rounded-full"
                style={{ left: `${bubble.x}%` }}
              />
            ))}

            {/* Liquid Surface Wave */}
            {isStirring && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-full h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            )}
          </motion.div>
        )}

        {/* Steam Effect */}
        {contents.length > 2 && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.6, scale: 0.5 }}
                animate={{ y: -30, opacity: 0, scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-8 h-8 bg-gray-300/40 rounded-full blur-sm"
                style={{ left: `${i * 10}px` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contents Label */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-700 mb-2">Isi Beaker:</p>
        {contents.length === 0 ? (
          <p className="text-gray-400 italic">Kosong</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {contents.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${item.color}22`,
                  color: item.color,
                  border: `1px solid ${item.color}44`
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
