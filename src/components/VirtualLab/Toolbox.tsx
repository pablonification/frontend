"use client";

import { Droplet, Beaker, TestTube } from "lucide-react";

export const reagents = [
  { id: "water", name: "Air (H₂O)", color: "#3b82f6", icon: Droplet },
  { id: "hcl", name: "Asam Klorida (HCl)", color: "#ef4444", icon: Beaker },
  { id: "naoh", name: "Natrium Hidroksida (NaOH)", color: "#8b5cf6", icon: TestTube },
  { id: "nacl", name: "Garam (NaCl)", color: "#f59e0b", icon: TestTube }
];

export default function Toolbox({ onAdd }: { onAdd: (reagent: any) => void }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Beaker className="w-5 h-5" />
        Reagen & Alat
      </h3>
      
      <div className="space-y-3">
        {reagents.map((reagent) => {
          const Icon = reagent.icon;
          return (
            <button
              key={reagent.id}
              onClick={() => onAdd(reagent)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", reagent.id);
                // set a simple drag image fallback
              }}
              className="w-full p-4 rounded-lg border-2 border-dashed hover:border-solid transition-all hover:scale-105 hover:shadow-md group"
              style={{
                borderColor: `${reagent.color}44`,
                backgroundColor: `${reagent.color}08`
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-full group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${reagent.color}22` }}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: reagent.color }}
                  />
                </div>
                <span 
                  className="font-medium text-sm"
                  style={{ color: reagent.color }}
                >
                  {reagent.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
