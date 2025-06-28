import { useState } from "react";

import { useCanvasDataStore } from "../lib/storage/canvas-data-store";

export default function CanvasSizing() {
  const { canvasSize, setCanvasSize } = useCanvasDataStore();

  const [currCanvasSize, setCurrCanvasSize] = useState<{
    width: number;
    height: number;
  }>(canvasSize);

  return (
    <div className="flex items-center gap-4">
      <div>Canvas Size:</div>

      <div className="flex gap-4">
        {/* width */}
        <input
          type="number"
          value={currCanvasSize.width}
          onChange={(e) => {
            setCurrCanvasSize((prev) => ({
              ...prev,
              width: Number(e.target.value),
            }));
          }}
          className="w-12"
        />

        <div>x</div>

        {/* height */}
        <input
          type="number"
          value={currCanvasSize.height}
          onChange={(e) => {
            setCurrCanvasSize((prev) => ({
              ...prev,
              height: Number(e.target.value),
            }));
          }}
          className="w-12"
        />
      </div>

      <button
        onClick={() => {
          setCanvasSize(currCanvasSize);
        }}
      >
        Submit
      </button>
    </div>
  );
}
