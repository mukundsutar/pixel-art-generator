import { useEffect, useRef } from "react";

import { useCanvasDataStore } from "../lib/storage/canvas-data-store";

interface PixelCanvasPNGProps {
  cellSize?: number;
}

export default function PixelCanvasPNG({ cellSize = 10 }: PixelCanvasPNGProps) {
  const { colorData } = useCanvasDataStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    colorData.forEach((row, y) => {
      row.forEach((color, x) => {
        ctx.fillStyle = color || "transparent";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      });
    });
  }, [colorData, cellSize]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={colorData[0].length * cellSize}
        height={colorData.length * cellSize}
      />
      <button
        onClick={() => {
          const canvas = canvasRef.current;
          if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "canvas.png";
            link.href = url;
            link.click();
          }
        }}
      >
        Download PNG
      </button>
    </>
  );
}
