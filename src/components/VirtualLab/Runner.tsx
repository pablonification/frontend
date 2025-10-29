"use client";

import { useState } from "react";
import Workbench from "./Workbench";
import Toolbox, { reagents } from "./Toolbox";
import Controls from "./Controls";
import { Beaker, AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface RunnerProps {
  practicum: {
    id: string;
    title: string;
    description: string;
  };
}

export default function Runner({ practicum }: RunnerProps) {
  const [contents, setContents] = useState<Array<{ id: string; name: string; color: string }>>([]);
  const [isStirring, setIsStirring] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [phLevel, setPhLevel] = useState<number | null>(null);

  // Guided procedure steps
  const [steps, setSteps] = useState<Array<{ id: string; text: string; done: boolean }>>([
    { id: "add", text: "Tambahkan reagen ke beaker (drag & drop atau klik)", done: false },
    { id: "stir", text: "Aduk larutan menggunakan tombol 'Aduk'", done: false },
    { id: "wait", text: "Tunggu beberapa saat agar reaksi berlangsung", done: false },
    { id: "measure", text: "Ukur pH menggunakan tombol 'Ukur pH'", done: false },
    { id: "observe", text: "Amati hasil dan catat pengamatan", done: false }
  ]);

  const markStepDone = (stepId: string) => {
    setSteps((prev) => prev.map((s) => s.id === stepId ? { ...s, done: true } : s));
  };

  const handleAddReagent = (reagent: { id: string; name: string; color: string }) => {
    setContents([...contents, reagent]);
    setStatus("idle");
    setResult(null);
    markStepDone("add");
  };

  const handleDropReagent = (id: string) => {
    const reagent = reagents.find((r) => r.id === id);
    if (reagent) handleAddReagent(reagent as any);
  };

  const handleStir = () => {
    setIsStirring(true);
    setStatus("processing");
    setTimeout(() => {
      setIsStirring(false);
      setStatus("complete");
      setResult("Larutan tercampur rata");
      markStepDone("stir");
    }, 3000);
  };

  const handleWait = () => {
    setIsWaiting(true);
    setStatus("processing");
    setTimeout(() => {
      setIsWaiting(false);
      setStatus("complete");
      setResult("Proses menunggu selesai");
      markStepDone("wait");
    }, 5000);
  };

  const handleMeasurePh = () => {
    // Simulasi pengukuran pH
    const hasAcid = contents.some(c => c.id === "hcl");
    const hasBase = contents.some(c => c.id === "naoh");
    
    let ph = 7;
    if (hasAcid && !hasBase) ph = 3;
    else if (hasBase && !hasAcid) ph = 11;
    else if (hasAcid && hasBase) ph = 7;
    
    setPhLevel(ph);
    setStatus("complete");
    setResult(`pH terukur: ${ph}`);
    markStepDone("measure");
  };

  const handleReset = () => {
    setContents([]);
    setIsStirring(false);
    setIsWaiting(false);
    setResult(null);
    setStatus("idle");
    setPhLevel(null);
  };

  const getStatusColor = () => {
    switch (status) {
      case "idle": return "bg-gray-100 text-gray-600";
      case "processing": return "bg-blue-100 text-blue-600 animate-pulse";
      case "complete": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "idle": return <AlertCircle className="w-4 h-4" />;
      case "processing": return <Clock className="w-4 h-4 animate-spin" />;
      case "complete": return <CheckCircle2 className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">{practicum.title}</h1>
          </div>
          <p className="text-gray-600 ml-11">{practicum.description}</p>
          
          {/* Status Bar */}
          <div className="mt-4 flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor()}`}>
              {getStatusIcon()}
              Status: {status === "idle" ? "Siap" : status === "processing" ? "Memproses" : "Selesai"}
            </span>
            
            {phLevel !== null && (
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                phLevel < 7 ? "bg-red-100 text-red-700" : 
                phLevel > 7 ? "bg-purple-100 text-purple-700" : 
                "bg-green-100 text-green-700"
              }`}>
                pH: {phLevel} {phLevel < 7 ? "(Asam)" : phLevel > 7 ? "(Basa)" : "(Netral)"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Toolbox */}
        <div className="lg:col-span-1">
          <Toolbox onAdd={handleAddReagent} />
        </div>

        {/* Workbench */}
        <div className="lg:col-span-2 space-y-6">
          <Workbench contents={contents} isStirring={isStirring} onDropReagent={handleDropReagent} />

          {/* Procedure Steps */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-3">Langkah Praktikum</h3>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((s) => (
                <li key={s.id} className={`flex items-start gap-3 ${s.done ? 'opacity-60' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${s.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {s.done ? '✓' : ''}
                  </div>
                  <div className="text-sm text-gray-700">{s.text}</div>
                </li>
              ))}
            </ol>
          </div>

          <Controls {...({
            onStir: handleStir,
            onWait: handleWait,
            onMeasurePh: handleMeasurePh,
            onReset: handleReset,
            isStirring,
            isWaiting,
            disabled: contents.length === 0,
          } as any)} />

          {/* Result Display */}
          {result && (
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 animate-fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-bold text-gray-800">Hasil:</h3>
                  <p className="text-gray-600">{result}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
