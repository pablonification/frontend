"use client";

import { Loader2, RotateCw, TestTube, Clock, Trash2 } from "lucide-react";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "destructive" | "default";
};

const Button: React.FC<ButtonProps> = ({ variant = "default", className = "", children, ...props }) => {
    const variantClass =
        variant === "destructive" ? "bg-red-500 hover:bg-red-600 text-white" : "";
    const base = `inline-flex items-center justify-center gap-2 px-4 rounded ${className}`;

    return (
        <button {...props} className={`${base} ${variantClass}`.trim()}>
            {children}
        </button>
    );
};

interface ControlsProps {
  onStir: () => void;
  onWait: () => void;
  onMeasurePh: () => void;
  onReset: () => void;
  isStirring: boolean;
  isWaiting: boolean;
  disabled: boolean;
}

export default function Controls({
  onStir,
  onWait,
  onMeasurePh,
  onReset,
  isStirring,
  isWaiting,
  disabled
}: ControlsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <TestTube className="w-5 h-5 text-indigo-600" />
        Panel Kontrol
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Stir Button */}
        <Button
          onClick={onStir}
          disabled={disabled || isStirring}
          className="h-14 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isStirring ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengaduk...
            </>
          ) : (
            <>
              <RotateCw className="w-5 h-5" />
              Aduk
            </>
          )}
        </Button>

        {/* Wait Button */}
        <Button
          onClick={onWait}
          disabled={disabled || isWaiting}
          className="h-14 bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isWaiting ? (
            <>
              <Clock className="w-5 h-5 animate-pulse" />
              Menunggu...
            </>
          ) : (
            <>
              <Clock className="w-5 h-5" />
              Tunggu
            </>
          )}
        </Button>

        {/* Measure pH Button */}
        <Button
          onClick={onMeasurePh}
          disabled={disabled}
          className="h-14 bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <TestTube className="w-5 h-5" />
          Ukur pH
        </Button>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="destructive"
          className="h-14 font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
          <Trash2 className="w-5 h-5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
